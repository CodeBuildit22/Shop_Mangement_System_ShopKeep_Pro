import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Sale from './models/Sale.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("Connection Error:", err));

// --- PRODUCT ROUTES ---
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
});

app.put('/api/products/:id', async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

app.delete('/api/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

// --- SALES ROUTES ---
app.get('/api/sales', async (req, res) => {
    const sales = await Sale.find().sort({ timestamp: -1 });
    res.json(sales);
});

app.post('/api/sales', async (req, res) => {
    const { items, total, paymentMethod, customerName } = req.body;

    // 1. Save the Sale
    const newSale = new Sale({ items, total, paymentMethod, customerName });
    await newSale.save();

    // 2. Bulk update inventory stock
    const bulkOps = items.map(item => ({
        updateOne: {
            filter: { _id: item._id },
            update: { $inc: { stock: -item.quantity } }
        }
    }));
    await Product.bulkWrite(bulkOps);

    res.json(newSale);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));