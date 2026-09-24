import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { useApp } from '../context/AppContext';
import {
  Bookmark,
  Search,
  Filter,
  Code2,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Clock,
  FileCode2,
  X
} from 'lucide-react';

const SavedCode = () => {
  const { savedCode, deleteSavedCode, showToast, createRoom } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');
  const [activeSnippet, setActiveSnippet] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const navigate = useNavigate();

  const languages = ['ALL', 'C++', 'C', 'Java', 'Python', 'JavaScript'];

  const filteredSnippets = savedCode.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLanguage =
      selectedLanguage === 'ALL' || item.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  const handleCopy = (snippet) => {
    navigator.clipboard.writeText(snippet.code);
    setCopiedId(snippet.id);
    showToast('Code copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenInNewRoom = (snippet) => {
    const newRoom = createRoom({
      name: snippet.title,
      language: snippet.language,
      description: `Collaborative session for ${snippet.title}`,
    });
    newRoom.code = snippet.code;
    navigate(`/rooms/${newRoom.id}`);
  };

  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              My Saved Code
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Access and manage your personal repository of algorithm snippets and solutions.
            </p>
          </div>
          <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
            Total Snippets: <span className="text-emerald-400 font-bold">{savedCode.length}</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search snippet title or code contents..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition text-sm"
            />
          </div>

          {/* Language Filter */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Language:
            </span>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  selectedLanguage === lang
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Saved Code Cards Grid */}
        {filteredSnippets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSnippets.map((snippet) => (
              <div
                key={snippet.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition hover:shadow-xl group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {snippet.language}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {snippet.lastSaved}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition mb-3 tracking-tight">
                    {snippet.title}
                  </h3>

                  {/* Code Preview Box */}
                  <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-[11px] text-slate-400 max-h-28 overflow-hidden relative mb-4">
                    <pre className="whitespace-pre overflow-x-hidden leading-5">
                      {snippet.code.slice(0, 150)}...
                    </pre>
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-950 to-transparent"></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => setActiveSnippet(snippet)}
                    className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition"
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>View Code</span>
                  </button>

                  <button
                    onClick={() => handleOpenInNewRoom(snippet)}
                    className="flex items-center space-x-1 py-2 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold rounded-xl text-xs transition"
                    title="Launch Room with this Code"
                  >
                    <span>Open in Room</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => handleCopy(snippet)}
                    className="p-2 text-slate-400 hover:text-white bg-slate-950 rounded-xl border border-slate-800 hover:bg-slate-800 transition"
                    title="Copy Code"
                  >
                    {copiedId === snippet.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => deleteSavedCode(snippet.id)}
                    className="p-2 text-slate-400 hover:text-rose-400 bg-slate-950 rounded-xl border border-slate-800 hover:bg-rose-500/10 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-3xl space-y-3">
            <Bookmark className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No saved code found</h3>
            <p className="text-xs text-slate-400">Save algorithms directly from your coding rooms to view them here.</p>
          </div>
        )}
      </div>

      {/* Snippet Viewer Modal */}
      {activeSnippet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded text-xs font-bold font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {activeSnippet.language}
                </span>
                <h3 className="text-base font-bold text-white">{activeSnippet.title}</h3>
              </div>
              <button
                onClick={() => setActiveSnippet(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-5 overflow-auto bg-slate-950 font-mono text-xs text-slate-200">
              <pre className="whitespace-pre leading-6">{activeSnippet.code}</pre>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
              <span className="text-xs text-slate-400">Saved: {activeSnippet.lastSaved}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(activeSnippet)}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </button>
                <button
                  onClick={() => {
                    handleOpenInNewRoom(activeSnippet);
                    setActiveSnippet(null);
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition"
                >
                  <span>Launch in Room</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default SavedCode;
