import Checkoperatordb from '../lib/Checkoperatordb.js'; 
import Checkoperatorsignindb from '../lib/Checkoperatorsignindb.js';
import Updateoperatordb from '../lib/Updateoperatordb.js';
import jwt from 'jsonwebtoken';
import  'dotenv/config';


const admin = [{
id: 1,
username: "admin",
password: "123456"
}];



export default async function handler(req, res) {
  const {operatorname, password, invite} = req.body;

if(operatorname && password && invite) {
     let resultnya = await Checkoperatordb(operatorname,
           invite);
                if(resultnya){
   let resultnya2 = await Updateoperatordb(operatorname, password,
invite);
     if(resultnya2 === "1updated"){
       const tokenu = jwt.sign({id: resultnya._id}, process.env.JWT_SECRET);
         res.json({tokenu});
}
       else {
          res.send({kosong: ""});
       }
}
}

else {
        const user = admin.find(a => a.username === operatorname && a.password === password);
        const token = jwt.sign({ id: admin[0].id}, process.env.JWT_SECRET);
   if(user){      
  res.json({token});
       console.log(user);
}
    else {
     let resultnya = await Checkoperatorsignindb(operatorname,
          password);
                if(resultnya){
       const tokenu = jwt.sign({id: resultnya._id}, process.env.JWT_SECRET);
	   res.json({tokenu});
}
       else {
          console.log("masuk ke kosong");
          res.send({kosong: ""});
       }
}
}
}
