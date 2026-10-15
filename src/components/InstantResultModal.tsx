import React, { useState } from 'react';
import { ExamSubmission } from '../types';
import {
  Award,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  Download,
  Check,
  X as XIcon,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface InstantResultModalProps {
  submission: ExamSubmission;
  onClose: () => void;
  onViewMarksheet?: () => void;
}

export const InstantResultModal: React.FC<InstantResultModalProps> = ({
  submission,
  onClose,
  onViewMarksheet
}) => {
  const [showMCQReview, setShowMCQReview] = useState(false);

  const mcqScore = submission.sectionAMarksObtained;
  const mcqPercentage = Math.round((mcqScore / 39) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#0A192F] text-white p-6 relative text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
            <Award className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-1">
            Exam Submission Successful
          </span>

          <h2 className="text-xl font-bold font-display text-white">
            {submission.subjectName}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300 mt-2">
            <span>Candidate: <strong>{submission.studentName}</strong></span>
            <span>·</span>
            <span className="font-mono">Roll: <strong>{submission.studentRollNo}</strong></span>
          </div>
        </div>

        {/* Instant Score Card */}
        <div className="p-6 space-y-6">
          {/* Section A MCQ Highlight Box */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 text-center">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              Section A: Multiple-Choice Questions (Instant Marking)
            </span>
            <div className="text-4xl font-extrabold text-emerald-950 font-mono tracking-tight my-1">
              {mcqScore} <span className="text-xl text-emerald-700 font-normal">/ 39 Marks</span>
            </div>
            <p className="text-xs font-medium text-emerald-700">
              MCQ Accuracy: {mcqPercentage}% · All 39 objective items marked via official answer key
            </p>
          </div>

          {/* 3-Section Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Section A */}
            <div className="p-3.5 rounded-lg border border-emerald-200 bg-white">
              <span className="text-slate-500 block mb-0.5">Section A (MCQs)</span>
              <div className="text-base font-bold text-emerald-700 font-mono">
                {mcqScore} / 39
              </div>
              <span className="text-[11px] text-emerald-600 font-medium">✓ Automated Score</span>
            </div>

            {/* Section B */}
            <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/30">
              <span className="text-slate-500 block mb-0.5">Section B (Short Qs)</span>
              <div className="text-base font-bold text-amber-700 font-mono">
                {submission.sectionBMarksObtained !== null ? `${submission.sectionBMarksObtained} / 28` : 'Pending / 28'}
              </div>
              <span className="text-[11px] text-amber-600 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Word Sheet Marking</span>
              </span>
            </div>

            {/* Section C */}
            <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/30">
              <span className="text-slate-500 block mb-0.5">Section C (Long Q)</span>
              <div className="text-base font-bold text-amber-700 font-mono">
                {submission.sectionCMarksObtained !== null ? `${submission.sectionCMarksObtained} / 8` : 'Pending / 8'}
              </div>
              <span className="text-[11px] text-amber-600 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Word Sheet Marking</span>
              </span>
            </div>
          </div>

          {/* Academic Grading Regulation Explanation */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block mb-0.5">
                  Provisional Submission Notice — Total Paper 75 Marks
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  Your Section A score of <strong>{mcqScore}/39</strong> has been securely logged into the examination registry.
                  In accordance with Superior College examination regulations, your submitted Microsoft Word answer sheet
                  (covering the remaining <strong>36 marks</strong>) is currently pending manual evaluation by the faculty examiner.
                  Once graded, your final marksheet out of 75 marks will be published automatically.
                </p>
              </div>
            </div>
          </div>

          {/* Uploaded Sheet Status */}
          {submission.uploadedFile && (
            <div className="flex items-center justify-between text-xs p-3 bg-white border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-800">Uploaded Answer File:</span>
                <span className="text-slate-600 font-mono">{submission.uploadedFile.originalName}</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                Received & Verified
              </span>
            </div>
          )}

          {/* Toggle MCQ Answer Key Review */}
          {submission.mcqDetail && Object.keys(submission.mcqDetail).length > 0 && (
            <div>
              <button
                type="button"
                onClick={() => setShowMCQReview(!showMCQReview)}
                className="w-full py-2.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Review Section A MCQ Breakdown & Answers</span>
                {showMCQReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showMCQReview && (
                <div className="mt-3 border border-slate-200 rounded-lg p-3 max-h-56 overflow-y-auto space-y-2 text-xs">
                  {Object.entries(submission.mcqDetail).map(([qId, detail], i) => (
                    <div
                      key={qId}
                      className={`p-2 rounded flex items-center justify-between ${
                        detail.isCorrect ? 'bg-emerald-50 text-emerald-950' : 'bg-red-50 text-red-950'
                      }`}
                    >
                      <span className="font-semibold">Question {i + 1}</span>
                      <div className="flex items-center gap-3">
                        <span>
                          Your choice: <strong>Option {detail.selected}</strong>
                        </span>
                        <span>
                          Correct: <strong>Option {detail.correct}</strong>
                        </span>
                        {detail.isCorrect ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                            <Check className="w-3.5 h-3.5" /> +1
                          </span>
                        ) : (
                          <span className="text-red-600 font-bold flex items-center gap-0.5">
                            <XIcon className="w-3.5 h-3.5" /> 0
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Back to Dashboard
          </button>

          {onViewMarksheet && (
            <button
              onClick={onViewMarksheet}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-[#0A192F] hover:bg-slate-800 text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Provisional Result Card</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
