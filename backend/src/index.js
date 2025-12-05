import express from 'express'
import generatorRoutes from './routes/generator.route.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/generate",generatorRoutes)
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log("Server running on port: "+PORT);
});