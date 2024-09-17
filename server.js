import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import workoutsRoutes from "./routes/workoutsRoutes.js";
import goalsRoutes from "./routes/goalsRoutes.js";

dotenv.config();

const app = express();
const { PORT, FRONTEND_URL } = process.env;

app.use(cors({ origin: FRONTEND_URL }));

app.use(express.static("public"));
app.use(express.json());

app.use("/workouts", workoutsRoutes);
app.use("/goals", goalsRoutes);

app.listen(PORT, () => {
  console.log(`The app is listening on ${PORT}`);
});
