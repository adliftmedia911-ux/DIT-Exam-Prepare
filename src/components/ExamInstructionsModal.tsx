import React, { useState } from 'react';
import { Exam, User } from '../types';
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckSquare,
  Square,
  ArrowRight,
  X,
  Download,
  Upload,
  Laptop
} from 'lucide-react';

interface ExamInstructionsModalProps {
  exam: Exam;
  student: User;
  onClose: () => void;
  onProceed: () => void;
}

export const ExamInstructionsModal: React.FC<ExamInstructionsModalProps> = ({
  exam,
  student,
  onClose,
  onProceed
}) => {
  const [agreedTimer, setAgreedTimer] = useState(false);
  const [agreedWordSheet, setAgreedWordSheet] = useState(false);
  const [agreedIntegrity, setAgreedIntegrity] = useState(false);

  const canStart = agreedTimer && agreedWordSheet && agreedIntegrity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#0A192F] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <span>Official Examination Instructions</span>
            <span>·</span>
            <span className="font-mono">{exam.examCode}</span>
          </div>

          <h2 className="text-xl font-bold font-display text-white">
            {exam.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Duration: <strong>{exam.durationMinutes} Minutes</strong></span>
            </span>
            <span>·</span>
            <span>Total Marks: <strong>75 Marks</strong></span>
            <span>·</span>
            <span>Candidate: <strong>{student.name} ({student.rollNo})</strong></span>
          </div>
        </div>

        {/* Blueprint Overview Strip */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 bg-slate-50 border-b border-slate-200 text-center py-3 text-xs">
          <div>
            <span className="text-slate-500 block">Section A: MCQs</span>
            <span className="font-bold text-slate-900 font-mono text-sm">39 Questions (39M)</span>
          </div>
          <div>
            <span className="text-slate-500 block">Section B: Short Questions</span>
            <span className="font-bold text-slate-900 font-mono text-sm">7 Questions (28M)</span>
          </div>
          <div>
            <span className="text-slate-500 block">Section C: Long Question</span>
            <span className="font-bold text-slate-900 font-mono text-sm">1 Question (8M)</span>
          </div>
        </div>

        {/* Content Rules */}
        <div className="p-6 space-y-5 text-xs text-slate-700 max-h-[60vh] overflow-y-auto">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Laptop className="w-4 h-4 text-emerald-600" />
              <span>1. Exam Hall Guidelines & Laptop Navigation</span>
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 pl-1">
              <li>Section A MCQs must be selected directly on screen. Selected options autosave automatically.</li>
              <li>You may jump between questions using the Question Palette on the right-hand side.</li>
              <li>You can change your selected answers at any point prior to final paper submission.</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-700" />
              <span>2. Microsoft Word (.docx) Answer Sheet Workflow</span>
            </h3>
            <p className="text-blue-800 leading-relaxed">
              For <strong>Section B (28 Marks)</strong> and <strong>Section C (8 Marks)</strong>:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-blue-900 pl-1">
              <li>Inside the exam, click <strong>"Download Official Word Answer Sheet (.docx)"</strong>.</li>
              <li>Open the file in Microsoft Word on your laptop, type your answers, and save the document.</li>
              <li>Upload your saved <strong>.docx</strong> or <strong>.pdf</strong> file in the portal before time expires.</li>
              <li><em>Alternative:</em> A built-in rich-text editor is also available directly inside the browser.</li>
            </ol>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>3. Timing & Instant Result System</span>
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 pl-1">
              <li>The countdown timer starts immediately upon clicking "Enter Examination Hall".</li>
              <li>When the timer expires, objective answers will be automatically submitted.</li>
              <li>
                <strong>Instant Scoring:</strong> Section A MCQs (39 Marks) will be calculated and displayed <strong>immediately</strong> upon submission.
              </li>
              <li>
                Section B and C written answers will be marked by the faculty examiner, after which your final result out of 75 marks will be published.
              </li>
            </ul>
          </div>

          {/* Acknowledgement Checkboxes */}
          <div className="pt-4 border-t border-slate-200 space-y-2.5">
            <label
              onClick={() => setAgreedTimer(!agreedTimer)}
              className="flex items-start gap-2.5 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={agreedTimer}
                onChange={() => {}}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-slate-800 font-medium">
                I understand that I have exactly {exam.durationMinutes} minutes, and the countdown timer will start immediately.
              </span>
            </label>

            <label
              onClick={() => setAgreedWordSheet(!agreedWordSheet)}
              className="flex items-start gap-2.5 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={agreedWordSheet}
                onChange={() => {}}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-slate-800 font-medium">
                I will prepare my Section B and C answers in Microsoft Word (.docx) or via the built-in editor and upload the completed file.
              </span>
            </label>

            <label
              onClick={() => setAgreedIntegrity(!agreedIntegrity)}
              className="flex items-start gap-2.5 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={agreedIntegrity}
                onChange={() => {}}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-slate-800 font-medium">
                I pledge academic integrity and verify that all submitted work is my own.
              </span>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Cancel & Return
          </button>

          <button
            onClick={onProceed}
            disabled={!canStart}
            className="px-5 py-2.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
          >
            <span>Enter Examination Hall</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
