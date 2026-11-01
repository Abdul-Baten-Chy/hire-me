import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient('mongodb+srv://${USER_NAME}:${MONGO_PASS}@cluster0.yjorklr.mongodb.net/');
const db = client.db();

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  },
  database: mongodbAdapter(db, {
    client,
  }),
});