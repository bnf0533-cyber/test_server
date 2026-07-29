import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import dns from "dns"
dns.setServers(['1.1.1.1','8.8.8.8'])
export const client = new MongoClient(process.env.MONGO_URL);
try {
    await client.connect();
    console.log("connected to mongodb");
} catch (error) {
    console.log("field to connect mongodb", error);
    await client.close();
}

export const connection = await client.db('testServer')