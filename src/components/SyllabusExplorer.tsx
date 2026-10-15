import React, { useState } from 'react';
import { Subject, SyllabusModule, User } from '../types';
import { api } from '../services/api';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Layers,
  Code,
  Cpu,
  Terminal,
  FileSpreadsheet,
  Network,
  CheckCircle2
} from 'lucide-react';

interface SyllabusExplorerProps {
  subjects: Subject[];
  currentUser: User | null;
  onRefreshSubjects: () => void;
}

export const SyllabusExplorer: React.FC<SyllabusExplorerProps> = ({
  subjects,
  currentUser,
  onRefreshSubjects
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || 'prog_lang');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Admin add module state
  const [showAddModal, setShowAddModal] = useState(false);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleCode, setModuleCode] = useState('');
  const [moduleDesc, setModuleDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const currentSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const getSubjectIcon = (id: string) => {
    switch (id) {
      case 'prog_lang':
        return <Code className="w-5 h-5 text-blue-600" />;
      case 'ict':
        return <Cpu className="w-5 h-5 text-emerald-600" />;
      case 'os':
        return <Terminal className="w-5 h-5 text-amber-600" />;
      case 'msoffice':
        return <FileSpreadsheet className="w-5 h-5 text-purple-600" />;
      case 'networks':
        return <Network className="w-5 h-5 text-cyan-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-slate-600" />;
    }
  };

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduleTitle || !currentSubject) return;
    setLoading(true);

    try {
      await api.addModule(currentSubject.id, {
        title: moduleTitle,
        code: moduleCode,
        description: moduleDesc
      });
      setShowAddModal(false);
      setModuleTitle('');
      setModuleCode('');
      setModuleDesc('');
      onRefreshSubjects();
    } catch (err: any) {
      alert(err.message || 'Failed to add module');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteModule = async (modId: string) => {
    if (!window.confirm('Are you sure you want to delete this module from syllabus?')) return;
    try {
      await api.deleteModule(currentSubject.id, modId);
      onRefreshSubjects();
    } catch (err: any) {
      alert(err.message || 'Failed to delete module');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">
            DIT Academic Syllabus & Course Curriculum
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Superior College Board of Technical Studies — Complete Module-wise Syllabus for all 5 Subjects
          </p>
        </div>

        {currentUser?.role === 'admin' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Module to Current Subject</span>
          </button>
        )}
      </div>

      {/* 5 Subjects Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {subjects.map((subj) => {
          const isSelected = subj.id === selectedSubjectId;
          return (
            <button
              key={subj.id}
              onClick={() => setSelectedSubjectId(subj.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-emerald-600 shadow-sm ring-1 ring-emerald-600'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                {getSubjectIcon(subj.id)}
                <span className="text-[11px] font-mono font-semibold text-slate-500">
                  {subj.code}
                </span>
              </div>
              <div>
                <h3 className={`text-xs font-bold ${isSelected ? 'text-emerald-900' : 'text-slate-800'}`}>
                  {subj.name}
                </h3>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  {subj.modules?.length || 0} Modules
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Subject Syllabus Card */}
      {currentSubject && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {currentSubject.code}
                </span>
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  {currentSubject.name}
                </h2>
              </div>
              <p className="text-xs text-slate-600 max-w-3xl">
                {currentSubject.description}
              </p>
            </div>
            <div className="text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
              Exam Format: <strong className="text-slate-900">75 Total Marks</strong> (39 MCQs + 28 Short + 8 Long)
            </div>
          </div>

          {/* Module List Accordions */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800">
              Curriculum Modules ({currentSubject.modules?.length || 0})
            </h3>

            {currentSubject.modules?.map((mod, index) => {
              const isExpanded = expandedModules[mod.id] ?? (index === 0);
              return (
                <div
                  key={mod.id}
                  className="rounded-lg border border-slate-200 overflow-hidden transition-all bg-white"
                >
                  <div
                    onClick={() => toggleModule(mod.id)}
                    className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 font-mono">
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-slate-400 font-medium">{mod.code}</span>
                          <h4 className="text-sm font-semibold text-slate-900">{mod.title}</h4>
                        </div>
                        {mod.description && (
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{mod.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {currentUser?.role === 'admin' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteModule(mod.id);
                          }}
                          className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                          title="Delete module"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3 text-xs">
                      {mod.chapters && mod.chapters.length > 0 ? (
                        mod.chapters.map((ch) => (
                          <div key={ch.id} className="bg-white p-3.5 rounded-lg border border-slate-200">
                            <h5 className="font-semibold text-slate-800 text-xs mb-2 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Chapter: {ch.title}</span>
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                              {ch.topics.map((top) => (
                                <div
                                  key={top.id}
                                  className="flex items-start gap-1.5 text-slate-600 bg-slate-50 p-2 rounded border border-slate-100"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{top.title}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 italic">
                          Topics include core fundamentals, laboratory practicals, and theoretical examination outcomes.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Admin Add Module Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Add New Syllabus Module — {currentSubject.name}
            </h3>

            <form onSubmit={handleAddModule} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Module Title *</label>
                <input
                  type="text"
                  required
                  value={moduleTitle}
                  onChange={(e) => setModuleTitle(e.target.value)}
                  placeholder="e.g. Advanced Routing Protocols & BGP"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Module Code</label>
                <input
                  type="text"
                  value={moduleCode}
                  onChange={(e) => setModuleCode(e.target.value)}
                  placeholder="e.g. MOD-CN-07"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono uppercase"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Description & Scope</label>
                <textarea
                  rows={3}
                  value={moduleDesc}
                  onChange={(e) => setModuleDesc(e.target.value)}
                  placeholder="Summary of topics, algorithms, and practical competencies covered..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer"
                >
                  {loading ? 'Adding...' : 'Save Module'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
