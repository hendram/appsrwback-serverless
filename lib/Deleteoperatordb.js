import { MongoClient } from 'mongodb';
 const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

export default async function deleteoperatordb(operatorname) {
  
try{
    await client.connect();
       const dbo = client.db("greenbay");
      const operatortablename = {operatorname: operatorname};
      const deloperatortable = await dbo.collection("operator").deleteOne(operatortablename);
                if(deloperatortable === null) {
             return "failed to delete penghuni";
             }
           else if(deloperatortable) {
             return "1deleted";
            }
}
finally{
   await client.close();
}

}

