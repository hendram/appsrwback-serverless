import Checkoperatorid from '../lib/Checkoperatorid.js';
import Updatepenghunidb from '../lib/Updatepenghunidb.js';  
import applyCors from "../lib/cors.js"; 
import jwt from 'jsonwebtoken';
import  'dotenv/config';


export default async function handler(req, res) {
   if (applyCors(req, res)) return; 


const { oldnama, oldtempatlahir, oldtgllahir, oldnoktp, oldnohp, oldtower, oldunit, oldstatus, oldperiodsewa,
oldagen, oldemergencyhp, oldpemilikunit, nama, tempatlahir, tgllahir, noktp, nohp, tower, unit, status, 
periodsewa, agen,
emergencyhp, pemilikunit } = req.body;

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


        if(oldnama && oldtempatlahir && oldtgllahir && oldnoktp && 
oldnohp && oldtower && oldunit && oldstatus && oldperiodsewa && oldagen &&
oldemergencyhp && oldpemilikunit && nama && tempatlahir && tgllahir && noktp && nohp &&
tower && unit && status && periodsewa && agen &&
emergencyhp && pemilikunit) {
      let resultnya = await Updatepenghunidb(oldnama, oldtempatlahir 
, oldtgllahir , oldnoktp, oldnohp ,
oldtower , oldunit , oldstatus , oldperiodsewa , oldagen ,
oldemergencyhp , oldpemilikunit, nama, tempatlahir 
, tgllahir , noktp, nohp ,
tower , unit , status , periodsewa , agen ,
emergencyhp , pemilikunit);
  if(resultnya === "1updated"){
           res.send({answer: "ok"});
     console.log(resultnya);
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
}
