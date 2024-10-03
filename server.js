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
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const knex = knexInit(configuration); 

const app = express();
const { PORT, FRONTEND_URL } = process.env;

// Fix for `__dirname` in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.static("public"));
app.use(express.json());

// Configure multer storage for file uploads
const storage = multer.diskStorage({
  destination: './uploads',  // Specify where to save the files
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Unique filename with timestamp
  }
});

const upload = multer({ storage });

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to handle file uploads
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({ message: 'Image uploaded successfully', filePath: `/uploads/${req.file.filename}` });
});

// New route to fetch the uploaded images
app.get('/gallery', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');
  
  // Read the contents of the uploads directory
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading uploads directory' });
    }

    // Filter only image files and return their file paths
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    const filePaths = imageFiles.map(file => `/uploads/${file}`);

    res.status(200).json(filePaths);
  });
});

// Route to handle file deletion
app.delete('/delete-photo', (req, res) => {
  const { filePath } = req.body;
  
  if (!filePath) {
    return res.status(400).json({ message: 'No file path provided' });
  }

  const fullPath = path.join(__dirname, 'uploads', path.basename(filePath));

  // Check if file exists before deleting
  fs.stat(fullPath, (err, stats) => {
    if (err || !stats) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Proceed to delete the file
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ message: 'Error deleting file' });
      }
      res.status(200).json({ message: 'Image deleted successfully' });
    });
  });
});

// Other routes
app.use("/session", sessionRoutes);
app.use("/exercises", exercisesRoutes);
app.use("/goals", goalsRoutes);
app.use("/workouts", workoutsRoutes);
app.use("/progress", progressRoutes);

// Endpoint for exercises by body parts
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
