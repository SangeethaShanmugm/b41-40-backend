import express from "express";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";
import { productsRouter } from "./routes/products.js";
const app = express();
dotenv.config();
app.use(express.json()); //inbuilt middleware=> interceptor- say data is in json
app.use(cors());

const PORT = 8000;

const MONGO_URL = process.env.MONGO_URL;

//MongoDB connection
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDb is connected");
  return client;
}

export const client = await createConnection();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/products", productsRouter);

app.listen(PORT, () => console.log("Server started on PORT", PORT));
