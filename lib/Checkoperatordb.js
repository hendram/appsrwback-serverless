import { MongoClient } from 'mongodb';
import _ from 'underscore';

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

export default async function checkoperatordb(operatorname, invite) {

try {
    await client.connect()
    const database = client.db('greenbay');
    const operatortablename = database.collection('operator');
    // Query for a movie that has the title 'Back to the Future'
    const query = { invitecode: invite, operatorname: operatorname };
  
    const exist = await operatortablename.findOne(query, {invitecode: 1, operatorname: 1, _id: 1});
    if(exist === null ){
      return "notfind";
    }       
    else {
            return exist;
}
}
finally {
   await client.close();
}

}



