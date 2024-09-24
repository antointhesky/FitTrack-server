import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sessionRoutes from "./routes/sessionRoutes.js";
import goalsRoutes from "./routes/goalsRoutes.js";
import exercisesRoutes from "./routes/exercisesRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import workoutsRoutes from "./routes/workoutsRoutes.js";

dotenv.config();

const app = express();
const { PORT, FRONTEND_URL } = process.env;

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.static("public"));
app.use(express.json());

app.use("/session", sessionRoutes);
app.use("/exercises", exercisesRoutes);
app.use("/goals", goalsRoutes);
app.use("/workouts", workoutsRoutes);

app.get("/exercises", (req, res) => {
  const workoutType = req.query.workout_type;

  // Fetch exercises filtered by workout_type
  knex("exercises")
    .where({ workout_type: workoutType })
    .then((exercises) => {
      if (exercises.length === 0) {
        return res.status(404).json({ message: "No exercises found" });
      }
      res.json(exercises);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching exercises", error });
    });
});


app.use("/progress", progressRoutes);

app.listen(PORT, () => {
  console.log(`The app is listening on port ${PORT}`);
});

// POST /worksouts/:id/excercise (also update the workout data - duration, calories etc)
// GET /excercises
// GET /excercises/:id
// PUT /excercises/:id (also update the workout data  - duration, calories etc)
// DELETE /excercises/:id (also update the workout data  - duration, calories etc)
