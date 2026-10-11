import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGODB_URI);
export const auth = betterAuth({
  database: mongodbAdapter(client.db("bazardor")),
  emailAndPassword: { enabled: true, autoSignIn: false, minPasswordLength: 8 },
  socialProviders: {
    google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET },
    github: { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET },
  },
});
