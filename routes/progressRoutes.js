import express from "express";
import { getProgressStats } from "../controllers/progressControllers.js";

const router = express.Router();

router.get("/", getProgressStats); 

export default router;

