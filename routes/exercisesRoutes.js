import express from "express";
import initknex from "knex";
import configuration from "../knexfile.js";
import { getAllExercises } from "../controllers/exercisesControllers.js";

const knex = initknex(configuration);
const router = express.Router();

// Fetch distinct body parts
router.get("/bodyparts", (req, res) => {
  knex("exercises")
    .distinct("body_part")
    .then((bodyParts) => {
      if (!bodyParts.length) {
        return res.status(404).json({ message: "No body parts found" });
      }
      res.json(bodyParts);
    })
    .catch((error) => {
      console.error("Error fetching body parts:", error);
      res.status(500).json({ message: "Error fetching body parts", error });
    });
});

router.get("/", getAllExercises);

export default router;
