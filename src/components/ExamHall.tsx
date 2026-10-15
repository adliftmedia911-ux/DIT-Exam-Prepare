import React, { useState, useEffect, useRef } from 'react';
import {
  Exam,
  MCQQuestion,
  ShortQuestion,
  LongQuestion,
  User,
  UploadedAnswerFile
} from '../types';
import { api } from '../services/api';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  Flag,
  RotateCcw,
  Send,
  HelpCircle,
  Layers,
  FileCheck,
  Printer,
  Edit3,
  AlertTriangle,
  X
} from 'lucide-react';

interface ExamHallProps {
  exam: Exam;
  mcqs: MCQQuestion[];
  shortQuestions: ShortQuestion[];
  longQuestion?: LongQuestion;
  student: User;
  onSubmitExam: (submissionData: {
    examId: string;
    studentId: string;
    mcqAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>;
    uploadedFile?: UploadedAnswerFile | null;
    richTextAnswers?: { sectionB?: Record<string, string>; sectionC?: string };
    startedAt: string;
  }) => void;
  onExit: () => void;
}

export const ExamHall: React.FC<ExamHallProps> = ({
  exam,
  mcqs,
  shortQuestions,
  longQuestion,
  student,
  onSubmitExam,
  onExit
}) => {
  // Navigation & section tabs
  const [activeTab, setActiveTab] = useState<'sectionA' | 'sectionB' | 'sectionC' | 'upload'>('sectionA');
  const [currentMCQIndex, setCurrentMCQIndex] = useState(0);

  // Student Responses
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [uploadedFile, setUploadedFile] = useState<UploadedAnswerFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Built-in Rich-Text Editor fallback responses
  const [richTextSectionB, setRichTextSectionB] = useState<Record<string, string>>({});
  const [richTextSectionC, setRichTextSectionC] = useState<string>('');

  // Exam Timing
  const totalSeconds = (exam.durationMinutes || 90) * 60;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(totalSeconds);
  const [startedAt] = useState<string>(new Date().toISOString());

  // Submit Modal
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeWarningDismissed, setTimeWarningDismissed] = useState(false);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Timer Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format Time
  const formatTimer = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = secondsRemaining <= 300; // Under 5 mins
  const isTimeWarning = secondsRemaining <= 900 && secondsRemaining > 300; // Under 15 mins

  // Auto-submit when time expires
  const handleAutoSubmit = () => {
    alert('Time has expired! Submitting your examination answers automatically.');
    performFinalSubmission();
  };

  // MCQ Selection handler
  const handleSelectMCQ = (questionId: string, option: 'A' | 'B' | 'C' | 'D') => {
    setMcqAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleClearMCQ = (questionId: string) => {
    setMcqAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const toggleReviewMark = (questionId: string) => {
    setMarkedForReview((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  // Upload Word/PDF Sheet
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!['.docx', '.doc', '.pdf'].includes(ext)) {
      setUploadError('Invalid file type. Please upload a Microsoft Word (.docx, .doc) or PDF document.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setUploadError('File size exceeds the 25MB limit.');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      const uploaded = await api.uploadAnswerSheet(file);
      setUploadedFile(uploaded);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload answer sheet');
    } finally {
      setIsUploading(false);
    }
  };

  const performFinalSubmission = async () => {
    setIsSubmitting(true);
    try {
      await onSubmitExam({
        examId: exam.id,
        studentId: student.id,
        mcqAnswers,
        uploadedFile,
        richTextAnswers: {
          sectionB: richTextSectionB,
          sectionC: richTextSectionC
        },
        startedAt
      });
    } catch (err: any) {
      alert(`Submission failed: ${err.message}`);
      setIsSubmitting(false);
    }
  };

  // Print Question Paper
  const handlePrintQuestionPaper = () => {
    window.print();
  };

  const currentMCQ = mcqs[currentMCQIndex];
  const answeredCount = Object.keys(mcqAnswers).length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Sticky Top Exam Control Bar */}
      <header className="sticky top-0 z-30 bg-[#0A192F] text-white shadow-md border-b border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          {/* Left: Exam and Candidate details */}
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/images/superior_college_crest_1792082168452.jpg"
              alt="Superior College"
              className="w-9 h-9 object-contain rounded bg-white p-0.5 border border-slate-700"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
                  {exam.examCode}
                </span>
                <span className="text-slate-400 text-xs hidden sm:inline">|</span>
                <span className="text-xs text-slate-300 font-semibold hidden sm:inline">
                  {exam.subjectName}
                </span>
              </div>
              <h1 className="text-sm font-bold text-white tracking-tight line-clamp-1">
                {exam.title}
              </h1>
            </div>
          </div>

          {/* Center: Live Countdown Timer */}
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border font-mono text-sm font-bold tracking-wider transition-colors ${
                isTimeCritical
                  ? 'bg-red-950/90 text-red-400 border-red-700 animate-pulse'
                  : isTimeWarning
                  ? 'bg-amber-950/80 text-amber-300 border-amber-700'
                  : 'bg-slate-800 text-emerald-400 border-slate-700'
              }`}
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span>{formatTimer(secondsRemaining)}</span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Autosaving</span>
            </div>
          </div>

          {/* Right: Candidate identity & Submit CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right text-xs">
              <div className="font-semibold text-white">{student.name}</div>
              <div className="text-slate-400 font-mono">{student.rollNo}</div>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Review & Submit Paper</span>
            </button>
          </div>
        </div>

        {/* Section Tabs Bar */}
        <div className="bg-slate-900 border-t border-slate-800 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto text-xs py-1">
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('sectionA')}
                className={`py-2 px-3 font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'sectionA'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Section A: MCQs (39 Marks)
                <span className="ml-1.5 font-mono text-[11px] opacity-80">
                  [{answeredCount}/39]
                </span>
              </button>

              <button
                onClick={() => setActiveTab('sectionB')}
                className={`py-2 px-3 font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'sectionB'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Section B: Short Questions (28 Marks)
              </button>

              <button
                onClick={() => setActiveTab('sectionC')}
                className={`py-2 px-3 font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'sectionC'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Section C: Long Question (8 Marks)
              </button>

              <button
                onClick={() => setActiveTab('upload')}
                className={`py-2 px-3 font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'upload'
                    ? 'bg-emerald-600 text-white'
                    : uploadedFile
                    ? 'text-emerald-400 hover:bg-slate-800'
                    : 'text-amber-300 hover:bg-slate-800'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Word Answer Sheet Upload</span>
                {uploadedFile && <CheckCircle2 className="w-3 h-3 text-emerald-300" />}
              </button>
            </div>

            {/* Total Marks Banner */}
            <div className="hidden md:flex items-center gap-3 text-slate-400 text-xs shrink-0 font-medium">
              <span>Paper Total: <strong className="text-white font-mono">75 Marks</strong></span>
              <span>·</span>
              <span>Pass: <strong className="text-white font-mono">30 Marks (40%)</strong></span>
            </div>
          </div>
        </div>
      </header>

      {/* 5-minute warning banner if time is critical */}
      {isTimeCritical && !timeWarningDismissed && (
        <div className="bg-red-600 text-white px-4 py-2 text-xs flex items-center justify-between font-semibold sticky top-[88px] z-20 shadow-md">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            <span>URGENT: Less than 5 minutes remaining! Make sure to upload your Word answer sheet and submit your paper.</span>
          </div>
          <button
            onClick={() => setTimeWarningDismissed(true)}
            className="p-1 hover:bg-red-700 rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Examination Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {/* ======================================================== */}
        {/* SECTION A: MCQs (39 Questions — 39 Marks) */}
        {/* ======================================================== */}
        {activeTab === 'sectionA' && currentMCQ && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Left 3 Columns: Active MCQ Question Card */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                {/* Question Header & Meta */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      Question {currentMCQIndex + 1} of {mcqs.length}
                    </span>
                    <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                      1.0 Mark
                    </span>
                    {currentMCQ.difficulty && (
                      <span className="text-slate-500 capitalize">
                        · {currentMCQ.difficulty}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleReviewMark(currentMCQ.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      markedForReview[currentMCQ.id]
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{markedForReview[currentMCQ.id] ? 'Marked for Review' : 'Mark for Review'}</span>
                  </button>
                </div>

                {/* Question Statement */}
                <h2 className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed mb-6">
                  {currentMCQ.questionText}
                </h2>

                {/* 4 Options Radio List */}
                <div className="space-y-3">
                  {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                    const isSelected = mcqAnswers[currentMCQ.id] === optKey;
                    const optionText = currentMCQ.options[optKey];

                    return (
                      <div
                        key={optKey}
                        onClick={() => handleSelectMCQ(currentMCQ.id, optKey)}
                        className={`p-3.5 rounded-xl border flex items-center gap-3.5 cursor-pointer transition-all select-none ${
                          isSelected
                            ? 'bg-emerald-50/80 border-emerald-600 ring-1 ring-emerald-600 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-700 border border-slate-300'
                          }`}
                        >
                          {optKey}
                        </div>
                        <span className={`text-sm ${isSelected ? 'font-semibold text-emerald-950' : 'text-slate-800'}`}>
                          {optionText}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentMCQIndex((prev) => Math.max(0, prev - 1))}
                      disabled={currentMCQIndex === 0}
                      className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <button
                      onClick={() => setCurrentMCQIndex((prev) => Math.min(mcqs.length - 1, prev + 1))}
                      disabled={currentMCQIndex === mcqs.length - 1}
                      className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {mcqAnswers[currentMCQ.id] && (
                    <button
                      onClick={() => handleClearMCQ(currentMCQ.id)}
                      className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear Choice</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Tips */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500 flex items-center justify-between">
                <span>All 39 MCQs carry 1 mark each. Answers are automatically saved on selection.</span>
                <button
                  onClick={() => setActiveTab('sectionB')}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
                >
                  Proceed to Section B →
                </button>
              </div>
            </div>

            {/* Right Column: Question Palette Drawer */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Question Palette (39)
                </h3>
                <span className="text-xs font-mono font-bold text-slate-700">
                  {answeredCount} / 39 Answered
                </span>
              </div>

              {/* 39 Badges Grid */}
              <div className="grid grid-cols-6 gap-2">
                {mcqs.map((q, idx) => {
                  const isCurrent = idx === currentMCQIndex;
                  const isAnswered = Boolean(mcqAnswers[q.id]);
                  const isReview = Boolean(markedForReview[q.id]);

                  let badgeColor = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
                  if (isReview && isAnswered) {
                    badgeColor = 'bg-purple-100 text-purple-900 border-purple-400 font-bold';
                  } else if (isReview) {
                    badgeColor = 'bg-amber-100 text-amber-900 border-amber-400 font-bold';
                  } else if (isAnswered) {
                    badgeColor = 'bg-emerald-600 text-white border-emerald-700 font-bold shadow-xs';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentMCQIndex(idx)}
                      className={`h-9 w-full rounded-md text-xs font-mono flex items-center justify-center border transition-all cursor-pointer relative ${badgeColor} ${
                        isCurrent ? 'ring-2 ring-slate-900 ring-offset-1 font-extrabold' : ''
                      }`}
                      title={`Question ${idx + 1}`}
                    >
                      {idx + 1}
                      {isReview && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-emerald-600" />
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300" />
                  <span>Unanswered ({mcqs.length - answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-amber-100 border border-amber-400" />
                  <span>Marked for Review ({Object.values(markedForReview).filter(Boolean).length})</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION B: Short Questions (7 Questions — 28 Marks) */}
        {/* ======================================================== */}
        {activeTab === 'sectionB' && (
          <div className="space-y-6">
            {/* Section Banner with Word Template Download Action */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    SECTION B
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    Short Questions — Total 28 Marks (7 x 4 Marks)
                  </h2>
                </div>
                <p className="text-xs text-slate-600">
                  Answer all 7 short questions. Type your answers in Microsoft Word or write them in the built-in answer boxes below.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <a
                  href={api.getWordTemplateUrl(exam.id, student.id)}
                  download
                  className="px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Word Answer Sheet (.docx)</span>
                </a>

                <button
                  onClick={handlePrintQuestionPaper}
                  className="px-3.5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Print Paper</span>
                </button>
              </div>
            </div>

            {/* List of 7 Short Questions */}
            <div className="space-y-5">
              {shortQuestions.map((sq, index) => (
                <div
                  key={sq.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm font-display">
                        Question {index + 1}
                      </span>
                      <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        4.0 Marks
                      </span>
                    </div>
                    {sq.wordGuideline && (
                      <span className="text-xs text-slate-500 italic">
                        Guideline: {sq.wordGuideline}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                    {sq.questionText}
                  </p>

                  {/* Built-in Rich-Text / Text Editor space for Question */}
                  <div className="pt-2">
                    <label className="block text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
                      <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Type Answer in Portal (Optional if uploading Word document):</span>
                    </label>
                    <textarea
                      rows={4}
                      value={richTextSectionB[sq.id] || ''}
                      onChange={(e) =>
                        setRichTextSectionB({ ...richTextSectionB, [sq.id]: e.target.value })
                      }
                      placeholder={`Type your Answer for Question ${index + 1} here, or complete it in the downloaded Microsoft Word .docx template...`}
                      className="w-full p-3 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveTab('sectionA')}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                ← Back to Section A (MCQs)
              </button>
              <button
                onClick={() => setActiveTab('sectionC')}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
              >
                Proceed to Section C (Long Question) →
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION C: Long Question (1 Question — 8 Marks) */}
        {/* ======================================================== */}
        {activeTab === 'sectionC' && longQuestion && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    SECTION C
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    Long Question — Total 8 Marks
                  </h2>
                </div>
                <p className="text-xs text-slate-600">
                  Comprehensive analytical question. Provide thorough explanations, points, and code/diagram descriptions.
                </p>
              </div>

              <a
                href={api.getWordTemplateUrl(exam.id, student.id)}
                download
                className="px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs shrink-0 self-start md:self-auto"
              >
                <Download className="w-4 h-4" />
                <span>Download Word Template</span>
              </a>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-900 font-display">
                  Question 8 [Maximum Marks: 8]
                </span>
                {longQuestion.wordGuideline && (
                  <span className="text-xs text-slate-500 italic">
                    Guideline: {longQuestion.wordGuideline}
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {longQuestion.questionText}
              </p>

              {longQuestion.subQuestions && longQuestion.subQuestions.length > 0 && (
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">Sub-Question Marks Breakdown:</span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 pl-1">
                    {longQuestion.subQuestions.map((sub, i) => (
                      <li key={i}>{sub}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Built-in Editor for Long Question */}
              <div className="pt-2">
                <label className="block text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
                  <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Type Long Answer in Portal (Optional if uploading Word document):</span>
                </label>
                <textarea
                  rows={10}
                  value={richTextSectionC}
                  onChange={(e) => setRichTextSectionC(e.target.value)}
                  placeholder="Type your comprehensive Section C answer here, or complete it in the downloaded Microsoft Word .docx template..."
                  className="w-full p-3.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-sans leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveTab('sectionB')}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                ← Back to Section B
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              >
                Proceed to Answer Sheet Upload →
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* WORD ANSWER SHEET UPLOAD & VALIDATION */}
        {/* ======================================================== */}
        {activeTab === 'upload' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  FINAL STEP
                </span>
                <h2 className="text-lg font-bold text-slate-900 font-display mt-1">
                  Upload Microsoft Word (.docx) Answer Sheet
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Attach your completed Word document containing Section B (Short Questions) and Section C (Long Question) answers.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  uploadedFile
                    ? 'border-emerald-500 bg-emerald-50/40'
                    : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".docx,.doc,.pdf"
                  className="hidden"
                />

                {isUploading ? (
                  <div className="space-y-2 py-4">
                    <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs font-semibold text-slate-700">Uploading and validating answer sheet...</p>
                  </div>
                ) : uploadedFile ? (
                  <div className="space-y-3 py-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {uploadedFile.originalName}
                      </h4>
                      <p className="text-xs text-emerald-700 font-medium mt-0.5">
                        Answer sheet successfully uploaded ({(uploadedFile.size / 1024).toFixed(1)} KB)
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Uploaded at {new Date(uploadedFile.uploadedAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer shadow-xs"
                    >
                      Replace with Another File
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 py-4">
                    <Upload className="w-10 h-10 text-slate-400 mx-auto" />
                    <p className="text-sm font-semibold text-slate-800">
                      Click to Browse or Drag & Drop your Answer Sheet
                    </p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Supports Microsoft Word (<strong>.docx</strong>, .doc) or PDF. Max file size: 25MB.
                    </p>
                  </div>
                )}
              </div>

              {uploadError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Template download helper box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-semibold text-slate-800 block">Haven't downloaded the template yet?</span>
                  <span className="text-slate-500">Download the official Word template with pre-formatted questions and student details.</span>
                </div>
                <a
                  href={api.getWordTemplateUrl(exam.id, student.id)}
                  download
                  className="px-3.5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Get .docx Template</span>
                </a>
              </div>
            </div>

            {/* Ready to Submit Banner */}
            <div className="bg-[#0A192F] text-white rounded-xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold font-display">Ready for Final Submission?</h3>
                <p className="text-xs text-slate-300 mt-1">
                  MCQs: {answeredCount}/39 answered · Word Answer Sheet: {uploadedFile ? 'Attached' : 'Built-in Typed Responses'}
                </p>
              </div>

              <button
                onClick={() => setShowSubmitModal(true)}
                className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs shrink-0 self-start sm:self-auto"
              >
                <Send className="w-4 h-4" />
                <span>Confirm & Submit Paper</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* FINAL SUBMIT CONFIRMATION MODAL */}
      {/* ======================================================== */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Confirm Final Examination Submission
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Superior College DIT Official Examination — 75 Marks
                </p>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Audit Summary Box */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Section A (MCQs 39 Marks):</span>
                <span className="font-bold text-slate-900 font-mono">
                  {answeredCount} / 39 Answered
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">Section B & C (Word Answer Sheet):</span>
                <span className="font-bold">
                  {uploadedFile ? (
                    <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Attached (.docx)
                    </span>
                  ) : (
                    <span className="text-amber-700 font-medium">
                      Using Built-in Typed Answers
                    </span>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">Time Remaining:</span>
                <span className="font-mono text-slate-900 font-semibold">
                  {formatTimer(secondsRemaining)}
                </span>
              </div>
            </div>

            {/* Warning if unanswered MCQs */}
            {answeredCount < mcqs.length && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  You have left <strong>{mcqs.length - answeredCount} MCQs unanswered</strong>. Once submitted, questions cannot be changed.
                </span>
              </div>
            )}

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
              <p className="leading-relaxed">
                <strong>Instant Result Workflow:</strong> Section A MCQs (39 Marks) will be calculated immediately upon clicking Submit.
                Section B (28 Marks) and Section C (8 Marks) will be marked by the faculty examiner.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Back to Review
              </button>

              <button
                type="button"
                onClick={performFinalSubmission}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting & Scoring...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Exam Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
