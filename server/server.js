import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import expenseRoutes from "./routes/expenseRoutes.js"

// Configure dotenv with explicit path
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => {
  console.error("❌ DB Connection Error:", err.message);
  process.exit(1);
});


// Routes
app.use("/auth", authRoutes);

app.use("/expenses", expenseRoutes);

// Start server
app.listen(port, () =>
  console.log(`🚀 Server running on port ${port}`)
);
