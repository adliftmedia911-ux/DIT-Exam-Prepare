import React from 'react';
import { ExamSubmission } from '../types';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Printer,
  ArrowLeft,
  Calendar,
  Building,
  Hash,
  Download,
  FileCheck,
  UserCheck
} from 'lucide-react';

interface OfficialResultCardProps {
  submission: ExamSubmission;
  onBack: () => void;
}

export const OfficialResultCard: React.FC<OfficialResultCardProps> = ({
  submission,
  onBack
}) => {
  const isPublished = submission.status === 'published';
  const totalObtained = submission.totalMarksObtained ?? submission.sectionAMarksObtained;
  const percentage = submission.percentage ?? Math.round((totalObtained / 75) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Action Bar (hidden when printing) */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={onBack}
          className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-lg bg-[#0A192F] hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>Print Official Marksheet</span>
        </button>
      </div>

      {/* Official Marksheet Paper Container */}
      <div className="bg-white border-2 border-slate-300 rounded-2xl p-8 sm:p-10 shadow-lg relative print:shadow-none print:border print:p-6 print:rounded-none">
        {/* Subtle Watermark Crest */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <img
            src="/src/assets/images/superior_college_crest_1792082168452.jpg"
            alt=""
            className="w-96 h-96 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Official College Header */}
        <div className="text-center pb-6 border-b-2 border-slate-900 relative">
          <div className="flex items-center justify-center gap-4 mb-2">
            <img
              src="/src/assets/images/superior_college_crest_1792082168452.jpg"
              alt="Superior College Crest"
              className="w-16 h-16 object-contain rounded-md"
              referrerPolicy="no-referrer"
            />
            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] tracking-tight uppercase font-display">
                Superior College
              </h1>
              <p className="text-xs sm:text-sm font-bold text-emerald-700 tracking-wide uppercase">
                Department of Information Technology (DIT)
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Controller of Examinations · Annual Online Examination Board
              </p>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-slate-200">
            <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Official Transcript & Examination Marksheet
            </span>
          </div>
        </div>

        {/* Candidate Meta Details Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 text-xs border-b border-slate-200">
          <div>
            <span className="text-slate-500 block mb-0.5">Candidate Name:</span>
            <strong className="text-slate-900 text-sm font-display">{submission.studentName}</strong>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Roll Number:</span>
            <strong className="text-slate-900 text-sm font-mono text-emerald-800">{submission.studentRollNo}</strong>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Campus / Institution:</span>
            <span className="text-slate-800 font-medium">{submission.studentCollege || 'Superior College'}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Academic Session:</span>
            <span className="text-slate-800 font-medium">{submission.studentSession || '2023-2025'}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Subject:</span>
            <strong className="text-slate-900">{submission.subjectName}</strong>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Examination:</span>
            <span className="text-slate-800">{submission.examTitle}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Date of Examination:</span>
            <span className="text-slate-800">{new Date(submission.submittedAt).toLocaleDateString()}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Result Status:</span>
            <span className={`font-bold ${isPublished ? (submission.isPassed ? 'text-emerald-700' : 'text-red-700') : 'text-amber-700'}`}>
              {isPublished ? (submission.isPassed ? 'PASSED' : 'FAILED') : 'PENDING MARKING'}
            </span>
          </div>
        </div>

        {/* 75-Marks Examination Score Table */}
        <div className="py-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wide">
            Paper Assessment Breakdown (Total Marks: 75)
          </h3>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A192F] text-white">
                <tr>
                  <th className="py-3 px-4">Section</th>
                  <th className="py-3 px-4">Description & Mode</th>
                  <th className="py-3 px-4 text-center">Maximum Marks</th>
                  <th className="py-3 px-4 text-center">Passing Marks</th>
                  <th className="py-3 px-4 text-right">Marks Obtained</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {/* Section A */}
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    Section A
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    Multiple-Choice Questions (39 Items) · Automated Computer Evaluation
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-semibold">39</td>
                  <td className="py-3.5 px-4 text-center font-mono text-slate-500">16</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-800 text-sm">
                    {submission.sectionAMarksObtained}
                  </td>
                </tr>

                {/* Section B */}
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    Section B
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    Short Questions (7 Questions @ 4 Marks each) · Word Answer Sheet
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-semibold">28</td>
                  <td className="py-3.5 px-4 text-center font-mono text-slate-500">11</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 text-sm">
                    {submission.sectionBMarksObtained !== null ? (
                      submission.sectionBMarksObtained
                    ) : (
                      <span className="text-amber-600 font-normal italic">Pending Evaluation</span>
                    )}
                  </td>
                </tr>

                {/* Section C */}
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    Section C
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    Long Question (1 Question) · Word Answer Sheet
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-semibold">8</td>
                  <td className="py-3.5 px-4 text-center font-mono text-slate-500">3</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 text-sm">
                    {submission.sectionCMarksObtained !== null ? (
                      submission.sectionCMarksObtained
                    ) : (
                      <span className="text-amber-600 font-normal italic">Pending Evaluation</span>
                    )}
                  </td>
                </tr>

                {/* Grand Total Row */}
                <tr className="bg-slate-50 font-bold text-sm">
                  <td colSpan={2} className="py-4 px-4 text-slate-900 text-right uppercase">
                    Grand Total
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-slate-900">75</td>
                  <td className="py-4 px-4 text-center font-mono text-slate-500">30 (40%)</td>
                  <td className="py-4 px-4 text-right font-mono text-lg text-emerald-900">
                    {isPublished ? (
                      `${submission.totalMarksObtained} / 75`
                    ) : (
                      <span className="text-slate-600 font-normal text-xs">
                        {submission.sectionAMarksObtained}+ Pending / 75
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Result Metrics Strip (Percentage & Grade) */}
        {isPublished && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200 text-center my-6">
            <div>
              <span className="text-xs text-slate-500 block mb-0.5">Total Score</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono">
                {submission.totalMarksObtained} / 75
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block mb-0.5">Percentage</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono">
                {submission.percentage}%
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block mb-0.5">Awarded Grade</span>
              <span className="text-xl font-extrabold text-emerald-700 font-mono">
                {submission.grade || 'A'}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block mb-0.5">Final Status</span>
              <span className={`text-base font-extrabold uppercase ${submission.isPassed ? 'text-emerald-700' : 'text-red-700'}`}>
                {submission.isPassed ? 'Passed' : 'Failed'}
              </span>
            </div>
          </div>
        )}

        {/* Short & Long Questions Remarks (if graded) */}
        {isPublished && submission.shortQuestionGrades && submission.shortQuestionGrades.length > 0 && (
          <div className="py-4 space-y-2 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase">
              Faculty Examiner Detailed Marks & Remarks
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {submission.shortQuestionGrades.map((g, idx) => (
                <div key={g.questionId} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span>Short Question {idx + 1}</span>
                    <span className="font-mono text-emerald-800">{g.marksObtained} / 4</span>
                  </div>
                  {g.teacherRemarks && (
                    <p className="text-[11px] text-slate-500 mt-1 italic">Remarks: {g.teacherRemarks}</p>
                  )}
                </div>
              ))}
              {submission.longQuestionGrade && (
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 sm:col-span-2">
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span>Section C Long Question</span>
                    <span className="font-mono text-emerald-800">{submission.longQuestionGrade.marksObtained} / 8</span>
                  </div>
                  {submission.longQuestionGrade.teacherRemarks && (
                    <p className="text-[11px] text-slate-500 mt-1 italic">Remarks: {submission.longQuestionGrade.teacherRemarks}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Examiner General Feedback */}
        {submission.teacherFeedbackGeneral && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs my-4">
            <span className="font-bold text-slate-800 block mb-1">Examiner General Remarks:</span>
            <p className="text-slate-600 leading-relaxed italic">{submission.teacherFeedbackGeneral}</p>
          </div>
        )}

        {/* Official Signature Verification Block */}
        <div className="pt-10 border-t-2 border-slate-900 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-600">
          <div className="text-center sm:text-left">
            <p className="font-mono font-semibold text-slate-900">System Document ID: {submission.id}</p>
            <p className="text-[11px] text-slate-400">Authenticated by Superior College Digital Examination Engine</p>
          </div>

          <div className="text-center">
            <div className="w-36 border-b border-slate-400 mb-1 mx-auto" />
            <p className="font-bold text-slate-900">{submission.gradedBy || 'Faculty Examiner'}</p>
            <p className="text-[11px] text-slate-500">Evaluator / Department Examiner</p>
          </div>

          <div className="text-center sm:text-right">
            <div className="w-36 border-b border-slate-400 mb-1 mx-auto sm:ml-auto" />
            <p className="font-bold text-slate-900">Prof. Dr. Tariq Mahmood</p>
            <p className="text-[11px] text-slate-500">Controller of Examinations, Superior College</p>
          </div>
        </div>
      </div>
    </div>
  );
};
