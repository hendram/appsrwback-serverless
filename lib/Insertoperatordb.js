import { MongoClient } from 'mongodb';
 const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

export default async function insertoperatordb(operatorname, invitecode) {
  
try{
    await client.connect();
       const dbo = client.db("greenbay");
      const operatortablename = {operatorname: operatorname, password: "", invitecode: invitecode};
      const insoperatortable = await dbo.collection("operator").insertOne(operatortablename);
                if(insoperatortable === null) {
             return "failed to insert operator";
             }
           else if(insoperatortable) {
             return "1inserted";
            }
}
finally{
   await client.close();
}

}

