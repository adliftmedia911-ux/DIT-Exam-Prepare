import fs from 'fs';
import path from 'path';
import {
  User,
  Subject,
  MCQQuestion,
  ShortQuestion,
  LongQuestion,
  Exam,
  ExamSubmission,
  ExamStatistics,
  SyllabusModule
} from '../src/types';
import { INITIAL_USERS, INITIAL_SUBJECTS } from './initialData';
import {
  INITIAL_MCQS,
  INITIAL_SHORT_QUESTIONS,
  INITIAL_LONG_QUESTIONS,
  INITIAL_EXAMS
} from './questionBank';

interface DatabaseData {
  users: User[];
  subjects: Subject[];
  mcqs: MCQQuestion[];
  shortQuestions: ShortQuestion[];
  longQuestions: LongQuestion[];
  exams: Exam[];
  submissions: ExamSubmission[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'exam_system.json');

class DatabaseStore {
  private data: DatabaseData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseData {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        // Ensure all arrays exist
        return {
          users: parsed.users || INITIAL_USERS,
          subjects: parsed.subjects || INITIAL_SUBJECTS,
          mcqs: parsed.mcqs || INITIAL_MCQS,
          shortQuestions: parsed.shortQuestions || INITIAL_SHORT_QUESTIONS,
          longQuestions: parsed.longQuestions || INITIAL_LONG_QUESTIONS,
          exams: parsed.exams || INITIAL_EXAMS,
          submissions: parsed.submissions || []
        };
      }
    } catch (err) {
      console.warn('Could not read existing database file, falling back to initial data:', err);
    }

    // Default initial seed
    const initial: DatabaseData = {
      users: [...INITIAL_USERS],
      subjects: [...INITIAL_SUBJECTS],
      mcqs: [...INITIAL_MCQS],
      shortQuestions: [...INITIAL_SHORT_QUESTIONS],
      longQuestions: [...INITIAL_LONG_QUESTIONS],
      exams: [...INITIAL_EXAMS],
      submissions: [
        // One pre-seeded completed submission to illustrate the workflow
        {
          id: 'sub_seed_1',
          examId: 'exam_pl_2024',
          examTitle: 'DIT Annual Exam 2024 – Programming Language',
          subjectId: 'prog_lang',
          subjectName: 'Programming Language',
          studentId: 'student_1',
          studentName: 'Muhammad Ali Raza',
          studentRollNo: 'DIT-2024-042',
          studentCollege: 'Superior College of Commerce & IT, Lahore',
          studentSession: '2023-2025',
          startedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          submittedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          status: 'published',
          mcqAnswers: {
            pl_mcq_1: 'B',
            pl_mcq_2: 'C',
            pl_mcq_3: 'C',
            pl_mcq_4: 'C',
            pl_mcq_5: 'C',
            pl_mcq_6: 'C',
            pl_mcq_7: 'C',
            pl_mcq_8: 'B',
            pl_mcq_9: 'C',
            pl_mcq_10: 'C',
            pl_mcq_11: 'B',
            pl_mcq_12: 'B',
            pl_mcq_13: 'C',
            pl_mcq_14: 'C',
            pl_mcq_15: 'B',
            pl_mcq_16: 'B',
            pl_mcq_17: 'C',
            pl_mcq_18: 'B',
            pl_mcq_19: 'C',
            pl_mcq_20: 'C',
            pl_mcq_21: 'C',
            pl_mcq_22: 'B',
            pl_mcq_23: 'B',
            pl_mcq_24: 'C',
            pl_mcq_25: 'C',
            pl_mcq_26: 'B',
            pl_mcq_27: 'B',
            pl_mcq_28: 'C',
            pl_mcq_29: 'B',
            pl_mcq_30: 'B',
            pl_mcq_31: 'C',
            pl_mcq_32: 'C',
            pl_mcq_33: 'B',
            pl_mcq_34: 'B',
            pl_mcq_35: 'C',
            pl_mcq_36: 'C',
            pl_mcq_37: 'B',
            pl_mcq_38: 'B',
            pl_mcq_39: 'C'
          },
          mcqScore: 37,
          mcqTotalMarks: 39,
          uploadedFile: {
            filename: 'demo_answersheet_ali_raza.docx',
            originalName: 'DIT_Programming_Answers_AliRaza.docx',
            path: 'uploads/demo_answersheet_ali_raza.docx',
            size: 48200,
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            uploadedAt: new Date(Date.now() - 3600000 * 4).toISOString()
          },
          sectionAMarksObtained: 37,
          sectionBMarksObtained: 25,
          sectionCMarksObtained: 7,
          shortQuestionGrades: [
            { questionId: 'pl_sq_1', marksObtained: 4, maxMarks: 4, teacherRemarks: 'Excellent distinction between compiler and interpreter.' },
            { questionId: 'pl_sq_2', marksObtained: 4, maxMarks: 4, teacherRemarks: 'Accurate code demo.' },
            { questionId: 'pl_sq_3', marksObtained: 3, maxMarks: 4, teacherRemarks: 'Good explanation, could elaborate exit condition.' },
            { questionId: 'pl_sq_4', marksObtained: 4, maxMarks: 4, teacherRemarks: 'Rules for function overloading correct.' },
            { questionId: 'pl_sq_5', marksObtained: 3, maxMarks: 4, teacherRemarks: 'Pointer syntax explained well.' },
            { questionId: 'pl_sq_6', marksObtained: 4, maxMarks: 4, teacherRemarks: 'Solid explanation of encapsulation.' },
            { questionId: 'pl_sq_7', marksObtained: 3, maxMarks: 4, teacherRemarks: 'Constructor characteristics outlined.' }
          ],
          longQuestionGrade: {
            questionId: 'pl_lq_1',
            marksObtained: 7,
            maxMarks: 8,
            teacherRemarks: 'Well structured C++ inheritance code and OOP pillars.'
          },
          totalMarksObtained: 69,
          maxTotalMarks: 75,
          percentage: 92,
          grade: 'A+',
          isPassed: true,
          teacherFeedbackGeneral: 'Outstanding performance in Programming Language. High conceptual mastery demonstrated in both MCQs and written code.',
          gradedBy: 'Prof. Dr. Tariq Mahmood',
          gradedAt: new Date(Date.now() - 3600000 * 2).toISOString()
        }
      ]
    };

    this.saveData(initial);
    return initial;
  }

  private saveData(dataToSave?: DatabaseData) {
    try {
      const data = dataToSave || this.data;
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save data to file:', err);
    }
  }

  // --- Users ---
  getUsers(): User[] {
    return this.data.users;
  }

  getUserById(id: string): User | undefined {
    return this.data.users.find(u => u.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserByRollNo(rollNo: string): User | undefined {
    return this.data.users.find(u => u.rollNo?.toLowerCase() === rollNo.toLowerCase());
  }

  createUser(user: User): User {
    this.data.users.push(user);
    this.saveData();
    return user;
  }

  // --- Subjects ---
  getSubjects(): Subject[] {
    return this.data.subjects;
  }

  getSubjectById(id: string): Subject | undefined {
    return this.data.subjects.find(s => s.id === id);
  }

  updateSubject(id: string, updates: Partial<Subject>): Subject | null {
    const idx = this.data.subjects.findIndex(s => s.id === id);
    if (idx === -1) return null;
    this.data.subjects[idx] = { ...this.data.subjects[idx], ...updates };
    this.saveData();
    return this.data.subjects[idx];
  }

  addModule(subjectId: string, module: SyllabusModule): Subject | null {
    const subject = this.data.subjects.find(s => s.id === subjectId);
    if (!subject) return null;
    subject.modules.push(module);
    subject.totalModules = subject.modules.length;
    this.saveData();
    return subject;
  }

  deleteModule(subjectId: string, moduleId: string): Subject | null {
    const subject = this.data.subjects.find(s => s.id === subjectId);
    if (!subject) return null;
    subject.modules = subject.modules.filter(m => m.id !== moduleId);
    subject.totalModules = subject.modules.length;
    this.saveData();
    return subject;
  }

  // --- Questions ---
  getMCQs(subjectId?: string): MCQQuestion[] {
    if (subjectId) {
      return this.data.mcqs.filter(m => m.subjectId === subjectId);
    }
    return this.data.mcqs;
  }

  getMCQById(id: string): MCQQuestion | undefined {
    return this.data.mcqs.find(m => m.id === id);
  }

  addMCQ(mcq: MCQQuestion): MCQQuestion {
    this.data.mcqs.push(mcq);
    this.saveData();
    return mcq;
  }

  updateMCQ(id: string, updates: Partial<MCQQuestion>): MCQQuestion | null {
    const idx = this.data.mcqs.findIndex(m => m.id === id);
    if (idx === -1) return null;
    this.data.mcqs[idx] = { ...this.data.mcqs[idx], ...updates };
    this.saveData();
    return this.data.mcqs[idx];
  }

  deleteMCQ(id: string): boolean {
    const lenBefore = this.data.mcqs.length;
    this.data.mcqs = this.data.mcqs.filter(m => m.id !== id);
    if (this.data.mcqs.length !== lenBefore) {
      this.saveData();
      return true;
    }
    return false;
  }

  getShortQuestions(subjectId?: string): ShortQuestion[] {
    if (subjectId) {
      return this.data.shortQuestions.filter(s => s.subjectId === subjectId);
    }
    return this.data.shortQuestions;
  }

  getShortQuestionById(id: string): ShortQuestion | undefined {
    return this.data.shortQuestions.find(s => s.id === id);
  }

  addShortQuestion(q: ShortQuestion): ShortQuestion {
    this.data.shortQuestions.push(q);
    this.saveData();
    return q;
  }

  updateShortQuestion(id: string, updates: Partial<ShortQuestion>): ShortQuestion | null {
    const idx = this.data.shortQuestions.findIndex(s => s.id === id);
    if (idx === -1) return null;
    this.data.shortQuestions[idx] = { ...this.data.shortQuestions[idx], ...updates };
    this.saveData();
    return this.data.shortQuestions[idx];
  }

  deleteShortQuestion(id: string): boolean {
    const lenBefore = this.data.shortQuestions.length;
    this.data.shortQuestions = this.data.shortQuestions.filter(s => s.id !== id);
    if (this.data.shortQuestions.length !== lenBefore) {
      this.saveData();
      return true;
    }
    return false;
  }

  getLongQuestions(subjectId?: string): LongQuestion[] {
    if (subjectId) {
      return this.data.longQuestions.filter(l => l.subjectId === subjectId);
    }
    return this.data.longQuestions;
  }

  getLongQuestionById(id: string): LongQuestion | undefined {
    return this.data.longQuestions.find(l => l.id === id);
  }

  addLongQuestion(q: LongQuestion): LongQuestion {
    this.data.longQuestions.push(q);
    this.saveData();
    return q;
  }

  updateLongQuestion(id: string, updates: Partial<LongQuestion>): LongQuestion | null {
    const idx = this.data.longQuestions.findIndex(l => l.id === id);
    if (idx === -1) return null;
    this.data.longQuestions[idx] = { ...this.data.longQuestions[idx], ...updates };
    this.saveData();
    return this.data.longQuestions[idx];
  }

  deleteLongQuestion(id: string): boolean {
    const lenBefore = this.data.longQuestions.length;
    this.data.longQuestions = this.data.longQuestions.filter(l => l.id !== id);
    if (this.data.longQuestions.length !== lenBefore) {
      this.saveData();
      return true;
    }
    return false;
  }

  importMCQs(mcqs: MCQQuestion[]) {
    this.data.mcqs.push(...mcqs);
    this.saveData();
    return mcqs.length;
  }

  // --- Exams ---
  getExams(): Exam[] {
    return this.data.exams;
  }

  getExamById(id: string): Exam | undefined {
    return this.data.exams.find(e => e.id === id);
  }

  createExam(exam: Exam): Exam {
    this.data.exams.push(exam);
    this.saveData();
    return exam;
  }

  updateExam(id: string, updates: Partial<Exam>): Exam | null {
    const idx = this.data.exams.findIndex(e => e.id === id);
    if (idx === -1) return null;
    this.data.exams[idx] = { ...this.data.exams[idx], ...updates };
    this.saveData();
    return this.data.exams[idx];
  }

  deleteExam(id: string): boolean {
    const lenBefore = this.data.exams.length;
    this.data.exams = this.data.exams.filter(e => e.id !== id);
    if (this.data.exams.length !== lenBefore) {
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Submissions & Results ---
  getSubmissions(filters?: { studentId?: string; examId?: string; status?: string }): ExamSubmission[] {
    let list = this.data.submissions;
    if (filters?.studentId) {
      list = list.filter(s => s.studentId === filters.studentId);
    }
    if (filters?.examId) {
      list = list.filter(s => s.examId === filters.examId);
    }
    if (filters?.status) {
      list = list.filter(s => s.status === filters.status);
    }
    // Return newest first
    return list.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  }

  getSubmissionById(id: string): ExamSubmission | undefined {
    return this.data.submissions.find(s => s.id === id);
  }

  createSubmission(submission: ExamSubmission): ExamSubmission {
    this.data.submissions.push(submission);
    this.saveData();
    return submission;
  }

  gradeSubmission(
    id: string,
    grading: {
      shortQuestionGrades: { questionId: string; marksObtained: number; teacherRemarks?: string }[];
      longQuestionGrade: { questionId: string; marksObtained: number; teacherRemarks?: string };
      teacherFeedbackGeneral?: string;
      gradedBy?: string;
    }
  ): ExamSubmission | null {
    const sub = this.data.submissions.find(s => s.id === id);
    if (!sub) return null;

    const shortMarksTotal = grading.shortQuestionGrades.reduce(
      (sum, g) => sum + Math.min(4, Math.max(0, Number(g.marksObtained) || 0)),
      0
    );
    const longMarksTotal = Math.min(8, Math.max(0, Number(grading.longQuestionGrade.marksObtained) || 0));

    sub.sectionBMarksObtained = shortMarksTotal;
    sub.sectionCMarksObtained = longMarksTotal;
    sub.shortQuestionGrades = grading.shortQuestionGrades.map(g => ({
      questionId: g.questionId,
      marksObtained: Number(g.marksObtained) || 0,
      maxMarks: 4,
      teacherRemarks: g.teacherRemarks || ''
    }));
    sub.longQuestionGrade = {
      questionId: grading.longQuestionGrade.questionId,
      marksObtained: longMarksTotal,
      maxMarks: 8,
      teacherRemarks: grading.longQuestionGrade.teacherRemarks || ''
    };

    const finalTotal = sub.sectionAMarksObtained + shortMarksTotal + longMarksTotal;
    sub.totalMarksObtained = finalTotal;
    sub.percentage = Math.round((finalTotal / 75) * 100);

    // Pass criteria: 30 marks out of 75 (40%)
    sub.isPassed = finalTotal >= 30;

    // Grade assignment
    if (sub.percentage >= 80) sub.grade = 'A+';
    else if (sub.percentage >= 70) sub.grade = 'A';
    else if (sub.percentage >= 60) sub.grade = 'B';
    else if (sub.percentage >= 50) sub.grade = 'C';
    else if (sub.percentage >= 40) sub.grade = 'D';
    else sub.grade = 'F';

    sub.teacherFeedbackGeneral = grading.teacherFeedbackGeneral || 'Answers marked by faculty examiner.';
    sub.gradedBy = grading.gradedBy || 'Faculty Examiner';
    sub.gradedAt = new Date().toISOString();
    sub.status = 'published';

    this.saveData();
    return sub;
  }

  getStatistics(): ExamStatistics {
    const students = this.data.users.filter(u => u.role === 'student');
    const exams = this.data.exams;
    const attempts = this.data.submissions;
    const published = attempts.filter(a => a.status === 'published');
    const pending = attempts.filter(a => a.status === 'pending_marking');

    const passedCount = published.filter(a => a.isPassed).length;
    const overallPassRate = published.length > 0 ? Math.round((passedCount / published.length) * 100) : 100;

    const subjectPerformance = this.data.subjects.map(subj => {
      const subjAttempts = published.filter(a => a.subjectId === subj.id);
      const passed = subjAttempts.filter(a => a.isPassed).length;
      const totalScore = subjAttempts.reduce((acc, a) => acc + (a.totalMarksObtained || 0), 0);
      return {
        subjectName: subj.name,
        attempts: subjAttempts.length,
        avgScore: subjAttempts.length > 0 ? Math.round(totalScore / subjAttempts.length) : 0,
        passRate: subjAttempts.length > 0 ? Math.round((passed / subjAttempts.length) * 100) : 100
      };
    });

    return {
      totalStudents: students.length,
      totalExams: exams.length,
      totalAttempts: attempts.length,
      pendingMarkingCount: pending.length,
      publishedCount: published.length,
      overallPassRate,
      subjectPerformance
    };
  }
}

export const db = new DatabaseStore();
