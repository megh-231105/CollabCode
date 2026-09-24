const mongoose = require('mongoose');

const codingRoomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: [true, 'Room ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    roomName: {
      type: String,
      required: [true, 'Room name is required'],
      trim: true,
      maxlength: [100, 'Room name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      default: '',
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        name: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          enum: ['Host', 'Member'],
          default: 'Member',
        },
        isOnline: {
          type: Boolean,
          default: true,
        },
        color: {
          type: String,
          default: 'bg-emerald-500',
        },
      },
    ],
    language: {
      type: String,
      enum: ['C', 'C++', 'Java', 'Python', 'JavaScript'],
      default: 'C++',
    },
    code: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Virtual or method to get member count
codingRoomSchema.virtual('memberCount').get(function () {
  return this.members ? this.members.length : 0;
});

const CodingRoom = mongoose.model('CodingRoom', codingRoomSchema);

module.exports = CodingRoom;
