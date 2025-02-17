// src/models/CreditCardDetail.js
import mongoose, { Schema } from 'mongoose';

const CreditCardDetailSchema = new Schema({
  cardNumber: {
    type: String,
    required: [true, 'Please enter card number'],
  },
  pin: {
    type: String,
    required: [true, 'Please enter PIN'],
  },
  cvv: {
    type: String,
    required: [true, 'Please enter CVV'],
  },
  expiry: {
    type: String,
    required: [true, 'Please enter expiry date'],
  },
  cardType: {
    type: String,
    enum: ['Visa', 'MasterCard', 'Amex'], // Example card types, adjust as needed
    required: [true, 'Please select card type'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CreditCardDetail = mongoose.models.CreditCardDetail || mongoose.model('CreditCardDetail', CreditCardDetailSchema);

export default CreditCardDetail;