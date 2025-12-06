import express from 'express';
import { injectData } from '../controller/injector.controller.js';
const router = express.Router();

router.post("/", injectData);

export default router;
