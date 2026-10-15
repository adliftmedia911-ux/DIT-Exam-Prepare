import {
  User,
  Subject,
  Exam,
  MCQQuestion,
  ShortQuestion,
  LongQuestion,
  ExamSubmission,
  ExamStatistics,
  UploadedAnswerFile
} from '../types';

export const api = {
  // --- Auth ---
  async login(identifier: string, role: 'student' | 'admin', password?: string): Promise<{ success: boolean; user: User }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, role, password })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Login failed');
    }
    return res.json();
  },

  async register(data: {
    name: string;
    rollNo: string;
    email: string;
    collegeName?: string;
    session?: string;
    phone?: string;
  }): Promise<{ success: boolean; user: User }> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Registration failed');
    }
    return res.json();
  },

  // --- Subjects ---
  async getSubjects(): Promise<Subject[]> {
    const res = await fetch('/api/subjects');
    const data = await res.json();
    return data.subjects || [];
  },

  async getSubject(id: string): Promise<Subject> {
    const res = await fetch(`/api/subjects/${id}`);
    const data = await res.json();
    return data.subject;
  },

  async addModule(subjectId: string, moduleData: { title: string; code?: string; description?: string }): Promise<Subject> {
    const res = await fetch(`/api/subjects/${subjectId}/modules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(moduleData)
    });
    const data = await res.json();
    return data.subject;
  },

  async deleteModule(subjectId: string, moduleId: string): Promise<Subject> {
    const res = await fetch(`/api/subjects/${subjectId}/modules/${moduleId}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    return data.subject;
  },

  // --- Exams ---
  async getExams(): Promise<Exam[]> {
    const res = await fetch('/api/exams');
    const data = await res.json();
    return data.exams || [];
  },

  async getExam(id: string): Promise<{
    exam: Exam;
    mcqs: MCQQuestion[];
    shortQuestions: ShortQuestion[];
    longQuestion?: LongQuestion;
  }> {
    const res = await fetch(`/api/exams/${id}`);
    if (!res.ok) throw new Error('Exam not found');
    return res.json();
  },

  async createExam(payload: {
    title: string;
    subjectId: string;
    durationMinutes: number;
    passingMarks?: number;
  }): Promise<Exam> {
    const res = await fetch('/api/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create exam');
    }
    const data = await res.json();
    return data.exam;
  },

  getWordTemplateUrl(examId: string, studentId?: string): string {
    return `/api/exams/${examId}/word-template${studentId ? `?studentId=${studentId}` : ''}`;
  },

  // --- Questions ---
  async getQuestions(subjectId?: string, type?: string): Promise<{
    mcqs: MCQQuestion[];
    shortQuestions: ShortQuestion[];
    longQuestions: LongQuestion[];
  }> {
    const params = new URLSearchParams();
    if (subjectId) params.append('subjectId', subjectId);
    if (type) params.append('type', type);

    const res = await fetch(`/api/questions?${params.toString()}`);
    return res.json();
  },

  async addMCQ(mcq: Partial<MCQQuestion>): Promise<MCQQuestion> {
    const res = await fetch('/api/questions/mcq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mcq)
    });
    const data = await res.json();
    return data.question;
  },

  async deleteMCQ(id: string): Promise<boolean> {
    const res = await fetch(`/api/questions/mcq/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  async addShortQuestion(q: Partial<ShortQuestion>): Promise<ShortQuestion> {
    const res = await fetch('/api/questions/short', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(q)
    });
    const data = await res.json();
    return data.question;
  },

  async deleteShortQuestion(id: string): Promise<boolean> {
    const res = await fetch(`/api/questions/short/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  async addLongQuestion(q: Partial<LongQuestion>): Promise<LongQuestion> {
    const res = await fetch('/api/questions/long', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(q)
    });
    const data = await res.json();
    return data.question;
  },

  async deleteLongQuestion(id: string): Promise<boolean> {
    const res = await fetch(`/api/questions/long/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  async importCSV(csvData: string, subjectId: string): Promise<{ importedCount: number }> {
    const res = await fetch('/api/questions/import-csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ csvData, subjectId })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Import failed');
    }
    return res.json();
  },

  // --- Submissions & Grading ---
  async uploadAnswerSheet(file: File): Promise<UploadedAnswerFile> {
    const formData = new FormData();
    formData.append('answerFile', file);

    const res = await fetch('/api/submissions/upload-sheet', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to upload answer sheet');
    }
    const data = await res.json();
    return data.file;
  },

  async submitExam(payload: {
    examId: string;
    studentId: string;
    mcqAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>;
    uploadedFile?: UploadedAnswerFile | null;
    richTextAnswers?: { sectionB?: Record<string, string>; sectionC?: string };
    startedAt?: string;
  }): Promise<{ submission: ExamSubmission; summary: any }> {
    const res = await fetch('/api/submissions/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Submission failed');
    }
    return res.json();
  },

  async getSubmissions(filters?: { studentId?: string; examId?: string; status?: string }): Promise<ExamSubmission[]> {
    const params = new URLSearchParams();
    if (filters?.studentId) params.append('studentId', filters.studentId);
    if (filters?.examId) params.append('examId', filters.examId);
    if (filters?.status) params.append('status', filters.status);

    const res = await fetch(`/api/submissions?${params.toString()}`);
    const data = await res.json();
    return data.submissions || [];
  },

  async getSubmission(id: string): Promise<{
    submission: ExamSubmission;
    exam: Exam;
    shortQuestions: ShortQuestion[];
    longQuestion?: LongQuestion;
  }> {
    const res = await fetch(`/api/submissions/${id}`);
    if (!res.ok) throw new Error('Submission not found');
    return res.json();
  },

  async gradeSubmission(
    submissionId: string,
    grading: {
      shortQuestionGrades: { questionId: string; marksObtained: number; teacherRemarks?: string }[];
      longQuestionGrade: { questionId: string; marksObtained: number; teacherRemarks?: string };
      teacherFeedbackGeneral?: string;
      gradedBy?: string;
    }
  ): Promise<ExamSubmission> {
    const res = await fetch(`/api/submissions/${submissionId}/grade`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grading)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to submit grade');
    }
    const data = await res.json();
    return data.submission;
  },

  // --- Statistics & CSV ---
  async getStatistics(): Promise<ExamStatistics> {
    const res = await fetch('/api/reports/statistics');
    const data = await res.json();
    return data.statistics;
  },

  getExportCSVUrl(): string {
    return '/api/reports/export-csv';
  }
};
