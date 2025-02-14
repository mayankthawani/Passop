const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv')
dotenv.config()
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
client.connect();
const db = client.db(dbName)


app.get('/', async (req, res) => {
  const db = client.db(dbName)
  const collection = db.collection('documents')
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
app.post('/', async (req, res) => {
  const db = client.db(dbName)
  const collection = db.collection('documents')
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})