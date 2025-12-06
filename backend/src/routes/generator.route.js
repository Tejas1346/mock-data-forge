import express from 'express'
import { generateData } from '../controller/generator.controller.js';
const router = express.Router();

router.post("/",generateData);


export default router;