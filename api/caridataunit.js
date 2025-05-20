import Checkoperatorid from '../lib/Checkoperatorid.js';
import Fetchallpenghuniunitdb from '../lib/Fetchallpenghuniunitdb.js';
import jwt from 'jsonwebtoken';
import  'dotenv/config';


export default async function handler(req, res) {

const { tower, unit, lowlimit, highlimit } = req.body;

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

  if(tower && unit && lowlimit && highlimit){
        let resultnya = await Fetchallpenghuniunitdb(tower, unit, Number(lowlimit),
Number(highlimit));
          console.log(resultnya);
        if(resultnya){
      res.send({answer: resultnya});    
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
}}

