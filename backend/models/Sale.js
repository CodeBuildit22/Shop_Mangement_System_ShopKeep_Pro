import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema({
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        quantity: Number
    }],
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    customerName: { type: String, default: "Walk-in" },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Sale', SaleSchema);