// models/WebsiteDetail.js
import mongoose, { Schema } from 'mongoose';

const WebsiteDetailSchema = new Schema({
  url: {
    type: String,
    required: [true, 'Please enter a URL'],
  },
  username: {
    type: String,
    required: [true, 'Please enter a username'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const WebsiteDetail = mongoose.models.WebsiteDetail || mongoose.model('WebsiteDetail', WebsiteDetailSchema);

export default WebsiteDetail;