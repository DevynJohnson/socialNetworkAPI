import express from 'express';
import { MongoClient, MongoError } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017`;

const client = new MongoClient(connectionStringURI);

const dbName = 'socialDB';

await client.connect()
  .catch(err => { console.log(err) });

const db = client.db(dbName);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
