/* eslint-disable @typescript-eslint/no-namespace */
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// ✅ Extend the global object correctly
declare global {
  namespace NodeJS {
    interface Global {
      mongoose: MongooseConnection;
    }
  }
}

// ✅ Use type assertion to safely access global.mongoose
const globalWithMongoose = global as typeof global & {
  mongoose?: MongooseConnection;
};

const cached: MongooseConnection = globalWithMongoose.mongoose ?? {
  conn: null,
  promise: null,
};

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URL) throw new Error("Missing Mongodb Url");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "Imaginify",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  globalWithMongoose.mongoose = cached;

  return cached.conn;
};
