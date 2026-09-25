const CodingRoom = require('../models/CodingRoom');
const User = require('../models/User');

const getStarterCode = (language) => {
  switch (language) {
    case 'C':
      return `#include <stdio.h>

int main() {
    printf("Hello from CollabCode C Workspace!\\n");
    return 0;
}`;
    case 'C++':
      return `#include <iostream>
using namespace std;

int main() {
    cout << "Welcome to CollabCode C++ Editor!" << endl;
    return 0;
}`;
    case 'Java':
      return `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, CollabCode Java Workspace!");
    }
}`;
    case 'Python':
      return `# CollabCode Python Workspace
def main():
    print("Welcome to CollabCode Python Editor!")

if __name__ == "__main__":
    main()
`;
    case 'JavaScript':
      return `// CollabCode JavaScript Workspace
console.log("Welcome to CollabCode JavaScript Editor!");

function calculateSum(a, b) {
  return a + b;
}

console.log("Sum result:", calculateSum(10, 25));
`;
    default:
      return `// Welcome to CollabCode`;
  }
};

// Generate random unique room ID
const generateUniqueRoomId = async () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let roomId = '';
  let exists = true;

  while (exists) {
    roomId = '';
    for (let i = 0; i < 6; i++) {
      roomId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const found = await CodingRoom.findOne({ roomId });
    if (!found) exists = false;
  }

  return roomId;
};

// @desc    Create a new coding room
// @route   POST /api/rooms
// @access  Private
const createRoom = async (req, res) => {
  try {
    const { name, roomName, description, language = 'C++', customRoomId } = req.body;
    const finalRoomName = roomName || name;

    if (!finalRoomName) {
      return res.status(400).json({
        success: false,
        message: 'Room name is required',
      });
    }

    let roomId = customRoomId ? customRoomId.trim().toUpperCase() : await generateUniqueRoomId();

    if (customRoomId) {
      const existing = await CodingRoom.findOne({ roomId });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `Room ID "${roomId}" is already taken. Please choose another or leave blank for auto-generation.`,
        });
      }
    }

    const initialCode = getStarterCode(language);

    const newRoom = await CodingRoom.create({
      roomId,
      roomName: finalRoomName.trim(),
      description: (description || '').trim(),
      language,
      code: initialCode,
      owner: req.user._id,
      members: [
        {
          user: req.user._id,
          name: req.user.name,
          role: 'Host',
          isOnline: true,
          color: 'bg-emerald-500',
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: 'Coding room created successfully',
      room: {
        id: newRoom.roomId,
        _id: newRoom._id,
        name: newRoom.roomName,
        description: newRoom.description,
        language: newRoom.language,
        code: newRoom.code,
        owner: req.user.name,
        members: newRoom.members,
        lastUpdated: 'Just now',
        createdAt: newRoom.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error creating room',
      error: error.message,
    });
  }
};

// @desc    Get all coding rooms
// @route   GET /api/rooms
// @access  Private (or Public with auth token)
const getAllRooms = async (req, res) => {
  try {
    const rooms = await CodingRoom.find()
      .populate('owner', 'name email')
      .sort({ updatedAt: -1 });

    const formattedRooms = rooms.map((room) => ({
      id: room.roomId,
      _id: room._id,
      name: room.roomName,
      description: room.description,
      language: room.language,
      code: room.code,
      owner: room.owner ? room.owner.name : 'Unknown',
      ownerId: room.owner ? room.owner._id : null,
      members: room.members,
      lastUpdated: new Date(room.updatedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      count: formattedRooms.length,
      rooms: formattedRooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error fetching rooms',
      error: error.message,
    });
  }
};

// @desc    Get single room by roomId
// @route   GET /api/rooms/:roomId
// @access  Private
const getRoomById = async (req, res) => {
  try {
    const queryId = req.params.roomId.trim().toUpperCase();

    let room = await CodingRoom.findOne({
      $or: [{ roomId: queryId }, { _id: queryId.match(/^[0-9a-fA-F]{24}$/) ? queryId : null }],
    }).populate('owner', 'name email');

    if (!room) {
      // If room not found, return 404
      return res.status(404).json({
        success: false,
        message: `Room "${queryId}" not found in database.`,
      });
    }

    // If authenticated user is not in room members, automatically add them as a Member
    if (req.user) {
      const isMember = room.members.some(
        (m) =>
          (m.user && m.user.toString() === req.user._id.toString()) ||
          m.name === req.user.name
      );
      if (!isMember) {
        room.members.push({
          user: req.user._id,
          name: req.user.name,
          role: room.owner && room.owner._id.toString() === req.user._id.toString() ? 'Host' : 'Member',
          isOnline: true,
          color: 'bg-cyan-500',
        });
        await room.save();
      }
    }

    return res.status(200).json({
      success: true,
      room: {
        id: room.roomId,
        _id: room._id,
        name: room.roomName,
        description: room.description,
        language: room.language,
        code: room.code,
        owner: room.owner ? room.owner.name : 'Unknown',
        ownerId: room.owner ? room.owner._id : null,
        members: room.members,
        lastUpdated: new Date(room.updatedAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error fetching room details',
      error: error.message,
    });
  }
};

// @desc    Join coding room
// @route   POST /api/rooms/:roomId/join
// @access  Private
const joinRoom = async (req, res) => {
  try {
    const queryId = req.params.roomId.trim().toUpperCase();

    const room = await CodingRoom.findOne({
      $or: [{ roomId: queryId }, { _id: queryId.match(/^[0-9a-fA-F]{24}$/) ? queryId : null }],
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: `Coding room with ID "${queryId}" was not found.`,
      });
    }

    const isMember = room.members.some(
      (m) =>
        (m.user && m.user.toString() === req.user._id.toString()) ||
        m.name === req.user.name
    );

    if (!isMember) {
      room.members.push({
        user: req.user._id,
        name: req.user.name,
        role: room.owner.toString() === req.user._id.toString() ? 'Host' : 'Member',
        isOnline: true,
        color: 'bg-cyan-500',
      });
      await room.save();
    }

    return res.status(200).json({
      success: true,
      message: `Successfully joined room ${room.roomName}`,
      room: {
        id: room.roomId,
        name: room.roomName,
        language: room.language,
        code: room.code,
        members: room.members,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error joining room',
      error: error.message,
    });
  }
};

// @desc    Update room details or save code
// @route   PUT /api/rooms/:roomId
// @access  Private
const updateRoom = async (req, res) => {
  try {
    const queryId = req.params.roomId.trim().toUpperCase();
    const { code, language, name, roomName, description } = req.body;

    const room = await CodingRoom.findOne({
      $or: [{ roomId: queryId }, { _id: queryId.match(/^[0-9a-fA-F]{24}$/) ? queryId : null }],
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found to update',
      });
    }

    if (code !== undefined) room.code = code;
    if (language) room.language = language;
    if (roomName || name) room.roomName = (roomName || name).trim();
    if (description !== undefined) room.description = description.trim();

    await room.save();

    return res.status(200).json({
      success: true,
      message: 'Room code and settings saved successfully to MongoDB',
      room: {
        id: room.roomId,
        name: room.roomName,
        description: room.description,
        language: room.language,
        code: room.code,
        members: room.members,
        updatedAt: room.updatedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error updating room',
      error: error.message,
    });
  }
};

// @desc    Delete coding room
// @route   DELETE /api/rooms/:roomId
// @access  Private
const deleteRoom = async (req, res) => {
  try {
    const queryId = req.params.roomId.trim().toUpperCase();

    const room = await CodingRoom.findOne({
      $or: [{ roomId: queryId }, { _id: queryId.match(/^[0-9a-fA-F]{24}$/) ? queryId : null }],
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    // Only room owner or admin can delete
    const isOwner = room.owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Only the room creator or an administrator can delete this room.',
      });
    }

    await room.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Room deleted successfully from database',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error deleting room',
      error: error.message,
    });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  joinRoom,
  updateRoom,
  deleteRoom,
  getStarterCode,
};
