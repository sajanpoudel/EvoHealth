import mongoose from "mongoose";

const connectToMongo = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not set. Add it to server/.env before starting the server.");
  }
  const res = await mongoose.connect(uri);
  if (res) {
    console.log("Connected successfully to the database");
  }
};

export default connectToMongo;
