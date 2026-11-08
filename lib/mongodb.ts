import { MongoClient } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Reuse one connection across dev hot reloads and warm serverless invocations.
const clientPromise = (globalThis._mongoClientPromise ??= new MongoClient(process.env.MONGODB_URI!).connect());

export default clientPromise;
