import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    user : {type: Schema.Types.ObjectId, ref: "User", required: true},
    title :{type:String, required: true},
    amount : {type:Number, required: true},
    date : {type: Date, default: Date.now},
    category : {type:String, required: true},
    description: {type:String}
});

const Expense = mongoose.model("Expense", ExpenseSchema);

export default Expense;