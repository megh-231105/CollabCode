import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, roomService, codeService } from '../services/api';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const cached = localStorage.getItem('collabcode_user');
    if (cached) {
      try {
        const u = JSON.parse(cached);
        return {
          ...u,
          avatar: u.name ? u.name[0].toUpperCase() : 'U',
          memberSince: u.createdAt
            ? new Date(u.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            : 'Recent',
        };
      } catch (e) {}
    }
    return {
      name: 'Guest User',
      email: 'guest@collabcode.dev',
      role: 'USER',
      avatar: 'G',
      memberSince: 'Today',
    };
  });

  const [rooms, setRooms] = useState([]);
  const [savedCode, setSavedCode] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => setNotification(null), 3500);
  };

  // Fetch initial profile, rooms, and saved code from backend
  const refreshData = async () => {
    const token = localStorage.getItem('collabcode_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // 1. Fetch Current User Profile
      const meRes = await authService.getMe().catch(() => null);
      if (meRes && meRes.user) {
        const u = meRes.user;
        const formattedUser = {
          ...u,
          avatar: u.name ? u.name[0].toUpperCase() : 'U',
          memberSince: u.createdAt
            ? new Date(u.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            : 'September 2026',
        };
        setCurrentUser(formattedUser);
        localStorage.setItem('collabcode_user', JSON.stringify(formattedUser));
      }

      // 2. Fetch Rooms from MongoDB
      const roomsRes = await roomService.getRooms().catch(() => null);
      if (roomsRes && roomsRes.rooms) {
        setRooms(roomsRes.rooms);
      }

      // 3. Fetch Saved Code from MongoDB
      const codeRes = await codeService.getSavedCode().catch(() => null);
      if (codeRes && codeRes.savedCode) {
        setSavedCode(codeRes.savedCode);
      }
    } catch (err) {
      console.error('Error refreshing backend data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const createRoom = async (newRoomData) => {
    try {
      const res = await roomService.createRoom(newRoomData);
      if (res && res.room) {
        setRooms((prev) => [res.room, ...prev.filter((r) => r.id !== res.room.id)]);
        showToast(`Room "${res.room.name}" created with ID: ${res.room.id}`);
        return res.room;
      }
    } catch (error) {
      // Fallback local create if network issue
      const randomId = 'ROOM' + Math.floor(100 + Math.random() * 900);
      const fallbackRoom = {
        id: randomId,
        name: newRoomData.name || 'Untitled Room',
        description: newRoomData.description || 'Collaborative coding session.',
        language: newRoomData.language || 'C++',
        members: [{ name: currentUser.name, role: 'Host', isOnline: true, color: 'bg-emerald-500' }],
        lastUpdated: 'Just now',
        code: getStarterCode(newRoomData.language || 'C++'),
      };
      setRooms([fallbackRoom, ...rooms]);
      showToast(`Room created (ID: ${fallbackRoom.id})`);
      return fallbackRoom;
    }
  };

  const deleteRoom = async (roomId) => {
    try {
      await roomService.deleteRoom(roomId);
      setRooms((prev) => prev.filter((r) => r.id !== roomId));
      showToast('Room successfully deleted from database.');
    } catch (error) {
      setRooms((prev) => prev.filter((r) => r.id !== roomId));
      showToast(error.message || 'Room removed.');
    }
  };

  const saveCodeSnippet = async (snippet) => {
    try {
      const res = await codeService.saveCode({
        title: snippet.title || 'Untitled Snippet',
        language: snippet.language || 'C++',
        code: snippet.code || '',
      });

      if (res && res.snippet) {
        setSavedCode((prev) => [res.snippet, ...prev]);
        showToast('Code successfully saved to your MongoDB catalog!');
      }
    } catch (error) {
      // Local fallback
      const fallbackSnippet = {
        id: 'sc-' + Date.now(),
        title: snippet.title || 'Untitled Snippet',
        language: snippet.language || 'C++',
        lastSaved: 'Just now',
        lines: (snippet.code || '').split('\n').length,
        code: snippet.code || '',
      };
      setSavedCode([fallbackSnippet, ...savedCode]);
      showToast('Code saved!');
    }
  };

  const deleteSavedCode = async (id) => {
    try {
      await codeService.deleteSavedCode(id);
      setSavedCode((prev) => prev.filter((c) => c.id !== id && c._id !== id));
      showToast('Snippet deleted from saved code.');
    } catch (error) {
      setSavedCode((prev) => prev.filter((c) => c.id !== id && c._id !== id));
      showToast(error.message || 'Snippet removed.');
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const res = await authService.updateProfile(updatedData);
      if (res && res.user) {
        const u = res.user;
        const formattedUser = {
          ...u,
          avatar: u.name ? u.name[0].toUpperCase() : 'U',
          memberSince: u.createdAt
            ? new Date(u.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            : currentUser.memberSince,
        };
        setCurrentUser(formattedUser);
        localStorage.setItem('collabcode_user', JSON.stringify(formattedUser));
        showToast('Profile updated in MongoDB successfully!');
        return;
      }
    } catch (error) {
      showToast(error.message || 'Error updating profile', 'error');
    }
    setCurrentUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        rooms,
        setRooms,
        savedCode,
        setSavedCode,
        adminUsers,
        setAdminUsers,
        loading,
        refreshData,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isJoinModalOpen,
        setIsJoinModalOpen,
        createRoom,
        deleteRoom,
        saveCodeSnippet,
        deleteSavedCode,
        updateProfile,
        notification,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

export const getStarterCode = (language) => {
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
