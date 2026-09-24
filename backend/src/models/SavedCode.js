const mongoose = require('mongoose');

const savedCodeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Snippet title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    language: {
      type: String,
      enum: ['C', 'C++', 'Java', 'Python', 'JavaScript'],
      default: 'C++',
      required: true,
    },
    code: {
      type: String,
      default: '',
    },
    lines: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const SavedCode = mongoose.model('SavedCode', savedCodeSchema);

module.exports = SavedCode;
