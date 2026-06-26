import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  userId: String,

  productId: {
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  },

  orderId: String,

  accessStatus: {
    type: String,
    default: 'active'
  }

}, {
 timestamps:true
});

export default mongoose.models.Purchase ||
mongoose.model('Purchase', PurchaseSchema);