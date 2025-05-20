import Checkoperatorid from  '../lib/Checkoperatorid.js';
import Checkpenghunidb from '../lib/Checkpenghunidb.js';
import Insertpenghunidb from '../lib/Insertpenghunidb.js';
import jwt from 'jsonwebtoken';
import  'dotenv/config';


export default async function handler(req, res) {

const { nama, tempatlahir, tgllahir, noktp, nohp, tower, unit, status, periodsewa, agen, emergencyhp,
pemilikunit } = req.body;

const tokenu = req.headers.authorization;
 console.log(tokenu);
  if(!tokenu) {
   return res.status(401).json({message: 'No token provided' });
 }

else {
 try {
    const decoded = jwt.verify(tokenu, process.env.JWT_SECRET);
   const userId = decoded.id;
   console.log(userId); 

    let resultusercheck = await Checkoperatorid(userId);
        console.log(resultusercheck);
        if(resultusercheck){

        if(nama && tempatlahir && tgllahir && noktp && nohp &&
tower && unit && status && periodsewa && agen &&
emergencyhp && pemilikunit) {
      let resultnya = await Checkpenghunidb(nama, tempatlahir 
, tgllahir , noktp, nohp ,
tower , unit , status , periodsewa , agen ,
emergencyhp , pemilikunit);
            console.log("dalam isidata");
         if(resultnya === "notfind"){
            let resultnya2 = await Insertpenghunidb(nama ,
 tempatlahir  , tgllahir , noktp, nohp ,
tower , unit , status , periodsewa , agen ,
emergencyhp , pemilikunit);
             if(resultnya2 === "1inserted"){
                 res.send({answer: "ok"});
           }
       else {
          res.send({kosong: ""});
       }
       }
  }
}
}
catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
}
