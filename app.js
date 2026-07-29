import express from "express"
import dotenv from "dotenv/config"
import dns from "dns"
import "./db/mongo.db.js"
import "./db/supabase.db.js"

dns.setServers(["1.1.1.1","8.8.8.8"])
const app = express()

app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log("server running...");
    
})