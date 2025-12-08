import express from 'express'
import generatorRoutes from './routes/generator.route.js';
import injectorRoutes from './routes/injector.route.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/generate",generatorRoutes)
app.use("/api/inject",injectorRoutes)
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log("Server running on port: "+PORT);
});