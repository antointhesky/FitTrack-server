import express from 'express';
import { getAllWorkouts } from '../controllers/workoutsControllers.js';

const router = express.Router();

router.get('/', getAllWorkouts);

export default router;

