import Expense from "../models/ExpenseModel.js";

export const createExpense = async (req, res) => {
  const {  title, amount, category, description } = req.body;

  try {const newExpense = new Expense({
    user:req.user._id,
    title,
    amount,
    category,
    description,
  });
  await newExpense.save();
  return res.status(201).json(newExpense);
} catch (error) {
  return res.status(500).json({ message: error.message });
}
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;

  const existingExpense = await Expense.findById({
    _id: id,
    user: req.user._id,
  });

  if (!existingExpense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  Object.assign(existingExpense, req.body);
  await existingExpense.save();
  return res.status(200).json(existingExpense);
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const deletedExpense = await Expense.findOneAndDelete({
  _id: req.params.id,
  user: req.user._id
});

if (!deletedExpense) return res.status(404).json({ message: "Expense not found" });

res.json({ message: "Expense deleted successfully" });

  return res.status(204).json();
};

export const getExpenses = async (req, res) => {
  const { category, startDate, endDate, search } = req.query;

  try {
    const query = {
      user: req.user._id,
    };

    if (category) {
      query.category = category;
    }

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const expense = await Expense.find(query).sort({ createdAt: -1 });
    return res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
