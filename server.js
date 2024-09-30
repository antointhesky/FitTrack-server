import express from "express";
import knexInit from "knex"; 
import configuration from "./knexfile.js"; 
import sessionRoutes from "./routes/sessionRoutes.js";
import goalsRoutes from "./routes/goalsRoutes.js";
import exercisesRoutes from "./routes/exercisesRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import workoutsRoutes from "./routes/workoutsRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const knex = knexInit(configuration); 

const app = express();
const { PORT, FRONTEND_URL } = process.env;

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.static("public"));
app.use(express.json());

app.use("/session", sessionRoutes);
app.use("/exercises", exercisesRoutes);
app.use("/goals", goalsRoutes);
app.use("/workouts", workoutsRoutes);
app.use("/progress", progressRoutes);

app.get("/exercises/bodyparts", (req, res) => {
  knex("exercises")
    .distinct("body_part")
    .then((bodyParts) => {
      if (!bodyParts.length) {
        return res.status(404).json({ message: "No body parts found" });
      }
      res.json(bodyParts);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching body parts", error });
    });
});

app.listen(PORT, () => {
});
