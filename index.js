const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });

        const db = client.db("DriveFleetDB");
        const carCollection = db.collection("CarCollection");
        const bookingCollection = db.collection("Bookings");

        app.get("/cars", async (req, res) => {
            const cursor = carCollection.find({});
            const cars = await cursor.toArray();
            res.json(cars);
        });

        app.get("/cars/featured", async (req, res) => {
            const featuredCars = await carCollection.find().limit(3).toArray();
            res.json(featuredCars);
        });

        app.get("/cars/:carID", async (req, res) => {
            const { carID } = req.params;
            const car = await carCollection.findOne({
                _id: new ObjectId(carID)
            });
            res.json(car);
        });

        app.post("/cars", async (req, res) => {
            const car = req.body;
            const result = await carCollection.insertOne(car);
            res.json(result);
        });

        app.post("/bookings", async (req, res) => {
            const bookingData = req.body;
            const result = await bookingCollection.insertOne(bookingData);
            res.json(result);
        });

        app.get("/bookings/:userID", async (req, res) => {
            const { userID } = req.params;
            const result = await bookingCollection.find({ userID: userID }).toArray()
            res.json(result);
        });

        app.delete("/bookings/:bookingID", async (req, res) => {
            const { bookingID } = req.params;
            const result = await bookingCollection.deleteOne({
                _id: new ObjectId(bookingID)
            });
            res.json(result);
        });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Got to different APIs lol!");
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});