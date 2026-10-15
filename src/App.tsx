import React, { useState, useEffect } from 'react';
import { User, Subject, Exam, ExamSubmission, ExamStatistics } from './types';
import { api } from './services/api';
import { Navbar } from './components/Navbar';
import { StudentDashboard } from './components/StudentDashboard';
import { SyllabusExplorer } from './components/SyllabusExplorer';
import { ExamInstructionsModal } from './components/ExamInstructionsModal';
import { ExamHall } from './components/ExamHall';
import { InstantResultModal } from './components/InstantResultModal';
import { OfficialResultCard } from './components/OfficialResultCard';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { Award, BookOpen, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Current user state (pre-fill with Student 1 Ali Raza for instant interactive readiness)
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Core data states
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [submissions, setSubmissions] = useState<ExamSubmission[]>([]);
  const [statistics, setStatistics] = useState<ExamStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  // App views & modals
  const [activeTab, setActiveTab] = useState<'dashboard' | 'syllabus' | 'admin' | 'results'>('dashboard');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialRole, setAuthInitialRole] = useState<'student' | 'admin'>('student');

  // Examination flow states
  const [examInstructionsTarget, setExamInstructionsTarget] = useState<Exam | null>(null);
  const [activeExamHall, setActiveExamHall] = useState<{
    exam: Exam;
    mcqs: any[];
    shortQuestions: any[];
    longQuestion?: any;
  } | null>(null);
  const [instantResult, setInstantResult] = useState<ExamSubmission | null>(null);
  const [viewingOfficialResult, setViewingOfficialResult] = useState<ExamSubmission | null>(null);

  // Load initial subjects, exams, submissions, and default demo user
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [fetchedSubjects, fetchedExams, fetchedSubmissions, fetchedStats] = await Promise.all([
        api.getSubjects(),
        api.getExams(),
        api.getSubmissions(),
        api.getStatistics().catch(() => null)
      ]);

      setSubjects(fetchedSubjects);
      setExams(fetchedExams);
      setSubmissions(fetchedSubmissions);
      setStatistics(fetchedStats);

      // Default user: Ali Raza (DIT Student) for instant testing if not already set
      if (!currentUser) {
        try {
          const loginRes = await api.login('DIT-2024-042', 'student', 'Student@123');
          setCurrentUser(loginRes.user);
        } catch {
          // Fallback if not ready
        }
      }
    } catch (err) {
      console.error('Failed to load application data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      const [fetchedSubjects, fetchedExams, fetchedSubmissions, fetchedStats] = await Promise.all([
        api.getSubjects(),
        api.getExams(),
        api.getSubmissions(),
        api.getStatistics().catch(() => null)
      ]);
      setSubjects(fetchedSubjects);
      setExams(fetchedExams);
      setSubmissions(fetchedSubmissions);
      setStatistics(fetchedStats);
    } catch (err) {
      console.error('Refresh error:', err);
    }
  };

  const handleOpenLogin = (role: 'student' | 'admin' = 'student') => {
    setAuthInitialRole(role);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('dashboard');
    }
    handleRefresh();
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  // Student Examination Flow
  const handleStartExamFlow = async (exam: Exam) => {
    if (!currentUser) {
      handleOpenLogin('student');
      return;
    }
    setExamInstructionsTarget(exam);
  };

  const handleEnterExamHall = async () => {
    if (!examInstructionsTarget || !currentUser) return;
    try {
      const examData = await api.getExam(examInstructionsTarget.id);
      setActiveExamHall(examData);
      setExamInstructionsTarget(null);
    } catch (err: any) {
      alert(`Could not enter exam hall: ${err.message}`);
    }
  };

  const handleSubmitExamAnswers = async (payload: {
    examId: string;
    studentId: string;
    mcqAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>;
    uploadedFile?: any;
    richTextAnswers?: any;
    startedAt: string;
  }) => {
    try {
      const res = await api.submitExam(payload);
      setActiveExamHall(null);
      setInstantResult(res.submission);
      handleRefresh();
    } catch (err: any) {
      alert(`Submission error: ${err.message}`);
      throw err;
    }
  };

  // If student is currently taking an exam inside the exam hall
  if (activeExamHall && currentUser) {
    return (
      <ExamHall
        exam={activeExamHall.exam}
        mcqs={activeExamHall.mcqs}
        shortQuestions={activeExamHall.shortQuestions}
        longQuestion={activeExamHall.longQuestion}
        student={currentUser}
        onSubmitExam={handleSubmitExamAnswers}
        onExit={() => {
          if (confirm('Are you sure you want to exit the exam? Your progress will be discarded.')) {
            setActiveExamHall(null);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        onOpenLogin={handleOpenLogin}
      />

      {/* Main Container */}
      <main className="flex-1 pb-16">
        {loading && !subjects.length ? (
          <div className="flex items-center justify-center py-24">
            <div className="space-y-3 text-center">
              <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-semibold text-slate-600">
                Loading Superior College DIT Examination System...
              </p>
            </div>
          </div>
        ) : viewingOfficialResult ? (
          <OfficialResultCard
            submission={viewingOfficialResult}
            onBack={() => setViewingOfficialResult(null)}
          />
        ) : activeTab === 'syllabus' ? (
          <SyllabusExplorer
            subjects={subjects}
            currentUser={currentUser}
            onRefreshSubjects={handleRefresh}
          />
        ) : activeTab === 'admin' ? (
          currentUser?.role === 'admin' ? (
            <AdminDashboard
              adminUser={currentUser}
              subjects={subjects}
              exams={exams}
              submissions={submissions}
              statistics={statistics}
              onRefreshData={handleRefresh}
              onViewSubmissionResult={(sub) => setViewingOfficialResult(sub)}
            />
          ) : (
            <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
              <h2 className="text-lg font-bold text-slate-900 font-display">Faculty Authentication Required</h2>
              <p className="text-xs text-slate-500">
                You must be logged in as an authorized Faculty Examiner to access paper checking, question banks, and scheduling.
              </p>
              <button
                onClick={() => handleOpenLogin('admin')}
                className="px-5 py-2.5 rounded-lg bg-[#0A192F] hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer"
              >
                Sign In as Examiner / Admin
              </button>
            </div>
          )
        ) : activeTab === 'results' && currentUser?.role === 'student' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-xl font-bold text-slate-900 font-display">My Examination Results & Marksheets</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official performance record for {currentUser.name} ({currentUser.rollNo})
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {submissions
                .filter(s => s.studentId === currentUser.id)
                .map(sub => (
                  <div key={sub.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          75 Marks Paper
                        </span>
                        <span className="text-slate-400">
                          {new Date(sub.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">{sub.subjectName}</h3>
                      <div className="space-y-1.5 py-3 border-y border-slate-100 my-3 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Section A (MCQs):</span>
                          <strong className="font-mono text-emerald-800">{sub.sectionAMarksObtained} / 39</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Section B & C (Word):</span>
                          <strong className="font-mono text-slate-800">
                            {sub.sectionBMarksObtained !== null ? `${(sub.sectionBMarksObtained || 0) + (sub.sectionCMarksObtained || 0)} / 36` : 'Pending Marking'}
                          </strong>
                        </div>
                        <div className="flex justify-between pt-1 font-bold text-slate-900">
                          <span>Total Marks:</span>
                          <span className="font-mono text-emerald-900">
                            {sub.status === 'published' ? `${sub.totalMarksObtained} / 75 (${sub.percentage}%)` : `${sub.sectionAMarksObtained}+ Pending / 75`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setViewingOfficialResult(sub)}
                      className="w-full py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
                    >
                      View Official Marksheet
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          currentUser ? (
            <StudentDashboard
              student={currentUser}
              exams={exams}
              submissions={submissions}
              onStartExam={handleStartExamFlow}
              onViewResult={(sub) => setViewingOfficialResult(sub)}
              onBrowseSyllabus={() => setActiveTab('syllabus')}
            />
          ) : (
            <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
              <img
                src="/src/assets/images/superior_college_crest_1792082168452.jpg"
                alt="Superior College"
                className="w-20 h-20 object-contain mx-auto rounded-lg shadow-sm"
                referrerPolicy="no-referrer"
              />
              <h2 className="text-2xl font-bold text-slate-900 font-display">Superior College DIT Exam System</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Sign in with your student roll number or faculty credentials to access the 75-mark online examination portal.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => handleOpenLogin('student')}
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs cursor-pointer shadow-xs"
                >
                  Candidate Sign In
                </button>
                <button
                  onClick={() => handleOpenLogin('admin')}
                  className="px-5 py-2.5 rounded-lg bg-[#0A192F] hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer"
                >
                  Faculty Examiner
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* Instructions Modal */}
      {examInstructionsTarget && currentUser && (
        <ExamInstructionsModal
          exam={examInstructionsTarget}
          student={currentUser}
          onClose={() => setExamInstructionsTarget(null)}
          onProceed={handleEnterExamHall}
        />
      )}

      {/* Instant Result Modal */}
      {instantResult && (
        <InstantResultModal
          submission={instantResult}
          onClose={() => setInstantResult(null)}
          onViewMarksheet={() => {
            setViewingOfficialResult(instantResult);
            setInstantResult(null);
          }}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialRole={authInitialRole}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
