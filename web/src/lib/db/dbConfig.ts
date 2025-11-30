import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("already connected to the database");
    return;
  }

  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) {
    const msg = "MONGODB_URL environment variable is not set";
    console.error(msg);
    throw new Error(msg);
  }

  try {
    const db = await mongoose.connect(mongoUrl, {});

    connection.isConnected = db.connections[0].readyState;

    console.log("db connected successfully");
  } catch (error) {
    console.error("db connection failed:", error);
    throw error;
  }
}

export default dbConnect;