import Checkoperatorid from '../lib/Checkoperatorid.js';
import Fetchallpenghuninamadb from '../lib/Fetchallpenghuninamadb.js';
import applyCors from "../lib/cors.js"; 
import jwt from 'jsonwebtoken';
import  'dotenv/config';

export default async function handler(req, res) {
if (applyCors(req, res)) return; 

 const { nama, lowlimit, highlimit } = req.body;

const token = req.headers.authorization;
  if(!token) {
   return res.status(401).json({message: 'No token provided' });
 }
else {
 try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id;
    const role = decoded.role;

    if (role !== "user") {
      return res.status(403).json({ message: 'Only users are allowed to update data here' });
    }

    let resultusercheck = await Checkoperatorid(userId);
        if(resultusercheck){

  if(nama && lowlimit && highlimit){
        let resultnya = await Fetchallpenghuninamadb(nama, Number(lowlimit), Number(highlimit));
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
}
}
