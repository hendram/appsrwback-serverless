import Checkoperatorid from  '../lib/Checkoperatorid.js';
import Deletepenghunidb from '../lib/Deletepenghunidb.js';
import jwt from 'jsonwebtoken';
import  'dotenv/config';


export default async function handler(req, res) {

const {nama, tempatlahir, tgllahir, noktp, nohp, tower, unit, status, periodsewa, agen, emergencyhp,
pemilikunit } = req.body;

const tokenu = req.headers.authorization;
  if(!tokenu) {
   return res.status(401).json({message: 'No token provided' });
 }
else {
 try {
    const decoded = jwt.verify(tokenu, process.env.JWT_SECRET);
    const userId = decoded.id;
    let resultusercheck = await Checkoperatorid(userId);
        if(resultusercheck){

 if(nama && tempatlahir && tgllahir && noktp && nohp &&
tower && unit && status && periodsewa && agen &&
emergencyhp && pemilikunit) {
      let resultnya = await Deletepenghunidb(nama, tempatlahir 
, tgllahir , noktp, nohp ,
tower , unit , status , periodsewa , agen ,
emergencyhp , pemilikunit);
         if(resultnya === "1deleted"){
           res.send({answer: "ok"});
}
       else {
          res.send({kosong: ""});
       }
}
}
}
catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
};
