import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp, getStarterCode } from '../context/AppContext';
import { roomService, codeService } from '../services/api';
import {
  Code2,
  ArrowLeft,
  Save,
  Play,
  Copy,
  Check,
  Users,
  Info,
  Terminal,
  AlertCircle,
  CheckCircle2,
  Share2,
  Loader2,
  Keyboard,
  LogOut,
  RotateCcw,
  Globe,
  X,
  KeyRound,
  ExternalLink,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

const RoomEditor = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { currentUser, rooms, saveCodeSnippet, showToast } = useApp();

  const [currentRoom, setCurrentRoom] = useState(() => {
    const found = rooms.find((r) => r.id === roomId);
    if (found) return found;
    return {
      id: roomId || 'ABC123',
      name: 'Collaborative Coding Room',
      description: 'Real-time collaborative code editor session.',
      language: 'Python',
      members: [
        { name: currentUser?.name || 'You', role: 'Host', isOnline: true, color: 'bg-emerald-500' },
      ],
      code: getStarterCode('Python'),
    };
  });

  const [language, setLanguage] = useState(currentRoom.language || 'Python');
  const [code, setCode] = useState(currentRoom.code || getStarterCode(language));
  const [stdin, setStdin] = useState('');
  const [showStdin, setShowStdin] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [output, setOutput] = useState('');
  const [executionResult, setExecutionResult] = useState(null);
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
          setLanguage(res.room.language || 'Python');
          setCode(res.room.code || getStarterCode(res.room.language || 'Python'));
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
    setExecutionResult(null);
    setOutput('');
    showToast(`Switched editor mode to ${newLang}`);
  };

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(currentRoom.id || roomId);
    setCopied(true);
    showToast(`Room ID ${currentRoom.id || roomId} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyInviteLink = () => {
    const inviteUrl = window.location.origin + `/rooms/${currentRoom.id || roomId}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopiedLink(true);
    showToast(`Invite link copied! Share with your friends to code together.`);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleResetCode = () => {
    if (window.confirm('Reset code to default template?')) {
      setCode(getStarterCode(language));
      showToast(`Reset code template for ${language}`);
    }
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

  // Real Multi-Language Compiler & Execution Engine with Runtime/Syntax Error Detection
  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Compiling and executing code in cloud sandbox...\n');
    setExecutionResult(null);

    const startTime = performance.now();
    try {
      const res = await codeService.executeCode(language, code, stdin);
      const elapsedMs = Math.round(performance.now() - startTime);

      if (res) {
        const isErr = Boolean(res.isError || (res.exitCode !== 0 && res.exitCode !== undefined && res.exitCode !== null));
        const finalOutput = res.output || res.stdout || res.stderr || '(No output returned)';

        const resultObj = {
          isError: isErr,
          status: res.status || (isErr ? 'Execution Error' : 'Success'),
          language: res.language || language,
          version: res.version || '',
          stdout: res.stdout || '',
          stderr: res.stderr || '',
          output: finalOutput,
          exitCode: res.exitCode ?? (isErr ? 1 : 0),
          elapsedMs,
        };

        setExecutionResult(resultObj);
        setOutput(finalOutput);

        if (isErr) {
          showToast(`Execution finished with errors (${resultObj.status})`, 'error');
        } else {
          showToast('Code executed successfully!');
        }
      } else {
        throw new Error('No execution result returned from sandbox.');
      }
    } catch (err) {
      const elapsedMs = Math.round(performance.now() - startTime);
      const errorObj = {
        isError: true,
        status: 'Runtime Error',
        language,
        version: '',
        stdout: '',
        stderr: err.message,
        output: `Error during execution:\n${err.message}`,
        exitCode: 1,
        elapsedMs,
      };
      setExecutionResult(errorObj);
      setOutput(`Execution Error:\n${err.message}`);
      showToast(err.message || 'Execution error encountered', 'error');
    } finally {
      setIsRunning(false);
    }
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
        <div className="flex items-center space-x-3 sm:space-x-4">
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
                <span className="hidden sm:inline-flex text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded font-bold">
                  {currentRoom.id || roomId}
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Center/Right: Language, Run, Stdin Toggle, Save, Invite, Leave */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Language Selector */}
          <div className="flex items-center space-x-1.5 bg-slate-950 border border-slate-700 rounded-xl px-2 sm:px-2.5 py-1">
            <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">Lang:</span>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-emerald-400 focus:outline-none cursor-pointer"
            >
              <option value="Python" className="bg-slate-900 text-white">Python</option>
              <option value="C++" className="bg-slate-900 text-white">C++</option>
              <option value="Java" className="bg-slate-900 text-white">Java</option>
              <option value="C" className="bg-slate-900 text-white">C</option>
              <option value="JavaScript" className="bg-slate-900 text-white">JavaScript</option>
            </select>
          </div>

          {/* Stdin Toggle Button */}
          <button
            onClick={() => setShowStdin((prev) => !prev)}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
              showStdin || stdin.trim()
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-300'
            }`}
            title="Custom Standard Input (stdin) for input(), Scanner, cin"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Input (stdin)</span>
            {stdin.trim() && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            )}
          </button>

          {/* Run Code Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-md shadow-emerald-500/15 disabled:opacity-50 cursor-pointer"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Code</span>
              </>
            )}
          </button>

          {/* Save Code Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl text-xs transition cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>

          {/* Invite Friend Button */}
          <button
            onClick={() => {
              handleCopyInviteLink();
              setIsInviteModalOpen(true);
            }}
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold rounded-xl text-xs transition cursor-pointer"
            title="Invite friend to collaborate on this room"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Invite Friend</span>
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
            <span className="hidden sm:inline">Leave</span>
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
              <span className="text-slate-400 text-[11px] hidden sm:inline">— Live Real Compiler Sandbox</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleResetCode}
                className="text-slate-400 hover:text-slate-200 transition flex items-center gap-1 text-[11px] cursor-pointer"
                title="Reset template code"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
              <span className="text-slate-400 text-[11px]">
                UTF-8 • {lineCount} lines • Tab: 4 spaces
              </span>
            </div>
          </div>

          {/* Custom Textarea Editor Container */}
          <div className="flex-1 flex overflow-hidden relative bg-slate-950">
            {/* Line Numbers Column */}
            <div className="w-12 bg-slate-950/90 border-r border-slate-800/80 pt-4 pb-4 select-none text-right pr-3 font-mono text-xs text-slate-500 shrink-0 leading-6">
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

          {/* Standard Input (stdin) Panel Drawer */}
          {showStdin && (
            <div className="h-28 bg-slate-900 border-t border-slate-800 flex flex-col shrink-0">
              <div className="flex items-center justify-between px-4 py-1.5 bg-slate-950 border-b border-slate-800 text-[11px] font-bold text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Keyboard className="w-3.5 h-3.5" /> Standard Input (stdin)
                </span>
                <span className="text-[10px] text-slate-500">Provided to input() / Scanner / cin on run</span>
              </div>
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="Enter input data here (each line will be fed to input() / cin / Scanner)..."
                className="flex-1 w-full bg-slate-950 p-3 font-mono text-xs text-slate-200 resize-none focus:outline-none focus:ring-0 placeholder:text-slate-600"
              ></textarea>
            </div>
          )}

          {/* Compiler & Terminal Execution Console Output */}
          {(output || isRunning) && (
            <div className="h-56 bg-slate-900 border-t border-slate-800 flex flex-col shrink-0">
              {/* Terminal Title Bar with Real Status Badges */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs font-bold text-slate-400">
                <div className="flex items-center space-x-2.5">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Terminal className="w-3.5 h-3.5" /> Output Terminal
                  </span>

                  {executionResult && (
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          executionResult.isError
                            ? 'bg-rose-500/15 border border-rose-500/30 text-rose-400'
                            : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                        }`}
                      >
                        {executionResult.isError ? (
                          <>
                            <AlertCircle className="w-3 h-3 text-rose-400" />
                            {executionResult.status} (Exit {executionResult.exitCode})
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            {executionResult.status} (Exit {executionResult.exitCode})
                          </>
                        )}
                      </span>

                      {executionResult.version && (
                        <span className="hidden sm:inline-flex text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
                          {executionResult.language} {executionResult.version}
                        </span>
                      )}

                      {executionResult.elapsedMs !== undefined && (
                        <span className="hidden md:inline-flex text-[10px] text-slate-500">
                          {executionResult.elapsedMs}ms
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setOutput('');
                      setExecutionResult(null);
                    }}
                    className="text-[11px] text-slate-500 hover:text-slate-300 transition cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="flex-1 p-4 font-mono text-xs overflow-y-auto whitespace-pre-wrap leading-5 bg-slate-950 selection:bg-slate-800">
                {isRunning ? (
                  <div className="flex items-center space-x-2 text-cyan-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Compiling code and executing in sandbox engine...</span>
                  </div>
                ) : executionResult?.isError ? (
                  <div className="space-y-2">
                    <pre className="text-rose-400 font-medium">
                      {output}
                    </pre>
                    <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                      <span className="text-amber-400/90 flex items-center gap-1">
                        ⚠️ Code encountered an error. Check syntax, variable names, or missing inputs.
                      </span>
                      <button
                        onClick={() => {
                          handleCopyInviteLink();
                          setIsInviteModalOpen(true);
                        }}
                        className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                      >
                        Invite friend to help debug
                      </button>
                    </div>
                  </div>
                ) : (
                  <pre className="text-emerald-300/95 font-medium">
                    {output}
                  </pre>
                )}
              </div>
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
                {currentRoom.members && currentRoom.members.length > 0 ? (
                  currentRoom.members.map((member, idx) => {
                    const isCurrent =
                      (currentUser && (member.name === currentUser.name || (member.user && (member.user === currentUser._id || member.user === currentUser.id)))) ||
                      member.name === 'You';
                    const isHost =
                      member.role === 'Host' ||
                      (currentRoom.owner && (member.name === currentRoom.owner || (currentRoom.ownerId && member.user === currentRoom.ownerId)));

                    let displayName = member.name;
                    if (isCurrent) {
                      displayName = member.name === 'You' ? (currentUser?.name ? `${currentUser.name} (You)` : 'You') : `${member.name} (You)`;
                    }

                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span className="text-xs font-semibold text-white">
                            {displayName}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            isHost
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-cyan-500/20 text-cyan-300'
                          }`}
                        >
                          {isHost ? 'Host' : 'Member'}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-xs font-semibold text-white">
                        {currentUser?.name ? `${currentUser.name} (You)` : 'You'}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      Host
                    </span>
                  </div>
                )}
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

            {/* Invite Friend Card */}
            <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" /> Invite Collaborators
                </span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-semibold px-2 py-0.5 rounded-full">
                  Real-time
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Invite peers to join this coding workspace using Room ID or direct invite link.
              </p>
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => setIsInviteModalOpen(true)}
                  className="w-full py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Invite Friends (Get Link)</span>
                </button>
                <button
                  onClick={handleCopyRoomId}
                  className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer font-mono"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Room ID Copied!' : `Copy Room ID (${currentRoom.id || roomId})`}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Helper Tips */}
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60 text-[11px] text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300 block">💡 Pro Tip:</span>
            <p>If your code uses <code className="text-cyan-300 font-mono">input()</code> or <code className="text-cyan-300 font-mono">cin</code>, click <strong className="text-cyan-300">Input (stdin)</strong> to provide input values before running.</p>
          </div>
        </div>
      </div>

      {/* Invite Collaborators Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/60">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Invite Collaborator</h3>
                  <p className="text-xs text-slate-400">Share room access to code together in real-time</p>
                </div>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Option 1: Room ID */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Option 1: Share Room ID (Easiest for all environments)</span>
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-slate-950 border border-slate-700 px-4 py-3 rounded-xl flex items-center justify-between font-mono">
                    <span className="text-lg font-black tracking-widest text-cyan-300">
                      {currentRoom.id || roomId}
                    </span>
                    <span className="text-[11px] text-slate-500 uppercase font-sans font-semibold">6-Char Room Key</span>
                  </div>
                  <button
                    onClick={handleCopyRoomId}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 transition cursor-pointer shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Your friend can log into their CollabCode dashboard and click <strong className="text-slate-200">"Join Room"</strong>, then enter this ID.
                </p>
              </div>

              {/* Option 2: Direct Share Link */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Option 2: Direct Invite URL</span>
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}/rooms/${currentRoom.id || roomId}`}
                    className="flex-1 bg-slate-950 border border-slate-700 px-3.5 py-2.5 rounded-xl text-xs text-slate-300 font-mono select-all focus:outline-none"
                  />
                  <button
                    onClick={handleCopyInviteLink}
                    className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition cursor-pointer shrink-0 shadow-md shadow-emerald-500/20"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Smart Environment Note */}
              {window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200/90 text-xs space-y-2">
                  <div className="flex items-center space-x-2 font-bold text-amber-300">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Testing on Localhost?</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-100/80">
                    Because <code className="bg-amber-950/60 px-1 py-0.5 rounded text-amber-300">localhost</code> points to your own computer, sharing a <code className="bg-amber-950/60 px-1 py-0.5 rounded text-amber-300">localhost</code> URL with a friend on another computer will show <em>"localhost refused to connect"</em>.
                  </p>
                  <div className="pt-1 text-[11px] text-slate-300 space-y-1">
                    <p className="font-semibold text-white">How your friend can join right now:</p>
                    <ul className="list-disc pl-4 space-y-1 text-slate-300">
                      <li><strong>Share Room ID:</strong> Give them the 6-character Room ID above to enter in their app.</li>
                      <li><strong>Wi-Fi LAN:</strong> If on the same Wi-Fi, share your local IP (e.g. <code className="text-cyan-300">http://192.168.x.x:3000/rooms/{currentRoom.id || roomId}</code>).</li>
                      <li><strong>Production Cloud:</strong> When deployed on Vercel/Netlify, the direct link works anywhere in the world automatically!</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center space-x-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Cloud Live:</strong> Anyone in the world can click this link to join your coding session!
                  </span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end p-4 border-t border-slate-800 bg-slate-900/40">
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="px-5 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomEditor;
