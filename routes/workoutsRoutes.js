import express from 'express';
import { getAllWorkouts } from '../controllers/workoutsControllers.js';

const router = express.Router();

// Route to get all workouts
router.get('/', getAllWorkouts);

export default router;

