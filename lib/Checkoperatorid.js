import { MongoClient, ObjectId } from 'mongodb';
import _ from 'underscore';

const url = process.env.MONGODB_URI;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function checkoperatorid(id) {

try {
    await client.connect()
    const database = client.db('greenbay');
    const operatortablename = database.collection('operator');
    // Query for a movie that has the title 'Back to the Future'
    const query = { _id: new ObjectId(id) };
    const exist = await operatortablename.findOne(query, {invitecode: 1, operatorname: 1, _id: 1});
    console.log(exist);
    if(exist === null ){
      return "notfind";
    }       
    else {
            return exist;
}
}
catch (error) {
 console.log(error);
}
finally {
   await client.close();
}

}



