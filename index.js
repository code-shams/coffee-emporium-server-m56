//  Require express for this is going to be a express js server
const express = require("express");
//  Copy this from mongodb atlas - cluster - connect
const { MongoClient, ServerApiVersion } = require("mongodb");
//  Use the variables declared inside the .env file by requiring dotenv package
require("dotenv").config();
//  Create a express server
const app = express();
//  Define server port
const port = process.env.PORT || 3000;
//  Use cors to connect with this server with other ports
const cors = require("cors");

//  Middlewares
app.use(cors());
//  Use the request body sent by the client through http requests in json
app.use(express.json());

//  Mongodb connection
const uri = `mongodb+srv://${process.env._coffee_DB_USER}:${process.env._coffee_DB_PASS}@ph-db1.h6jf6zl.mongodb.net/?retryWrites=true&w=majority&appName=PH-DB1`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const coffeeCollection = client.db("coffeeDB").collection("coffees");

        app.post("/coffee", async (req, res) => {
            const respose = await coffeeCollection.insertOne(req.body);
            res.send(respose);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// ? root server get api
app.get("/", (req, res) => {
    res.send("Coffee server is getting warmer....");
});

// ?connect the server with the defined port.
app.listen(port, () => {
    console.log(`coffee served on port ${port}`);
});
