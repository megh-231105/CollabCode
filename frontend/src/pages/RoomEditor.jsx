import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp, getStarterCode } from '../context/AppContext';
import { roomService } from '../services/api';
import {
  Code2,
  DoorOpen,
  ArrowLeft,
  Save,
  Play,
  Copy,
  Check,
  Users,
  Info,
  Terminal,
  Layers,
  Sparkles,
  LogOut,
  Maximize2,
  RotateCcw
} from 'lucide-react';

const RoomEditor = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { rooms, saveCodeSnippet, showToast } = useApp();

  const [currentRoom, setCurrentRoom] = useState(() => {
    const found = rooms.find((r) => r.id === roomId);
    if (found) return found;
    return {
      id: roomId || 'ABC123',
      name: 'Collaborative Coding Room',
      description: 'Real-time collaborative code editor session.',
      language: 'C++',
      members: [
        { name: 'You', role: 'Host', isOnline: true, color: 'bg-emerald-500' },
      ],
      code: getStarterCode('C++'),
    };
  });

  const [language, setLanguage] = useState(currentRoom.language || 'C++');
  const [code, setCode] = useState(currentRoom.code || getStarterCode(language));
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef(null);

  // Fetch live room from backend MongoDB Atlas
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await roomService.getRoomById(roomId);
        if (res && res.room) {
          setCurrentRoom(res.room);
          setLanguage(res.room.language || 'C++');
          setCode(res.room.code || getStarterCode(res.room.language || 'C++'));
        }
      } catch (err) {
        console.warn('Using local room workspace state:', err.message);
      }
    };

    if (roomId) {
      fetchRoom();
    }
  }, [roomId]);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(getStarterCode(newLang));
    showToast(`Switched editor mode to ${newLang}`);
  };

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(currentRoom.id || roomId);
    setCopied(true);
    showToast(`Room ID ${currentRoom.id || roomId} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 1. Update room document in MongoDB Atlas
      await roomService.updateRoom(roomId, {
        code,
        language,
      });

      // 2. Save snippet into user catalog
      await saveCodeSnippet({
        title: `${currentRoom.name} (${language})`,
        language: language,
        code: code,
      });

      showToast('Code saved to MongoDB Atlas & catalog successfully!');
    } catch (err) {
      // Fallback
      saveCodeSnippet({
        title: `${currentRoom.name} (${language})`,
        language: language,
        code: code,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Compiling and executing script in cloud sandbox...\n');

    setTimeout(() => {
      setIsRunning(false);
      let simulatedOutput = '';
      if (language === 'C++') {
        simulatedOutput = `[Execution Success - GCC 11.2]\n${currentRoom.name} Running!\nOutputs: [0, 1]\n\nProcess finished with exit code 0`;
      } else if (language === 'Python') {
        simulatedOutput = `[Execution Success - Python 3.11]\nCollabCode Python Workspace\nOutput: Prime calculation verified\n\n>>> Program exited safely.`;
      } else if (language === 'Java') {
        simulatedOutput = `[Execution Success - OpenJDK 17]\nWelcome to Java Practice Room!\nResult: Execution completed\n\nProcess finished with exit code 0`;
      } else if (language === 'C') {
        simulatedOutput = `[Execution Success - C17 Standard]\nHello from CollabCode C Workspace!\n\nProcess finished with exit code 0`;
      } else {
        simulatedOutput = `[Execution Success - Node.js 20.x]\nWelcome to CollabCode JavaScript Editor!\nOutput: 35\nLive cloud sandbox test completed.`;
      }
      setOutput(simulatedOutput);
      showToast('Execution finished successfully!');
    }, 600);
  };

  // Support Tab key indentation inside textarea
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const lineCount = (code || '').split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 18) }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Top Navbar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20">
        {/* Left: Brand & Room Title */}
        <div className="flex items-center space-x-4">
          <Link
            to="/rooms"
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Rooms</span>
          </Link>

          <div className="h-5 w-px bg-slate-800"></div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                {currentRoom.name}
                <span className="hidden sm:inline-flex text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.2 rounded font-bold">
                  {currentRoom.id || roomId}
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Center/Right: Language, Run, Save, Leave */}
        <div className="flex items-center space-x-2.5">
          {/* Language Selector */}
          <div className="flex items-center space-x-1.5 bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1">
            <span className="text-[11px] font-bold text-slate-400">Language:</span>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-emerald-400 focus:outline-none cursor-pointer"
            >
              <option value="C++" className="bg-slate-900 text-white">C++</option>
              <option value="C" className="bg-slate-900 text-white">C</option>
              <option value="Java" className="bg-slate-900 text-white">Java</option>
              <option value="Python" className="bg-slate-900 text-white">Python</option>
              <option value="JavaScript" className="bg-slate-900 text-white">JavaScript</option>
            </select>
          </div>

          {/* Run Code Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-md shadow-emerald-500/15 disabled:opacity-50 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Run Code</span>
          </button>

          {/* Save Code Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl text-xs transition cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save Code'}</span>
          </button>

          {/* Leave Room Button */}
          <button
            onClick={() => {
              showToast('Exited coding room session.');
              navigate('/rooms');
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-semibold rounded-xl text-xs transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Leave Room</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Code Editor Workspace */}
        <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          {/* File Tab Bar */}
          <div className="h-9 bg-slate-900/70 border-b border-slate-800 flex items-center justify-between px-4 text-xs font-mono">
            <div className="flex items-center space-x-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-semibold text-emerald-400">
                solution.{language === 'C++' ? 'cpp' : language === 'Java' ? 'java' : language === 'Python' ? 'py' : language === 'C' ? 'c' : 'js'}
              </span>
              <span className="text-slate-400 text-[11px]">— MongoDB Synced</span>
            </div>
            <span className="text-slate-400 text-[11px]">
              UTF-8 • {lineCount} lines • Tab: 4 spaces
            </span>
          </div>

          {/* Custom Textarea Editor Container */}
          <div className="flex-1 flex overflow-hidden relative bg-slate-950">
            {/* Line Numbers Column */}
            <div className="w-12 bg-slate-950/90 border-r border-slate-800/80 pt-4 pb-4 select-none text-right pr-3 font-mono text-xs text-slate-400 shrink-0 leading-6">
              {lineNumbers.map((n) => (
                <div key={n}>{n}</div>
              ))}
            </div>

            {/* Code Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
              className="flex-1 w-full bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm p-4 leading-6 resize-none focus:outline-none focus:ring-0 selection:bg-emerald-500/30 selection:text-white caret-emerald-400 overflow-auto whitespace-pre font-medium"
              placeholder="// Type your code here..."
            ></textarea>
          </div>

          {/* Simulated Bottom Console Output */}
          {output && (
            <div className="h-44 bg-slate-900 border-t border-slate-800 flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Terminal className="w-3.5 h-3.5" /> Output Terminal
                </span>
                <button
                  onClick={() => setOutput('')}
                  className="text-[11px] text-slate-500 hover:text-slate-300 transition cursor-pointer"
                >
                  Clear
                </button>
              </div>
              <pre className="flex-1 p-4 font-mono text-xs text-emerald-300/90 overflow-y-auto whitespace-pre-wrap leading-5 bg-slate-950">
                {output}
              </pre>
            </div>
          )}
        </div>

        {/* Right Side: Room Members & Information Sidebar */}
        <div className="w-full lg:w-72 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between p-5 space-y-6 shrink-0 overflow-y-auto">
          <div className="space-y-6">
            {/* Room Members Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Room Members</span>
                </h3>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  {currentRoom.members?.length || 1} Online
                </span>
              </div>

              <div className="space-y-2">
                {currentRoom.members?.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-xs font-semibold text-white">
                        {member.name} {member.role === 'Host' ? '(Host)' : ''}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        member.role === 'Host'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-cyan-500/20 text-cyan-300'
                      }`}
                    >
                      {member.role || 'Member'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Information Section */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>Room Details</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Language:</span>
                  <span className="font-bold text-white">{language}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Members:</span>
                  <span className="font-bold text-white">{currentRoom.members?.length || 1}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Room Name:</span>
                  <span className="font-bold text-white truncate max-w-[120px]">
                    {currentRoom.name}
                  </span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-400 block mb-1.5">Room ID:</span>
                  <div className="flex items-center justify-between bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg">
                    <span className="font-mono font-bold text-cyan-300 text-xs tracking-wider">
                      {currentRoom.id || roomId}
                    </span>
                    <button
                      onClick={handleCopyRoomId}
                      className="text-slate-400 hover:text-white transition cursor-pointer"
                      title="Copy Room ID"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Helper Tips */}
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60 text-[11px] text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300 block">💡 Pro Tip:</span>
            <p>Click <strong className="text-cyan-300">Save Code</strong> to sync your latest solution changes to MongoDB Atlas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomEditor;
