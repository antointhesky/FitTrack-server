import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sessionRoutes from "./routes/sessionRoutes.js";
import goalsRoutes from "./routes/goalsRoutes.js";
import exercisesRoutes from "./routes/exercisesRoutes.js"; 
import progressRoutes from "./routes/progressRoutes.js";

dotenv.config();

const app = express();
const { PORT, FRONTEND_URL } = process.env;

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.static("public"));
app.use(express.json());

app.use("/session", sessionRoutes);
app.use("/exercises", exercisesRoutes); 
app.use("/goals", goalsRoutes); 

app.use("/progress", progressRoutes);

app.listen(PORT, () => {
  console.log(`The app is listening on port ${PORT}`);
});





// POST /worksouts/:id/excercise (also update the workout data - duration, calories etc)
// GET /excercises
// GET /excercises/:id
// PUT /excercises/:id (also update the workout data  - duration, calories etc)
// DELETE /excercises/:id (also update the workout data  - duration, calories etc)
