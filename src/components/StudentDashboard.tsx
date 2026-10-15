import React from 'react';
import { User, Exam, ExamSubmission } from '../types';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Award,
  ArrowRight,
  Download,
  Calendar,
  Building,
  Hash,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface StudentDashboardProps {
  student: User;
  exams: Exam[];
  submissions: ExamSubmission[];
  onStartExam: (exam: Exam) => void;
  onViewResult: (submission: ExamSubmission) => void;
  onBrowseSyllabus: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  exams,
  submissions,
  onStartExam,
  onViewResult,
  onBrowseSyllabus
}) => {
  // Find submissions for this student
  const studentSubmissions = submissions.filter(s => s.studentId === student.id);

  // Group completed exam IDs to know which exams student already submitted
  const submittedExamIds = new Set(studentSubmissions.map(s => s.examId));

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0A192F] to-[#1E3A8A] rounded-2xl text-white p-6 sm:p-8 shadow-md relative overflow-hidden">
        {/* Subtle background crest */}
        <div className="absolute right-4 -bottom-10 opacity-10 pointer-events-none">
          <img
            src="/src/assets/images/superior_college_crest_1792082168452.jpg"
            alt=""
            className="w-72 h-72 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2 tracking-wide uppercase">
              <span>Department of Information Technology (DIT)</span>
              <span>·</span>
              <span>Annual Examinations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 font-display">
              Welcome, {student.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-amber-400" />
                <strong className="text-white font-mono">{student.rollNo}</strong>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>{student.collegeName || 'Superior College'}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Session: {student.session || '2023-2025'}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onBrowseSyllabus}
              className="px-4 py-2.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-2 cursor-pointer border border-white/20"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>Explore DIT Syllabus</span>
            </button>
          </div>
        </div>
      </div>

      {/* 75-Marks Examination Blueprint Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-display">
              DIT Examination Structure — Total 75 Marks
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Strict 3-Section Format mandated by Superior College Controller of Examinations
            </p>
          </div>
          <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            Passing Criteria: 30 / 75 Marks (40%)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold text-slate-700">Section A: MCQs</span>
              <span className="font-bold text-slate-900 font-mono">39 Marks</span>
            </div>
            <p className="text-xs text-slate-600">
              39 Multiple-choice questions (1 mark each). Solved and saved on laptop with immediate automated marking upon submission.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold text-slate-700">Section B: Short Questions</span>
              <span className="font-bold text-slate-900 font-mono">28 Marks</span>
            </div>
            <p className="text-xs text-slate-600">
              7 short questions (4 marks each). Type answers in Microsoft Word (.docx) template and upload, or use built-in editor.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold text-slate-700">Section C: Long Question</span>
              <span className="font-bold text-slate-900 font-mono">8 Marks</span>
            </div>
            <p className="text-xs text-slate-600">
              1 comprehensive scenario question (8 marks). Detailed analytical answer typed in Word and submitted with the sheet.
            </p>
          </div>
        </div>
      </div>

      {/* Available Examinations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Available DIT Examinations (5 Subjects)
          </h2>
          <span className="text-xs text-slate-500">
            {exams.length} examinations configured
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {exams.map((exam) => {
            const hasSubmitted = submittedExamIds.has(exam.id);
            const submission = studentSubmissions.find(s => s.examId === exam.id);

            return (
              <div
                key={exam.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {exam.examCode}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{exam.durationMinutes} mins</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1 line-clamp-1">
                    {exam.subjectName}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                    {exam.title}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-500 py-2 border-t border-slate-100">
                    <span>Paper Marks:</span>
                    <strong className="text-slate-900 font-mono">75 Marks</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 py-1">
                    <span>Passing Score:</span>
                    <strong className="text-slate-900 font-mono">{exam.passingMarks} Marks (40%)</strong>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  {hasSubmitted && submission ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Exam Status:</span>
                        <span
                          className={`font-semibold ${
                            submission.status === 'published'
                              ? 'text-emerald-700'
                              : 'text-amber-700'
                          }`}
                        >
                          {submission.status === 'published'
                            ? 'Graded & Published'
                            : 'Pending Examiner Marking'}
                        </span>
                      </div>
                      <button
                        onClick={() => onViewResult(submission)}
                        className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>View Result Card</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onStartExam(exam)}
                      className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Take Online Examination</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Attempt History */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-slate-900 font-display">
          My Exam Submission History & Results
        </h2>

        {studentSubmissions.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-slate-700">No Exams Taken Yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Select any of the available DIT subjects above to start your 75-mark online examination.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                  <tr>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Submitted Date</th>
                    <th className="py-3 px-4">Section A (MCQs)</th>
                    <th className="py-3 px-4">Word Answer Sheet</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Final Score (/75)</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentSubmissions.map((sub) => {
                    const isPublished = sub.status === 'published';
                    return (
                      <tr key={sub.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {sub.subjectName}
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          {new Date(sub.submittedAt).toLocaleDateString()} at{' '}
                          {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-slate-800">
                            {sub.sectionAMarksObtained} / 39
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {sub.uploadedFile ? (
                            <span className="text-emerald-700 flex items-center gap-1 font-medium truncate max-w-[150px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="truncate">{sub.uploadedFile.originalName}</span>
                            </span>
                          ) : (
                            <span className="text-slate-500">Built-in Editor</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {isPublished ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              <Clock className="w-3.5 h-3.5" />
                              Pending Marking
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {isPublished ? (
                            <span className="font-mono font-bold text-slate-900 text-sm">
                              {sub.totalMarksObtained} / 75 ({sub.percentage}%)
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono">
                              {sub.sectionAMarksObtained}+ Pending / 75
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => onViewResult(sub)}
                            className="px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
                          >
                            View Result
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
