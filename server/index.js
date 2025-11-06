
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Optional: simple schema and test document
const testSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Test = mongoose.model('Test', testSchema);

// Add a test document
async function addTestDoc() {
    const doc = new Test({ name: 'Harsha', age: 23 });
    await doc.save();
    console.log('Test document saved!');
}

addTestDoc();
