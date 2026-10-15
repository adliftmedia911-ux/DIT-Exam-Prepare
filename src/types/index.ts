export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rollNo?: string;
  collegeName?: string;
  session?: string;
  phone?: string;
  createdAt: string;
}

export interface SyllabusTopic {
  id: string;
  title: string;
  learningOutcomes?: string;
}

export interface SyllabusChapter {
  id: string;
  title: string;
  topics: SyllabusTopic[];
}

export interface SyllabusModule {
  id: string;
  title: string;
  code: string;
  description: string;
  chapters: SyllabusChapter[];
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  description: string;
  totalModules: number;
  modules: SyllabusModule[];
}

export interface MCQQuestion {
  id: string;
  subjectId: string;
  moduleId: string;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  marks: number; // 1
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface ShortQuestion {
  id: string;
  subjectId: string;
  moduleId: string;
  questionNumber: number;
  questionText: string;
  marks: number; // 4
  wordGuideline?: string;
  answerKeyHint?: string;
}

export interface LongQuestion {
  id: string;
  subjectId: string;
  moduleId: string;
  questionText: string;
  marks: number; // 8
  subQuestions?: string[];
  wordGuideline?: string;
  answerKeyHint?: string;
}

export interface Exam {
  id: string;
  title: string;
  examCode: string;
  subjectId: string;
  subjectName: string;
  durationMinutes: number; // e.g. 90
  totalMarks: number; // 75
  passingMarks: number; // e.g. 30
  sectionAMarks: number; // 39
  sectionBMarks: number; // 28
  sectionCMarks: number; // 8
  startDate: string;
  endDate: string;
  isActive: boolean;
  instructions: string[];
  mcqIds: string[];
  shortQuestionIds: string[];
  longQuestionId: string;
}

export interface UploadedAnswerFile {
  filename: string;
  originalName: string;
  path: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}

export interface ShortQuestionGrade {
  questionId: string;
  marksObtained: number; // 0 to 4
  maxMarks: number; // 4
  teacherRemarks?: string;
}

export interface LongQuestionGrade {
  questionId: string;
  marksObtained: number; // 0 to 8
  maxMarks: number; // 8
  teacherRemarks?: string;
}

export type SubmissionStatus = 'in_progress' | 'pending_marking' | 'published';

export interface ExamSubmission {
  id: string;
  examId: string;
  examTitle: string;
  subjectId: string;
  subjectName: string;
  studentId: string;
  studentName: string;
  studentRollNo: string;
  studentCollege: string;
  studentSession: string;
  startedAt: string;
  submittedAt: string;
  status: SubmissionStatus;
  
  // Section A: MCQs
  mcqAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  mcqScore: number; // out of 39
  mcqTotalMarks: number; // 39
  mcqDetail?: Record<string, { isCorrect: boolean; selected: string; correct: string }>;
  
  // Section B & C responses
  uploadedFile?: UploadedAnswerFile | null;
  richTextAnswers?: {
    sectionB?: Record<string, string>; // questionId -> answer text
    sectionC?: string;
  };
  
  // Grading
  sectionAMarksObtained: number;
  sectionBMarksObtained: number | null; // out of 28
  sectionCMarksObtained: number | null; // out of 8
  shortQuestionGrades?: ShortQuestionGrade[];
  longQuestionGrade?: LongQuestionGrade;
  
  totalMarksObtained: number | null; // out of 75
  maxTotalMarks: number; // 75
  percentage: number | null;
  grade: string | null; // 'A+' | 'A' | 'B' | 'C' | 'D' | 'F'
  isPassed: boolean | null;
  
  teacherFeedbackGeneral?: string;
  gradedBy?: string;
  gradedAt?: string;
}

export interface ExamStatistics {
  totalStudents: number;
  totalExams: number;
  totalAttempts: number;
  pendingMarkingCount: number;
  publishedCount: number;
  overallPassRate: number;
  subjectPerformance: {
    subjectName: string;
    attempts: number;
    avgScore: number;
    passRate: number;
  }[];
}
