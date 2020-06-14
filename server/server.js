console.log("Hello World")

const mongoDB = require('mongodb');

const MongoClient = mongoDB.MongoClient;

const uri = "mongodb+srv://billchee:<password>@cluster0-dq8sd.mongodb.net/<dbname>?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("MongoDB Connected")
  console.log(process.env.DOCKER_NETWORK)
  client.close();
});