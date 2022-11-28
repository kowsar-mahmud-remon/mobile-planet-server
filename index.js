const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

const app = express();

// middle ware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eluedpr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const mobileCategoryCollection = client.db('mobilePlanet').collection('mobileCategory');

    const usersCollection = client.db('mobilePlanet').collection('users');

    const productsCollection = client.db('mobilePlanet').collection('products');

    const ordersCollection = client.db('mobilePlanet').collection('orders');

    const advertisedCollection = client.db('mobilePlanet').collection('advertised');

    app.get('/mobileCategory', async (req, res) => {
      const query = {};
      const result = await mobileCategoryCollection.find(query).toArray();
      res.send(result);
    });

    // app.get('/userss', async (req, res) => {
    //   const query = {};
    //   const result = await usersCollection.find(query).toArray();
    //   res.send(result);
    // });

    // app.get('/users', async (req, res) => {
    //   const email = req.query.email;
    //   const query = { email: email };
    //   const result = await usersCollection.findOne(query);
    //   res.send(result);
    // });

    app.get('/users', async (req, res) => {
      const category = req.query.category;
      const query = { category: category };
      const result = await usersCollection.find(query).toArray();
      res.send(result);
    });


    app.post('/users', async (req, res) => {
      const users = req.body;
      const result = await usersCollection.insertOne(users);
      res.send(result);
    });

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      console.log('iddd', id);
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });

    app.get('/products', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });

    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      const query = { product_category: id };
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });

    app.post('/products', async (req, res) => {
      const users = req.body;
      const result = await productsCollection.insertOne(users);
      res.send(result);
    });

    app.get('/orders', async (req, res) => {
      const email = req.query.email;
      console.log(email);
      const query = { email: email };
      const result = await ordersCollection.find(query).toArray();
      res.send(result);
    });

    app.post('/orders', async (req, res) => {
      const users = req.body;
      const result = await ordersCollection.insertOne(users);
      res.send(result);
    });

    app.get('/advertised', async (req, res) => {
      const query = {};
      const result = await advertisedCollection.find(query).toArray();
      res.send(result);
    });

    app.post('/advertised', async (req, res) => {
      const users = req.body;
      const result = await advertisedCollection.insertOne(users);
      res.send(result);
    });

  }

  finally {

  }
}

run().catch(console.log);




app.get('/', (req, res) => {
  res.send('Mobile planet server is running');
});

app.listen(port, (req, res) => {
  console.log(`Mobile planet running on ${port}`);;
});