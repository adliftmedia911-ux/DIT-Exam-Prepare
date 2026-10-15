import React from 'react';
import { User } from '../types';
import { LogOut, UserCheck, ShieldCheck, BookOpen, FileSpreadsheet, Award, Compass } from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  activeTab: 'dashboard' | 'syllabus' | 'admin' | 'results';
  setActiveTab: (tab: 'dashboard' | 'syllabus' | 'admin' | 'results') => void;
  onLogout: () => void;
  onOpenLogin: (role?: 'student' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onLogout,
  onOpenLogin
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Notice Bar */}
      <div className="bg-[#0A192F] text-slate-200 text-xs py-1.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-amber-400">Superior College Official Examination Portal</span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden sm:inline">DIT 75-Marks Online Evaluation System</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            {currentUser ? (
              <span className="flex items-center gap-1.5">
                {currentUser.role === 'admin' ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                )}
                <span className="text-white font-medium">{currentUser.name}</span>
                {currentUser.rollNo && (
                  <span className="text-slate-400 font-mono">({currentUser.rollNo})</span>
                )}
              </span>
            ) : (
              <span className="text-slate-400">Portal Guest</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Top Navigation (Three-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <img
            src="/src/assets/images/superior_college_crest_1792082168452.jpg"
            alt="Superior College Crest"
            className="w-10 h-10 object-contain rounded-md border border-slate-200"
            referrerPolicy="no-referrer"
          />
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('dashboard');
              }}
              className="text-lg font-bold tracking-tight text-slate-900 block whitespace-nowrap"
            >
              Superior College
            </a>
            <span className="text-xs text-emerald-700 font-medium block -mt-0.5">
              DIT Smart Exam System
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'dashboard'
                ? 'text-slate-900 font-semibold border-b-2 border-emerald-600 -mb-[18px] pb-3'
                : 'hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>Exams & Papers</span>
          </button>

          <button
            onClick={() => setActiveTab('syllabus')}
            className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'syllabus'
                ? 'text-slate-900 font-semibold border-b-2 border-emerald-600 -mb-[18px] pb-3'
                : 'hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-slate-500" />
            <span>DIT Syllabus</span>
          </button>

          {currentUser?.role === 'student' && (
            <button
              onClick={() => setActiveTab('results')}
              className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'results'
                  ? 'text-slate-900 font-semibold border-b-2 border-emerald-600 -mb-[18px] pb-3'
                  : 'hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4 text-slate-500" />
              <span>My Result Cards</span>
            </button>
          )}

          <button
            onClick={() => {
              if (currentUser?.role === 'admin') {
                setActiveTab('admin');
              } else {
                onOpenLogin('admin');
              }
            }}
            className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'admin'
                ? 'text-slate-900 font-semibold border-b-2 border-emerald-600 -mb-[18px] pb-3'
                : 'hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-slate-500" />
            <span>Examiner & Admin Portal</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & User Session */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="hidden lg:inline text-xs text-slate-500 font-mono">
                {currentUser.role === 'admin' ? 'Faculty Admin' : currentUser.session || 'DIT Student'}
              </span>
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenLogin('student')}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              >
                Student Sign In
              </button>
              <button
                onClick={() => onOpenLogin('admin')}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
              >
                Examiner Portal
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
