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
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const knex = knexInit(configuration); 
const app = express();

// Fix for `__dirname` in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Updated CORS configuration
const { PORT = 5050, FRONTEND_URL = "http://localhost:5173" } = process.env;
app.use(cors({
  origin: FRONTEND_URL.replace(/\/$/, ""), // Remove trailing slash if present
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));

app.use(express.json());

// Serve static files properly
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure multer storage for file uploads
const storage = multer.diskStorage({
  destination: "./uploads", // Upload folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
  }
});

const upload = multer({ storage });

// Upload image route
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json({ message: "Image uploaded successfully", filePath: `/uploads/${req.file.filename}` });
});

// Fetch uploaded images
app.get("/gallery", (req, res) => {
  const uploadsDir = path.join(__dirname, "uploads");
  
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Error reading uploads directory" });
    }
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    const filePaths = imageFiles.map(file => `/uploads/${file}`);
    res.status(200).json(filePaths);
  });
});

// Delete uploaded image
app.delete("/delete-photo", (req, res) => {
  const { filePath } = req.body;
  
  if (!filePath) {
    return res.status(400).json({ message: "No file path provided" });
  }

  const fullPath = path.join(__dirname, "uploads", path.basename(filePath));

  fs.stat(fullPath, (err, stats) => {
    if (err || !stats) {
      return res.status(404).json({ message: "File not found" });
    }
    
    fs.unlink(fullPath, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting file" });
      }
      res.status(200).json({ message: "Image deleted successfully" });
    });
  });
});

// API Routes
app.use("/session", sessionRoutes);
app.use("/exercises", exercisesRoutes);
app.use("/goals", goalsRoutes);
app.use("/workouts", workoutsRoutes);
app.use("/progress", progressRoutes);

// Fetch distinct exercise body parts
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

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
