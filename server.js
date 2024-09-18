import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import workoutsRoutes from "./routes/workoutsRoutes.js";
import goalsRoutes from "./routes/goalsRoutes.js";
import exercisesRoutes from "./routes/exercisesRoutes.js"; 

dotenv.config();

const app = express();
const { PORT, FRONTEND_URL } = process.env;

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.static("public"));
app.use(express.json());


app.use("/workouts", workoutsRoutes);
app.use("/exercises", exercisesRoutes); 
app.use("/goals", goalsRoutes); 

app.listen(PORT, () => {
  console.log(`The app is listening on port ${PORT}`);
});




// POST /worksouts/:id/excercise (also update the workout data - duration, calories etc)
// GET /excercises
// GET /excercises/:id
// PUT /excercises/:id (also update the workout data  - duration, calories etc)
// DELETE /excercises/:id (also update the workout data  - duration, calories etc)
