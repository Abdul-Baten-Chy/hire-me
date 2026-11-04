import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { role } from "better-auth/plugins";

const client = new MongoClient(`mongodb+srv://${process.env.USER_NAME}:${process.env.MONGO_PASS}@cluster0.yjorklr.mongodb.net/`);
const db = client.db("hire-me");

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  },
  
  database: mongodbAdapter(db, {
    client,
  }),
    user:{
additionalFields:{
  role:{
    default: "job seeker",
  }
}}
});