const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const port = 3000;

const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:27017/${process.env.MONGO_DB}?authSource=${process.env.MONGO_DB}`;
const client = new MongoClient(uri);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

app.get("/test", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.MONGO_DB);
    const result = await db
      .collection("test")
      .insertOne({ message: "hello mongoDB!" });
    res.send(result);
  } catch (err) {
    res.status(500).send("MongoDB insert failed: " + err.message);
  }
});

app.get("/create", (req, res) => {
  res.send("POST only");
});

// CREATE
app.post("/create", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.MONGO_DB);
    const result = await db.collection("test").insertOne(req.body);
    res.send(result);
  } catch (err) {
    res.status(500).send("Create failed: " + err.message);
  }
});

// READ
app.get("/read", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.MONGO_DB);
    const result = await db.collection("test").find({}).toArray();
    res.send(result);
  } catch (err) {
    res.status(500).send("Read failed: " + err.message);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
