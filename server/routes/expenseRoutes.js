import express from "express";

 import { createExpense,
  updateExpense,
  deleteExpense,
  getExpenses,
} from "../controllers/expenseController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createExpense);
router.put("/:id", authMiddleware, updateExpense);
router.delete("/:id", authMiddleware, deleteExpense);
router.get("/", authMiddleware, getExpenses);

export default router;
