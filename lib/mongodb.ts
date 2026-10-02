import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || process.env.MONGO_URI || "";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

function createClientPromise(): Promise<MongoClient> {
  if (!uri || uri.includes("YOUR_MONGODB_URI")) {
    return Promise.reject(new Error("MONGODB_URI is missing from .env"));
  }
  try {
    client = new MongoClient(uri);
    return client.connect();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return Promise.reject(new Error(`Invalid MongoDB connection string: ${msg}`));
  }
}

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = createClientPromise();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = createClientPromise();
}

export async function checkMongoConnection(): Promise<{
  connected: boolean;
  dbName?: string;
  error?: string;
}> {
  try {
    if (!uri) {
      return { connected: false, error: "MONGODB_URI is missing in .env" };
    }
    const mongoClient = await clientPromise;
    const db = mongoClient.db();
    await db.command({ ping: 1 });
    return { connected: true, dbName: db.databaseName };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { connected: false, error: message };
  }
}

export default clientPromise;
