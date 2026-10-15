import React, { useState } from 'react';
import { api } from '../services/api';
import { User } from '../types';
import { LogIn, UserPlus, Shield, CheckCircle, AlertCircle, X, KeyRound, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  initialRole?: 'student' | 'admin';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialRole = 'student'
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'student' | 'admin'>(initialRole);

  // Form states
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [collegeName, setCollegeName] = useState('Superior College of Commerce & IT, Lahore');
  const [session, setSession] = useState('2023-2025');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.login(identifier, role, password);
      onSuccess(res.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.register({
        name,
        rollNo,
        email,
        collegeName,
        session,
        phone
      });
      onSuccess(res.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const quickFillStudent = (num: 1 | 2) => {
    setRole('student');
    setMode('login');
    if (num === 1) {
      setIdentifier('DIT-2024-042');
      setPassword('Student@123');
    } else {
      setIdentifier('DIT-2024-089');
      setPassword('Student@123');
    }
  };

  const quickFillAdmin = () => {
    setRole('admin');
    setMode('login');
    setIdentifier('admin@superior.edu.pk');
    setPassword('Admin@123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-[#0A192F] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <img
              src="/src/assets/images/superior_college_crest_1792082168452.jpg"
              alt="Superior College Crest"
              className="w-10 h-10 object-contain rounded-md border border-slate-700 bg-white"
              referrerPolicy="no-referrer"
            />
            <div>
              <h2 className="text-lg font-bold">Superior College</h2>
              <p className="text-xs text-emerald-400">DIT Smart Examination System</p>
            </div>
          </div>

          {/* Quick Demo Switcher Strip */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Demo 1-Click:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => quickFillStudent(1)}
                className="px-2 py-0.5 rounded text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              >
                Ali (Student)
              </button>
              <button
                type="button"
                onClick={() => quickFillStudent(2)}
                className="px-2 py-0.5 rounded text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              >
                Fatima (Student)
              </button>
              <button
                type="button"
                onClick={quickFillAdmin}
                className="px-2 py-0.5 rounded text-[11px] bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 transition-colors cursor-pointer"
              >
                Admin Examiner
              </button>
            </div>
          </div>
        </div>

        {/* Role & Mode Switcher */}
        <div className="px-5 pt-4">
          <div className="flex rounded-lg bg-slate-100 p-1 mb-4">
            <button
              type="button"
              onClick={() => {
                setRole('student');
                setError(null);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                role === 'student' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student Portal
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('admin');
                setMode('login');
                setError(null);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                role === 'admin' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Faculty Examiner
            </button>
          </div>

          {role === 'student' && (
            <div className="flex border-b border-slate-200 text-xs mb-4">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`pb-2 px-3 font-semibold transition-colors cursor-pointer ${
                  mode === 'login'
                    ? 'border-b-2 border-emerald-600 text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`pb-2 px-3 font-semibold transition-colors cursor-pointer ${
                  mode === 'register'
                    ? 'border-b-2 border-emerald-600 text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Register New Student
              </button>
            </div>
          )}
        </div>

        {/* Form Body */}
        <div className="p-5 pt-0">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {role === 'student' ? 'Roll Number or Registered Email' : 'Admin Email or Username'}
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={role === 'student' ? 'e.g. DIT-2024-042 or student email' : 'admin@superior.edu.pk'}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-700">Password</label>
                  <span className="text-[11px] text-slate-400">Demo: Student@123 / Admin@123</span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-[#0A192F] hover:bg-slate-800 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to {role === 'student' ? 'Student Portal' : 'Admin Portal'}</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Full Student Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bilal Ahmed"
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Roll Number *</label>
                  <input
                    type="text"
                    required
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="e.g. DIT-2024-105"
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg uppercase font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Class Session</label>
                  <input
                    type="text"
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                    placeholder="2023-2025"
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="bilal.ahmed@superior.edu.pk"
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">College Campus</label>
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="Superior College Lahore"
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Phone / WhatsApp</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Registering...</span>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Complete Registration</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Security note */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>To update credentials in production, configure admin in database or environment.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
