import React, { useState, useEffect } from 'react';
import {
  User,
  Exam,
  ExamSubmission,
  ExamStatistics,
  Subject,
  MCQQuestion,
  ShortQuestion,
  LongQuestion
} from '../types';
import { api } from '../services/api';
import {
  Users,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Award,
  Download,
  Plus,
  Trash2,
  Edit,
  Eye,
  FileCheck,
  Search,
  Filter,
  Layers,
  Sparkles,
  X,
  FileSpreadsheet,
  Check,
  TrendingUp,
  Building
} from 'lucide-react';

interface AdminDashboardProps {
  adminUser: User;
  subjects: Subject[];
  exams: Exam[];
  submissions: ExamSubmission[];
  statistics: ExamStatistics | null;
  onRefreshData: () => void;
  onViewSubmissionResult: (sub: ExamSubmission) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  subjects,
  exams,
  submissions,
  statistics,
  onRefreshData,
  onViewSubmissionResult
}) => {
  const [activeTab, setActiveTab] = useState<'marking' | 'questions' | 'exams' | 'reports'>('marking');

  // Submissions filter
  const [submissionFilter, setSubmissionFilter] = useState<'all' | 'pending' | 'published'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  // Active grading modal
  const [gradingSubmission, setGradingSubmission] = useState<ExamSubmission | null>(null);
  const [gradingExam, setGradingExam] = useState<Exam | null>(null);
  const [gradingShortQs, setGradingShortQs] = useState<ShortQuestion[]>([]);
  const [gradingLongQ, setGradingLongQ] = useState<LongQuestion | null>(null);

  // Grading form state
  const [shortGrades, setShortGrades] = useState<Record<string, { marks: number; remarks: string }>>({});
  const [longGrade, setLongGrade] = useState<{ marks: number; remarks: string }>({ marks: 0, remarks: '' });
  const [teacherGeneralFeedback, setTeacherGeneralFeedback] = useState('Satisfactory completion of written questions.');
  const [isSavingGrade, setIsSavingGrade] = useState(false);

  // Question bank tab state
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || 'prog_lang');
  const [questionTypeFilter, setQuestionTypeFilter] = useState<'all' | 'mcq' | 'short' | 'long'>('all');
  const [bankMCQs, setBankMCQs] = useState<MCQQuestion[]>([]);
  const [bankShort, setBankShort] = useState<ShortQuestion[]>([]);
  const [bankLong, setBankLong] = useState<LongQuestion[]>([]);

  // Add question modal
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [newQuestionType, setNewQuestionType] = useState<'mcq' | 'short' | 'long'>('mcq');
  const [newQText, setNewQText] = useState('');
  const [newOptA, setNewOptA] = useState('');
  const [newOptB, setNewOptB] = useState('');
  const [newOptC, setNewOptC] = useState('');
  const [newOptD, setNewOptD] = useState('');
  const [newCorrect, setNewCorrect] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [newGuideline, setNewGuideline] = useState('80-120 words');
  const [newSubQuestions, setNewSubQuestions] = useState('');

  // Add exam modal
  const [showAddExamModal, setShowAddExamModal] = useState(false);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamSubjectId, setNewExamSubjectId] = useState(subjects[0]?.id || 'prog_lang');
  const [newExamDuration, setNewExamDuration] = useState(90);
  const [newExamPassing, setNewExamPassing] = useState(30);

  // Bulk CSV modal
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [csvSubjectId, setCsvSubjectId] = useState(subjects[0]?.id || 'prog_lang');

  // Load questions for selected subject
  useEffect(() => {
    loadQuestions(selectedSubjectId);
  }, [selectedSubjectId]);

  const loadQuestions = async (subId: string) => {
    try {
      const data = await api.getQuestions(subId);
      setBankMCQs(data.mcqs || []);
      setBankShort(data.shortQuestions || []);
      setBankLong(data.longQuestions || []);
    } catch (err) {
      console.error('Failed to load questions:', err);
    }
  };

  // Open Grading Drawer for a submission
  const handleOpenGrading = async (sub: ExamSubmission) => {
    try {
      const details = await api.getSubmission(sub.id);
      setGradingSubmission(details.submission);
      setGradingExam(details.exam);
      setGradingShortQs(details.shortQuestions || []);
      setGradingLongQ(details.longQuestion || null);

      // Pre-fill existing grades or reasonable defaults
      const initialShort: Record<string, { marks: number; remarks: string }> = {};
      if (details.submission.shortQuestionGrades && details.submission.shortQuestionGrades.length > 0) {
        details.submission.shortQuestionGrades.forEach(g => {
          initialShort[g.questionId] = {
            marks: g.marksObtained,
            remarks: g.teacherRemarks || ''
          };
        });
      } else {
        (details.shortQuestions || []).forEach(sq => {
          initialShort[sq.id] = { marks: 3, remarks: 'Good answer and concise points.' };
        });
      }
      setShortGrades(initialShort);

      if (details.submission.longQuestionGrade) {
        setLongGrade({
          marks: details.submission.longQuestionGrade.marksObtained,
          remarks: details.submission.longQuestionGrade.teacherRemarks || ''
        });
      } else {
        setLongGrade({ marks: 6, remarks: 'Well-structured analysis with solid examples.' });
      }

      setTeacherGeneralFeedback(
        details.submission.teacherFeedbackGeneral ||
          'Candidate demonstrated sound conceptual understanding in both objective and written paper components.'
      );
    } catch (err: any) {
      alert(`Could not load submission: ${err.message}`);
    }
  };

  // Submit Grade
  const handleSaveGrading = async () => {
    if (!gradingSubmission) return;
    setIsSavingGrade(true);

    try {
      const shortGradesPayload = Object.entries(shortGrades).map(([qId, val]) => ({
        questionId: qId,
        marksObtained: val.marks,
        teacherRemarks: val.remarks
      }));

      await api.gradeSubmission(gradingSubmission.id, {
        shortQuestionGrades: shortGradesPayload,
        longQuestionGrade: {
          questionId: gradingLongQ?.id || 'lq_default',
          marksObtained: longGrade.marks,
          teacherRemarks: longGrade.remarks
        },
        teacherFeedbackGeneral: teacherGeneralFeedback,
        gradedBy: adminUser.name
      });

      alert('Marks saved and Final Result published successfully!');
      setGradingSubmission(null);
      onRefreshData();
    } catch (err: any) {
      alert(`Failed to save grades: ${err.message}`);
    } finally {
      setIsSavingGrade(false);
    }
  };

  // Add Question handler
  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (newQuestionType === 'mcq') {
        await api.addMCQ({
          subjectId: selectedSubjectId,
          questionText: newQText,
          options: { A: newOptA, B: newOptB, C: newOptC, D: newOptD },
          correctAnswer: newCorrect
        });
      } else if (newQuestionType === 'short') {
        await api.addShortQuestion({
          subjectId: selectedSubjectId,
          questionText: newQText,
          wordGuideline: newGuideline
        });
      } else {
        const subs = newSubQuestions
          .split('\n')
          .map(s => s.trim())
          .filter(Boolean);
        await api.addLongQuestion({
          subjectId: selectedSubjectId,
          questionText: newQText,
          subQuestions: subs,
          wordGuideline: newGuideline
        });
      }

      setShowAddQuestionModal(false);
      setNewQText('');
      setNewOptA('');
      setNewOptB('');
      setNewOptC('');
      setNewOptD('');
      loadQuestions(selectedSubjectId);
      alert('Question added successfully!');
    } catch (err: any) {
      alert(`Failed to add question: ${err.message}`);
    }
  };

  // Delete Question
  const handleDeleteQuestion = async (id: string, type: 'mcq' | 'short' | 'long') => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    try {
      if (type === 'mcq') await api.deleteMCQ(id);
      else if (type === 'short') await api.deleteShortQuestion(id);
      else await api.deleteLongQuestion(id);
      loadQuestions(selectedSubjectId);
    } catch (err: any) {
      alert(`Failed to delete: ${err.message}`);
    }
  };

  // Create Exam
  const handleCreateExam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createExam({
        title: newExamTitle,
        subjectId: newExamSubjectId,
        durationMinutes: Number(newExamDuration),
        passingMarks: Number(newExamPassing)
      });
      setShowAddExamModal(false);
      setNewExamTitle('');
      onRefreshData();
      alert('Examination scheduled successfully!');
    } catch (err: any) {
      alert(`Failed to create exam: ${err.message}`);
    }
  };

  // Import CSV
  const handleImportCSV = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvText.trim()) return;
    try {
      const res = await api.importCSV(csvText, csvSubjectId);
      setShowCSVModal(false);
      setCsvText('');
      loadQuestions(selectedSubjectId);
      alert(`Imported ${res.importedCount} questions successfully!`);
    } catch (err: any) {
      alert(`Import error: ${err.message}`);
    }
  };

  // Filter submissions
  const filteredSubmissions = submissions.filter(sub => {
    if (submissionFilter === 'pending' && sub.status !== 'pending_marking') return false;
    if (submissionFilter === 'published' && sub.status !== 'published') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        sub.studentName.toLowerCase().includes(q) ||
        sub.studentRollNo.toLowerCase().includes(q) ||
        sub.subjectName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate live tally for active grading modal
  const liveShortSum = Object.values(shortGrades).reduce((acc, g) => acc + (Number(g.marks) || 0), 0);
  const liveLongSum = Number(longGrade.marks) || 0;
  const liveGrandTotal = (gradingSubmission?.sectionAMarksObtained || 0) + liveShortSum + liveLongSum;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Admin Banner */}
      <div className="bg-[#0A192F] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <span>Faculty & Controller of Examinations Portal</span>
            <span>·</span>
            <span>Superior College</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-white">
            Examiner Assessment & Paper Marking Control
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Evaluating Officer: <strong>{adminUser.name}</strong> · Total Paper Marks: <strong>75 Marks</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href={api.getExportCSVUrl()}
            className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export Results (CSV/Excel)</span>
          </a>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      {statistics && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 block mb-0.5">Total Candidates</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">
              {statistics.totalStudents}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 block mb-0.5">Active Exams</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">
              {statistics.totalExams}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 block mb-0.5">Total Submissions</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">
              {statistics.totalAttempts}
            </span>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-xs">
            <span className="text-xs text-amber-800 font-semibold block mb-0.5">
              Pending Word Sheets
            </span>
            <span className="text-xl font-extrabold text-amber-900 font-mono">
              {statistics.pendingMarkingCount}
            </span>
          </div>

          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-xs">
            <span className="text-xs text-emerald-800 font-semibold block mb-0.5">
              Overall Pass Rate
            </span>
            <span className="text-xl font-extrabold text-emerald-900 font-mono">
              {statistics.overallPassRate}%
            </span>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-6 text-sm font-semibold text-slate-600">
        <button
          onClick={() => setActiveTab('marking')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'marking'
              ? 'border-b-2 border-emerald-600 text-slate-900'
              : 'hover:text-slate-900'
          }`}
        >
          <FileCheck className="w-4 h-4 text-emerald-600" />
          <span>Answer Sheet Marking & Grading</span>
          {statistics && statistics.pendingMarkingCount > 0 && (
            <span className="text-xs font-mono bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">
              {statistics.pendingMarkingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('questions')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'questions'
              ? 'border-b-2 border-emerald-600 text-slate-900'
              : 'hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4 text-slate-500" />
          <span>Question Bank Management (195+ MCQs)</span>
        </button>

        <button
          onClick={() => setActiveTab('exams')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'exams'
              ? 'border-b-2 border-emerald-600 text-slate-900'
              : 'hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4 text-slate-500" />
          <span>Exams & Scheduling</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'reports'
              ? 'border-b-2 border-emerald-600 text-slate-900'
              : 'hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-slate-500" />
          <span>Subject Performance & Reports</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: ANSWER SHEET CHECKING & MARKING */}
      {/* ======================================================== */}
      {activeTab === 'marking' && (
        <div className="space-y-4">
          {/* Submissions Filter Toolbar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
              <button
                onClick={() => setSubmissionFilter('pending')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  submissionFilter === 'pending'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pending Evaluation
              </button>
              <button
                onClick={() => setSubmissionFilter('published')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  submissionFilter === 'published'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Graded & Published
              </button>
              <button
                onClick={() => setSubmissionFilter('all')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  submissionFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Attempts ({submissions.length})
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidate name or roll..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Submissions Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                  <tr>
                    <th className="py-3 px-4">Candidate Roll No</th>
                    <th className="py-3 px-4">Candidate Name</th>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Section A (MCQs)</th>
                    <th className="py-3 px-4">Uploaded Word File</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No submissions matching the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredSubmissions.map((sub) => {
                      const isPublished = sub.status === 'published';
                      return (
                        <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                            {sub.studentRollNo}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-900">
                            {sub.studentName}
                          </td>
                          <td className="py-3.5 px-4 text-slate-700">
                            {sub.subjectName}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold text-emerald-800">
                              {sub.sectionAMarksObtained} / 39
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            {sub.uploadedFile ? (
                              <a
                                href={`/${sub.uploadedFile.path}`}
                                download
                                className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-semibold max-w-[180px] truncate"
                                title="Download student answer sheet"
                              >
                                <Download className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">{sub.uploadedFile.originalName}</span>
                              </a>
                            ) : (
                              <span className="text-slate-400 italic">Built-in Editor</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            {isPublished ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3" />
                                {sub.totalMarksObtained}/75 ({sub.grade})
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                <Clock className="w-3 h-3" />
                                Needs Grading
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenGrading(sub)}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                                  isPublished
                                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                                }`}
                              >
                                {isPublished ? 'Re-Grade' : 'Check & Grade Paper'}
                              </button>
                              {isPublished && (
                                <button
                                  onClick={() => onViewSubmissionResult(sub)}
                                  className="p-1.5 text-slate-500 hover:text-slate-900 rounded cursor-pointer"
                                  title="View official marksheet"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: QUESTION BANK MANAGEMENT */}
      {/* ======================================================== */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-slate-700">Subject:</label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-semibold bg-white"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCSVModal(true)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Bulk CSV Import</span>
              </button>

              <button
                onClick={() => setShowAddQuestionModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Question</span>
              </button>
            </div>
          </div>

          {/* Questions Tabs Filter */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setQuestionTypeFilter('all')}
              className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer ${
                questionTypeFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              All Types ({bankMCQs.length + bankShort.length + bankLong.length})
            </button>
            <button
              onClick={() => setQuestionTypeFilter('mcq')}
              className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer ${
                questionTypeFilter === 'mcq' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              MCQs (39 Marks) ({bankMCQs.length})
            </button>
            <button
              onClick={() => setQuestionTypeFilter('short')}
              className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer ${
                questionTypeFilter === 'short' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Short Questions (28 Marks) ({bankShort.length})
            </button>
            <button
              onClick={() => setQuestionTypeFilter('long')}
              className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer ${
                questionTypeFilter === 'long' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Long Questions (8 Marks) ({bankLong.length})
            </button>
          </div>

          {/* List of Questions */}
          <div className="space-y-3">
            {/* MCQs */}
            {(questionTypeFilter === 'all' || questionTypeFilter === 'mcq') &&
              bankMCQs.map((q, idx) => (
                <div key={q.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">MCQ #{idx + 1}</span>
                      <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-200">
                        1 Mark
                      </span>
                      <span className="text-slate-400">· Correct: Option {q.correctAnswer}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteQuestion(q.id, 'mcq')}
                      className="text-slate-400 hover:text-red-600 p-1 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{q.questionText}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <span className={q.correctAnswer === 'A' ? 'font-bold text-emerald-700' : 'text-slate-600'}>
                      A: {q.options.A}
                    </span>
                    <span className={q.correctAnswer === 'B' ? 'font-bold text-emerald-700' : 'text-slate-600'}>
                      B: {q.options.B}
                    </span>
                    <span className={q.correctAnswer === 'C' ? 'font-bold text-emerald-700' : 'text-slate-600'}>
                      C: {q.options.C}
                    </span>
                    <span className={q.correctAnswer === 'D' ? 'font-bold text-emerald-700' : 'text-slate-600'}>
                      D: {q.options.D}
                    </span>
                  </div>
                </div>
              ))}

            {/* Short Questions */}
            {(questionTypeFilter === 'all' || questionTypeFilter === 'short') &&
              bankShort.map((q, idx) => (
                <div key={q.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">Short Question #{idx + 1}</span>
                      <span className="font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-blue-200">
                        4 Marks
                      </span>
                      <span className="text-slate-400">· Guideline: {q.wordGuideline}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteQuestion(q.id, 'short')}
                      className="text-slate-400 hover:text-red-600 p-1 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{q.questionText}</p>
                  {q.answerKeyHint && (
                    <p className="text-xs text-slate-500 italic">Marking Key: {q.answerKeyHint}</p>
                  )}
                </div>
              ))}

            {/* Long Questions */}
            {(questionTypeFilter === 'all' || questionTypeFilter === 'long') &&
              bankLong.map((q, idx) => (
                <div key={q.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">Long Question #{idx + 1}</span>
                      <span className="font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-purple-200">
                        8 Marks
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteQuestion(q.id, 'long')}
                      className="text-slate-400 hover:text-red-600 p-1 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{q.questionText}</p>
                  {q.subQuestions && q.subQuestions.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-slate-500 pl-1">
                      {q.subQuestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: EXAM SCHEDULING & CREATION */}
      {/* ======================================================== */}
      {activeTab === 'exams' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 font-display">
              Configured DIT Examinations (75 Marks)
            </h2>
            <button
              onClick={() => setShowAddExamModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create / Schedule Exam</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exams.map((exam) => (
              <div key={exam.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {exam.examCode}
                    </span>
                    <span className="text-slate-500">{exam.durationMinutes} Minutes</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1">{exam.title}</h3>
                  <p className="text-xs text-slate-500 mb-3">{exam.subjectName}</p>

                  <div className="p-3 bg-slate-50 rounded-lg space-y-1 text-xs text-slate-600 mb-4 border border-slate-100">
                    <div className="flex justify-between">
                      <span>Section A (MCQs):</span>
                      <strong className="font-mono">39 Marks ({exam.mcqIds.length} Qs)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Section B (Short Qs):</span>
                      <strong className="font-mono">28 Marks ({exam.shortQuestionIds.length} Qs)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Section C (Long Q):</span>
                      <strong className="font-mono">8 Marks (1 Q)</strong>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-slate-900">
                      <span>Total Marks:</span>
                      <span className="font-mono">75 Marks</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <a
                    href={api.getWordTemplateUrl(exam.id)}
                    download
                    className="flex-1 py-1.5 text-center text-xs font-semibold rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Template (.docx)
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: STUDENT & PERFORMANCE REPORTS */}
      {/* ======================================================== */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Subject Performance Grid */}
          {statistics?.subjectPerformance && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wide">
                Subject-wise Performance & Pass Percentage
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {statistics.subjectPerformance.map((sp) => (
                  <div key={sp.subjectName} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-bold text-slate-800 line-clamp-1 block mb-2">
                      {sp.subjectName}
                    </span>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-slate-500">
                        <span>Attempts:</span>
                        <strong className="font-mono text-slate-900">{sp.attempts}</strong>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Avg Score:</span>
                        <strong className="font-mono text-slate-900">{sp.avgScore} / 75</strong>
                      </div>
                      <div className="flex justify-between text-emerald-700 font-semibold pt-1 border-t border-slate-100">
                        <span>Pass Rate:</span>
                        <strong className="font-mono">{sp.passRate}%</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Export Action Card */}
          <div className="p-6 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Download Full Gazette & Results CSV
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Contains candidate names, roll numbers, individual section scores (A, B, C), final total / 75, grades, and evaluator remarks.
              </p>
            </div>
            <a
              href={api.getExportCSVUrl()}
              className="px-4 py-2.5 rounded-lg bg-[#0A192F] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV File</span>
            </a>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* INTERACTIVE EXAMINER GRADING DRAWER / MODAL */}
      {/* ======================================================== */}
      {gradingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#0A192F] text-white p-5 flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                  <span>Paper Checking Portal</span>
                  <span>·</span>
                  <span className="font-mono">{gradingSubmission.studentRollNo}</span>
                </div>
                <h2 className="text-lg font-bold font-display text-white">
                  {gradingSubmission.studentName} — {gradingSubmission.subjectName}
                </h2>
              </div>
              <button
                onClick={() => setGradingSubmission(null)}
                className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Strip */}
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs shrink-0">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-slate-500 block">Section A (MCQs):</span>
                  <strong className="text-slate-900 font-mono text-sm">
                    {gradingSubmission.sectionAMarksObtained} / 39
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Section B (Short Qs):</span>
                  <strong className="text-blue-700 font-mono text-sm">
                    {liveShortSum} / 28
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Section C (Long Q):</span>
                  <strong className="text-purple-700 font-mono text-sm">
                    {liveLongSum} / 8
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Grand Total:</span>
                  <strong className="text-emerald-800 font-mono text-base font-extrabold">
                    {liveGrandTotal} / 75 ({Math.round((liveGrandTotal / 75) * 100)}%)
                  </strong>
                </div>
              </div>

              {/* Uploaded Document Link */}
              {gradingSubmission.uploadedFile ? (
                <a
                  href={`/${gradingSubmission.uploadedFile.path}`}
                  download
                  className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Student's Word Answer Sheet (.docx)</span>
                </a>
              ) : (
                <span className="text-slate-500 bg-slate-200 px-2 py-1 rounded">
                  Typed Answers in Portal
                </span>
              )}
            </div>

            {/* Scrollable Questions & Scoring Inputs */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Section B: 7 Short Questions (4 Marks each = 28 Marks) */}
              <div className="space-y-4">
                <div className="pb-2 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wide">
                    Section B: Short Questions (7 x 4 Marks = 28 Marks)
                  </h3>
                  <span className="font-mono font-bold text-blue-700">
                    Total: {liveShortSum} / 28 Marks
                  </span>
                </div>

                {gradingShortQs.map((sq, idx) => {
                  const currentVal = shortGrades[sq.id]?.marks ?? 0;
                  const currentRemarks = shortGrades[sq.id]?.remarks ?? '';

                  return (
                    <div key={sq.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="font-bold text-slate-900">Short Question {idx + 1}</span>
                          <p className="text-slate-800 font-medium text-xs mt-0.5">{sq.questionText}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <label className="text-slate-500 font-semibold">Award Marks (Max 4):</label>
                          <input
                            type="number"
                            min={0}
                            max={4}
                            value={currentVal}
                            onChange={(e) =>
                              setShortGrades({
                                ...shortGrades,
                                [sq.id]: {
                                  marks: Math.min(4, Math.max(0, Number(e.target.value) || 0)),
                                  remarks: currentRemarks
                                }
                              })
                            }
                            className="w-16 p-1.5 border border-slate-300 rounded font-mono font-bold text-center text-sm text-blue-800"
                          />
                        </div>
                      </div>

                      {/* Display candidate's rich-text typed response if available */}
                      {gradingSubmission.richTextAnswers?.sectionB?.[sq.id] && (
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700">
                          <span className="text-[11px] font-bold text-slate-500 block mb-1">
                            Candidate's Typed Text:
                          </span>
                          <p className="leading-relaxed whitespace-pre-wrap">
                            {gradingSubmission.richTextAnswers.sectionB[sq.id]}
                          </p>
                        </div>
                      )}

                      <div>
                        <input
                          type="text"
                          value={currentRemarks}
                          onChange={(e) =>
                            setShortGrades({
                              ...shortGrades,
                              [sq.id]: { marks: currentVal, remarks: e.target.value }
                            })
                          }
                          placeholder="Teacher remarks / feedback for Question..."
                          className="w-full p-2 border border-slate-200 rounded text-xs text-slate-600 focus:outline-hidden"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Section C: Long Question (8 Marks) */}
              {gradingLongQ && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="pb-2 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wide">
                      Section C: Long Question (1 x 8 Marks = 8 Marks)
                    </h3>
                    <span className="font-mono font-bold text-purple-700">
                      Total: {liveLongSum} / 8 Marks
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-bold text-slate-900">Question 8 (Long Question)</span>
                        <p className="text-slate-800 font-medium text-xs mt-0.5">{gradingLongQ.questionText}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <label className="text-slate-500 font-semibold">Award Marks (Max 8):</label>
                        <input
                          type="number"
                          min={0}
                          max={8}
                          value={longGrade.marks}
                          onChange={(e) =>
                            setLongGrade({
                              ...longGrade,
                              marks: Math.min(8, Math.max(0, Number(e.target.value) || 0))
                            })
                          }
                          className="w-16 p-1.5 border border-slate-300 rounded font-mono font-bold text-center text-sm text-purple-800"
                        />
                      </div>
                    </div>

                    {gradingSubmission.richTextAnswers?.sectionC && (
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700">
                        <span className="text-[11px] font-bold text-slate-500 block mb-1">
                          Candidate's Typed Long Answer:
                        </span>
                        <p className="leading-relaxed whitespace-pre-wrap">
                          {gradingSubmission.richTextAnswers.sectionC}
                        </p>
                      </div>
                    )}

                    <div>
                      <input
                        type="text"
                        value={longGrade.remarks}
                        onChange={(e) => setLongGrade({ ...longGrade, remarks: e.target.value })}
                        placeholder="Examiner remarks for Section C..."
                        className="w-full p-2 border border-slate-200 rounded text-xs text-slate-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Examiner General Feedback */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-800 uppercase">
                  Examiner General Remarks & Performance Assessment:
                </label>
                <textarea
                  rows={3}
                  value={teacherGeneralFeedback}
                  onChange={(e) => setTeacherGeneralFeedback(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg text-xs leading-relaxed"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => setGradingSubmission(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100"
              >
                Cancel
              </button>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-600">
                  Result Status:{' '}
                  <strong className={liveGrandTotal >= 30 ? 'text-emerald-700' : 'text-red-700'}>
                    {liveGrandTotal >= 30 ? 'PASSED (>= 30/75)' : 'FAILED (< 30/75)'}
                  </strong>
                </span>

                <button
                  type="button"
                  onClick={handleSaveGrading}
                  disabled={isSavingGrade}
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSavingGrade ? 'Publishing...' : 'Save & Publish Final Result'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ADD QUESTION MODAL */}
      {/* ======================================================== */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Add Question to Bank — {subjects.find(s => s.id === selectedSubjectId)?.name}
            </h3>

            <form onSubmit={handleCreateQuestion} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Question Type</label>
                <div className="flex rounded-lg bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setNewQuestionType('mcq')}
                    className={`flex-1 py-1 rounded-md font-semibold ${
                      newQuestionType === 'mcq' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    MCQ (1 Mark)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewQuestionType('short')}
                    className={`flex-1 py-1 rounded-md font-semibold ${
                      newQuestionType === 'short' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Short (4 Marks)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewQuestionType('long')}
                    className={`flex-1 py-1 rounded-md font-semibold ${
                      newQuestionType === 'long' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Long (8 Marks)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Question Statement *</label>
                <textarea
                  rows={3}
                  required
                  value={newQText}
                  onChange={(e) => setNewQText(e.target.value)}
                  placeholder="Enter the complete question text..."
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              {newQuestionType === 'mcq' && (
                <div className="space-y-2">
                  <label className="block font-medium text-slate-700">Four Options (A, B, C, D) *</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Option A"
                      value={newOptA}
                      onChange={(e) => setNewOptA(e.target.value)}
                      className="p-1.5 border border-slate-300 rounded"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Option B"
                      value={newOptB}
                      onChange={(e) => setNewOptB(e.target.value)}
                      className="p-1.5 border border-slate-300 rounded"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Option C"
                      value={newOptC}
                      onChange={(e) => setNewOptC(e.target.value)}
                      className="p-1.5 border border-slate-300 rounded"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Option D"
                      value={newOptD}
                      onChange={(e) => setNewOptD(e.target.value)}
                      className="p-1.5 border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Correct Option *</label>
                    <select
                      value={newCorrect}
                      onChange={(e) => setNewCorrect(e.target.value as any)}
                      className="p-1.5 border border-slate-300 rounded w-full font-semibold"
                    >
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                  </div>
                </div>
              )}

              {newQuestionType === 'short' && (
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Word Guideline</label>
                  <input
                    type="text"
                    value={newGuideline}
                    onChange={(e) => setNewGuideline(e.target.value)}
                    placeholder="80-120 words"
                    className="w-full p-1.5 border border-slate-300 rounded"
                  />
                </div>
              )}

              {newQuestionType === 'long' && (
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Sub-Questions / Marking Rubric</label>
                  <textarea
                    rows={2}
                    value={newSubQuestions}
                    onChange={(e) => setNewSubQuestions(e.target.value)}
                    placeholder="Part (a): 4 Marks&#10;Part (b): 4 Marks"
                    className="w-full p-1.5 border border-slate-300 rounded"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  Add Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* BULK CSV IMPORT MODAL */}
      {/* ======================================================== */}
      {showCSVModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Bulk Import Questions (CSV / Excel format)
            </h3>

            <p className="text-xs text-slate-500">
              Format: <code>QuestionText, OptionA, OptionB, OptionC, OptionD, CorrectAnswer(A/B/C/D)</code>
            </p>

            <form onSubmit={handleImportCSV} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Target Subject *</label>
                <select
                  value={csvSubjectId}
                  onChange={(e) => setCsvSubjectId(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">CSV Lines *</label>
                <textarea
                  rows={8}
                  required
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  placeholder="What is standard RAM speed?, 1333MHz, 3200MHz, 800MHz, 500MHz, B"
                  className="w-full p-2 border border-slate-300 rounded-lg font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCSVModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  Upload Questions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ADD EXAM MODAL */}
      {/* ======================================================== */}
      {showAddExamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Schedule New 75-Marks Examination
            </h3>

            <form onSubmit={handleCreateExam} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Exam Title *</label>
                <input
                  type="text"
                  required
                  value={newExamTitle}
                  onChange={(e) => setNewExamTitle(e.target.value)}
                  placeholder="e.g. DIT Mid-Term Examination 2024"
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Subject *</label>
                <select
                  value={newExamSubjectId}
                  onChange={(e) => setNewExamSubjectId(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={newExamDuration}
                    onChange={(e) => setNewExamDuration(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Passing Marks (out of 75)</label>
                  <input
                    type="number"
                    value={newExamPassing}
                    onChange={(e) => setNewExamPassing(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 space-y-1">
                <span>The system automatically pulls 39 MCQs, 7 Short Questions, and 1 Long Question from the selected subject bank to construct a standard 75-mark paper.</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddExamModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  Create Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
