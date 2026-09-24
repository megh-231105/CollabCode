import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

const INITIAL_ROOMS = [
  {
    id: 'ABC123',
    name: 'DSA Practice',
    description: 'Practicing Data Structures & Algorithms and LeetCode problems.',
    language: 'C++',
    members: [
      { name: 'Meghana', role: 'Host', isOnline: true, color: 'bg-emerald-500' },
      { name: 'Rahul', role: 'Member', isOnline: true, color: 'bg-cyan-500' },
    ],
    lastUpdated: 'Today, 2:30 PM',
    code: `#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

// Two Sum - Find indices of two numbers that add up to target
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> numMap;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (numMap.find(complement) != numMap.end()) {
            return {numMap[complement], i};
        }
        numMap[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = twoSum(nums, target);
    
    cout << "DSA Practice Room Running!" << endl;
    if (!result.empty()) {
        cout << "Indices: [" << result[0] << ", " << result[1] << "]" << endl;
    }
    return 0;
}`,
  },
  {
    id: 'JAVA404',
    name: 'Java Practice',
    description: 'Object-Oriented Programming and Spring Boot fundamentals.',
    language: 'Java',
    members: [
      { name: 'Meghana', role: 'Member', isOnline: true, color: 'bg-emerald-500' },
      { name: 'Rahul', role: 'Host', isOnline: true, color: 'bg-cyan-500' },
      { name: 'Anu', role: 'Member', isOnline: false, color: 'bg-purple-500' },
    ],
    lastUpdated: 'Yesterday',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Java Practice Room!");
        
        String word = "radar";
        boolean isPalindrome = checkPalindrome(word);
        System.out.println("Is '" + word + "' a palindrome? " + isPalindrome);
    }
    
    public static boolean checkPalindrome(String str) {
        int left = 0, right = str.length() - 1;
        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }
}`,
  },
  {
    id: 'PY7890',
    name: 'Python Problems',
    description: 'Machine learning algorithms and script automations.',
    language: 'Python',
    members: [
      { name: 'Meghana', role: 'Member', isOnline: true, color: 'bg-emerald-500' },
      { name: 'Anu', role: 'Host', isOnline: true, color: 'bg-purple-500' },
      { name: 'Vikram', role: 'Member', isOnline: false, color: 'bg-amber-500' },
      { name: 'Priya', role: 'Member', isOnline: true, color: 'bg-rose-500' },
    ],
    lastUpdated: '2 days ago',
    code: `def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

if __name__ == "__main__":
    test_nums = [2, 17, 24, 29, 31, 100]
    print("CollabCode Python Workspace")
    primes = [n for n in test_nums if is_prime(n)]
    print(f"Primes in list: {primes}")
`,
  },
  {
    id: 'JS2026',
    name: 'Full Stack JS Live',
    description: 'Building async JavaScript logic and modern DOM components.',
    language: 'JavaScript',
    members: [
      { name: 'Meghana', role: 'Host', isOnline: true, color: 'bg-emerald-500' },
      { name: 'Siddharth', role: 'Member', isOnline: true, color: 'bg-indigo-500' },
    ],
    lastUpdated: '3 days ago',
    code: `// Async JavaScript Data Pipeline
async function fetchCollaborators() {
  console.log("Fetching live room participants...");
  const collaborators = ["Meghana", "Siddharth", "Rahul"];
  return new Promise((resolve) => setTimeout(() => resolve(collaborators), 500));
}

fetchCollaborators().then(users => {
  console.log("Active users in room:", users.join(", "));
});
`,
  },
];

const INITIAL_SAVED_CODE = [
  {
    id: 'sc-1',
    title: 'Two Sum Algorithm',
    language: 'C++',
    lastSaved: 'Today, 10:15 AM',
    lines: 28,
    code: `#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> numMap;\n    for (int i = 0; i < nums.size(); i++) {\n        int comp = target - nums[i];\n        if (numMap.count(comp)) return {numMap[comp], i};\n        numMap[nums[i]] = i;\n    }\n    return {};\n}`,
  },
  {
    id: 'sc-2',
    title: 'Prime Number Checker',
    language: 'Python',
    lastSaved: 'Yesterday',
    lines: 16,
    code: `def is_prime(n):\n    if n <= 1:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nprint("7 is prime:", is_prime(7))`,
  },
  {
    id: 'sc-3',
    title: 'Palindrome String Verification',
    language: 'Java',
    lastSaved: '3 days ago',
    lines: 22,
    code: `public class Palindrome {\n    public static boolean check(String s) {\n        return new StringBuilder(s).reverse().toString().equalsIgnoreCase(s);\n    }\n}`,
  },
  {
    id: 'sc-4',
    title: 'Binary Search Implementation',
    language: 'C',
    lastSaved: '5 days ago',
    lines: 24,
    code: `#include <stdio.h>\n\nint binarySearch(int arr[], int l, int r, int x) {\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (arr[m] == x) return m;\n        if (arr[m] < x) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}`,
  },
];

const INITIAL_ADMIN_USERS = [
  { id: 'u1', name: 'Meghana', email: 'meghana@gmail.com', role: 'USER', status: 'Active', roomsCount: 4, joinedDate: 'Sep 2026' },
  { id: 'u2', name: 'Rahul', email: 'rahul@gmail.com', role: 'USER', status: 'Active', roomsCount: 3, joinedDate: 'Sep 2026' },
  { id: 'u3', name: 'Admin User', email: 'admin@gmail.com', role: 'ADMIN', status: 'Active', roomsCount: 12, joinedDate: 'Aug 2026' },
  { id: 'u4', name: 'Anu Sharma', email: 'anu@example.com', role: 'USER', status: 'Active', roomsCount: 2, joinedDate: 'Sep 2026' },
  { id: 'u5', name: 'Vikram Patel', email: 'vikram@example.com', role: 'USER', status: 'Inactive', roomsCount: 1, joinedDate: 'Sep 2026' },
  { id: 'u6', name: 'Priya Nair', email: 'priya@example.com', role: 'USER', status: 'Active', roomsCount: 5, joinedDate: 'Aug 2026' },
];

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    name: 'Meghana',
    email: 'meghana@example.com',
    role: 'USER',
    avatar: 'M',
    memberSince: 'September 2026',
  });

  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [savedCode, setSavedCode] = useState(INITIAL_SAVED_CODE);
  const [adminUsers, setAdminUsers] = useState(INITIAL_ADMIN_USERS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => setNotification(null), 3500);
  };

  const createRoom = (newRoomData) => {
    const randomId = 'ROOM' + Math.floor(100 + Math.random() * 900);
    const newRoom = {
      id: randomId,
      name: newRoomData.name || 'Untitled Room',
      description: newRoomData.description || 'Collaborative coding session.',
      language: newRoomData.language || 'C++',
      members: [
        { name: currentUser.name, role: 'Host', isOnline: true, color: 'bg-emerald-500' }
      ],
      lastUpdated: 'Just now',
      code: getStarterCode(newRoomData.language || 'C++'),
    };
    setRooms([newRoom, ...rooms]);
    showToast(`Room "${newRoom.name}" created with ID: ${newRoom.id}`);
    return newRoom;
  };

  const deleteRoom = (roomId) => {
    setRooms(rooms.filter(r => r.id !== roomId));
    showToast('Room successfully deleted.');
  };

  const saveCodeSnippet = (snippet) => {
    const newSnippet = {
      id: 'sc-' + Date.now(),
      title: snippet.title || 'Untitled Snippet',
      language: snippet.language || 'C++',
      lastSaved: 'Just now',
      lines: (snippet.code || '').split('\n').length,
      code: snippet.code || '',
    };
    setSavedCode([newSnippet, ...savedCode]);
    showToast('Code successfully saved to your catalog!');
  };

  const deleteSavedCode = (id) => {
    setSavedCode(savedCode.filter(c => c.id !== id));
    showToast('Snippet deleted from saved code.');
  };

  const updateProfile = (updatedData) => {
    setCurrentUser({ ...currentUser, ...updatedData });
    showToast('Profile updated successfully!');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        rooms,
        savedCode,
        adminUsers,
        setAdminUsers,
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
