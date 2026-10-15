import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { db } from './server/db';
import { generateWordAnswerSheet } from './server/docxGenerator';
import { User, ExamSubmission, MCQQuestion, ShortQuestion, LongQuestion } from './src/types';

const app = express();
const PORT = process.env.PORT || 3000;

// Setup directories
const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${cleanBase}_${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = ['.docx', '.doc', '.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format. Please upload a Microsoft Word (.docx, .doc) or PDF document.'));
    }
  }
});

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(UPLOADS_DIR));

// -------------------------------------------------------------
// Authentication APIs
// -------------------------------------------------------------
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { identifier, password, role } = req.body;
  if (!identifier) {
    return res.status(400).json({ error: 'Email or Roll Number is required' });
  }

  const users = db.getUsers();
  let user: User | undefined;

  if (role === 'admin') {
    user = users.find(
      u => u.role === 'admin' && (u.email.toLowerCase() === identifier.toLowerCase() || identifier.toLowerCase() === 'admin')
    );
    if (!user) {
      return res.status(401).json({ error: 'Invalid admin credentials. Use admin@superior.edu.pk or demo quick-login.' });
    }
  } else {
    // Student login by rollNo or email
    user = users.find(
      u =>
        u.role === 'student' &&
        (u.rollNo?.toLowerCase() === identifier.toLowerCase() ||
          u.email.toLowerCase() === identifier.toLowerCase())
    );
    if (!user) {
      return res.status(401).json({ error: 'Student account not found with this Roll Number or Email. Please register.' });
    }
  }

  return res.json({ success: true, user });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, rollNo, email, collegeName, session, phone } = req.body;

  if (!name || !rollNo || !email) {
    return res.status(400).json({ error: 'Name, Roll Number, and Email are required fields.' });
  }

  const existingRoll = db.getUserByRollNo(rollNo);
  if (existingRoll) {
    return res.status(400).json({ error: `A student with Roll Number ${rollNo} is already registered.` });
  }

  const existingEmail = db.getUserByEmail(email);
  if (existingEmail) {
    return res.status(400).json({ error: `A user with Email ${email} already exists.` });
  }

  const newUser: User = {
    id: `student_${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    role: 'student',
    rollNo: rollNo.trim().toUpperCase(),
    collegeName: collegeName ? collegeName.trim() : 'Superior College',
    session: session ? session.trim() : '2023-2025',
    phone: phone ? phone.trim() : '',
    createdAt: new Date().toISOString()
  };

  db.createUser(newUser);
  return res.json({ success: true, user: newUser });
});

app.get('/api/users/students', (_req: Request, res: Response) => {
  const students = db.getUsers().filter(u => u.role === 'student');
  res.json({ students });
});

// -------------------------------------------------------------
// Subjects & Syllabus APIs
// -------------------------------------------------------------
app.get('/api/subjects', (_req: Request, res: Response) => {
  res.json({ subjects: db.getSubjects() });
});

app.get('/api/subjects/:id', (req: Request, res: Response) => {
  const subj = db.getSubjectById(req.params.id);
  if (!subj) return res.status(404).json({ error: 'Subject not found' });
  res.json({ subject: subj });
});

app.post('/api/subjects/:id/modules', (req: Request, res: Response) => {
  const { title, code, description, chapters } = req.body;
  if (!title) return res.status(400).json({ error: 'Module title is required' });

  const newModule = {
    id: `mod_${Date.now()}`,
    code: code || `MOD-${Date.now().toString().slice(-3)}`,
    title,
    description: description || '',
    chapters: chapters || []
  };

  const updated = db.addModule(req.params.id, newModule);
  if (!updated) return res.status(404).json({ error: 'Subject not found' });
  res.json({ success: true, subject: updated });
});

app.delete('/api/subjects/:subjectId/modules/:moduleId', (req: Request, res: Response) => {
  const updated = db.deleteModule(req.params.subjectId, req.params.moduleId);
  if (!updated) return res.status(404).json({ error: 'Subject or Module not found' });
  res.json({ success: true, subject: updated });
});

// -------------------------------------------------------------
// Questions APIs (MCQs, Short Questions, Long Questions)
// -------------------------------------------------------------
app.get('/api/questions', (req: Request, res: Response) => {
  const subjectId = req.query.subjectId as string | undefined;
  const type = req.query.type as string | undefined;

  const mcqs = db.getMCQs(subjectId);
  const shortQuestions = db.getShortQuestions(subjectId);
  const longQuestions = db.getLongQuestions(subjectId);

  if (type === 'mcq') return res.json({ mcqs });
  if (type === 'short') return res.json({ shortQuestions });
  if (type === 'long') return res.json({ longQuestions });

  res.json({ mcqs, shortQuestions, longQuestions });
});

app.post('/api/questions/mcq', (req: Request, res: Response) => {
  const { subjectId, moduleId, questionText, options, correctAnswer, difficulty } = req.body;
  if (!subjectId || !questionText || !options?.A || !options?.B || !options?.C || !options?.D || !correctAnswer) {
    return res.status(400).json({ error: 'All MCQ fields (question text, 4 options A/B/C/D, correct answer) are required.' });
  }

  const newMCQ: MCQQuestion = {
    id: `mcq_${Date.now()}`,
    subjectId,
    moduleId: moduleId || '',
    questionText,
    options,
    correctAnswer,
    marks: 1,
    difficulty: difficulty || 'medium'
  };

  db.addMCQ(newMCQ);
  res.json({ success: true, question: newMCQ });
});

app.put('/api/questions/mcq/:id', (req: Request, res: Response) => {
  const updated = db.updateMCQ(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Question not found' });
  res.json({ success: true, question: updated });
});

app.delete('/api/questions/mcq/:id', (req: Request, res: Response) => {
  const deleted = db.deleteMCQ(req.params.id);
  res.json({ success: deleted });
});

app.post('/api/questions/short', (req: Request, res: Response) => {
  const { subjectId, moduleId, questionText, wordGuideline, answerKeyHint } = req.body;
  if (!subjectId || !questionText) {
    return res.status(400).json({ error: 'Subject and Question Text are required.' });
  }

  const existing = db.getShortQuestions(subjectId);
  const newShort: ShortQuestion = {
    id: `sq_${Date.now()}`,
    subjectId,
    moduleId: moduleId || '',
    questionNumber: existing.length + 1,
    questionText,
    marks: 4,
    wordGuideline: wordGuideline || '80-120 words',
    answerKeyHint: answerKeyHint || ''
  };

  db.addShortQuestion(newShort);
  res.json({ success: true, question: newShort });
});

app.delete('/api/questions/short/:id', (req: Request, res: Response) => {
  const deleted = db.deleteShortQuestion(req.params.id);
  res.json({ success: deleted });
});

app.post('/api/questions/long', (req: Request, res: Response) => {
  const { subjectId, moduleId, questionText, subQuestions, wordGuideline, answerKeyHint } = req.body;
  if (!subjectId || !questionText) {
    return res.status(400).json({ error: 'Subject and Question Text are required.' });
  }

  const newLong: LongQuestion = {
    id: `lq_${Date.now()}`,
    subjectId,
    moduleId: moduleId || '',
    questionText,
    marks: 8,
    subQuestions: subQuestions || [],
    wordGuideline: wordGuideline || '250-400 words',
    answerKeyHint: answerKeyHint || ''
  };

  db.addLongQuestion(newLong);
  res.json({ success: true, question: newLong });
});

app.delete('/api/questions/long/:id', (req: Request, res: Response) => {
  const deleted = db.deleteLongQuestion(req.params.id);
  res.json({ success: deleted });
});

// Bulk import MCQs (CSV text parsing)
app.post('/api/questions/import-csv', (req: Request, res: Response) => {
  const { csvData, subjectId } = req.body;
  if (!csvData || !subjectId) {
    return res.status(400).json({ error: 'csvData and subjectId are required' });
  }

  try {
    const lines = csvData.split(/\r?\n/).filter((l: string) => l.trim().length > 0);
    // Expected format: QuestionText, OptionA, OptionB, OptionC, OptionD, CorrectAnswer(A/B/C/D)
    let addedCount = 0;
    const newMCQs: MCQQuestion[] = [];

    // Skip header if it exists
    const startIndex = lines[0].toLowerCase().includes('option') ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const parts = lines[i].split(',').map((p: string) => p.trim().replace(/^["']|["']$/g, ''));
      if (parts.length >= 6) {
        const [qText, optA, optB, optC, optD, correct] = parts;
        const correctNorm = correct.toUpperCase() as 'A' | 'B' | 'C' | 'D';
        if (['A', 'B', 'C', 'D'].includes(correctNorm)) {
          newMCQs.push({
            id: `mcq_${Date.now()}_${i}`,
            subjectId,
            moduleId: '',
            questionText: qText,
            options: { A: optA, B: optB, C: optC, D: optD },
            correctAnswer: correctNorm,
            marks: 1,
            difficulty: 'medium'
          });
          addedCount++;
        }
      }
    }

    if (newMCQs.length > 0) {
      db.importMCQs(newMCQs);
    }

    res.json({ success: true, importedCount: addedCount });
  } catch (err: any) {
    res.status(500).json({ error: `Failed to parse CSV: ${err.message}` });
  }
});

// -------------------------------------------------------------
// Exams APIs
// -------------------------------------------------------------
app.get('/api/exams', (_req: Request, res: Response) => {
  const exams = db.getExams();
  res.json({ exams });
});

app.get('/api/exams/:id', (req: Request, res: Response) => {
  const exam = db.getExamById(req.params.id);
  if (!exam) return res.status(404).json({ error: 'Exam not found' });

  // Resolve questions for this exam
  const mcqs = exam.mcqIds.map(id => db.getMCQById(id)).filter(Boolean) as MCQQuestion[];
  const shortQuestions = exam.shortQuestionIds
    .map(id => db.getShortQuestionById(id))
    .filter(Boolean) as ShortQuestion[];
  const longQuestion = db.getLongQuestionById(exam.longQuestionId);

  res.json({ exam, mcqs, shortQuestions, longQuestion });
});

app.post('/api/exams', (req: Request, res: Response) => {
  const { title, subjectId, durationMinutes, passingMarks } = req.body;
  if (!title || !subjectId) {
    return res.status(400).json({ error: 'Title and Subject are required.' });
  }

  const subject = db.getSubjectById(subjectId);
  const subjectMCQs = db.getMCQs(subjectId);
  const subjectShort = db.getShortQuestions(subjectId);
  const subjectLong = db.getLongQuestions(subjectId);

  // Take up to 39 MCQs, 7 Short, 1 Long
  const selectedMCQIds = subjectMCQs.slice(0, 39).map(m => m.id);
  const selectedShortIds = subjectShort.slice(0, 7).map(s => s.id);
  const selectedLongId = subjectLong[0]?.id || '';

  const newExam = {
    id: `exam_${Date.now()}`,
    title,
    examCode: `DIT-${subject?.code || 'EXAM'}-${Date.now().toString().slice(-4)}`,
    subjectId,
    subjectName: subject?.name || 'DIT Course',
    durationMinutes: Number(durationMinutes) || 90,
    totalMarks: 75,
    passingMarks: Number(passingMarks) || 30,
    sectionAMarks: 39,
    sectionBMarks: 28,
    sectionCMarks: 8,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 3600000).toISOString(),
    isActive: true,
    instructions: [
      'Total duration: ' + (durationMinutes || 90) + ' minutes.',
      'Paper carries 75 Marks in total: 39 MCQs, 7 Short Questions (4 Marks each), and 1 Long Question (8 Marks).',
      'Download the official .docx answer sheet template, write your answers in Microsoft Word, and upload the file.',
      'MCQ answers will be marked instantly upon submission.'
    ],
    mcqIds: selectedMCQIds,
    shortQuestionIds: selectedShortIds,
    longQuestionId: selectedLongId
  };

  db.createExam(newExam);
  res.json({ success: true, exam: newExam });
});

// Download official customized Word Answer Sheet template
app.get('/api/exams/:id/word-template', async (req: Request, res: Response) => {
  const exam = db.getExamById(req.params.id);
  if (!exam) return res.status(404).json({ error: 'Exam not found' });

  const shortQuestions = exam.shortQuestionIds
    .map(id => db.getShortQuestionById(id))
    .filter(Boolean) as ShortQuestion[];
  const longQuestion = db.getLongQuestionById(exam.longQuestionId);

  let student: Partial<User> | undefined;
  if (req.query.studentId) {
    student = db.getUserById(req.query.studentId as string);
  }

  try {
    const docBuffer = await generateWordAnswerSheet(exam, shortQuestions, longQuestion, student);
    const filename = `Superior_College_AnswerSheet_${exam.subjectId}_${student?.rollNo || 'Candidate'}.docx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(docBuffer);
  } catch (err: any) {
    console.error('Failed to generate Word document:', err);
    res.status(500).json({ error: `Could not generate Word document: ${err.message}` });
  }
});

// -------------------------------------------------------------
// Submissions & Grading APIs
// -------------------------------------------------------------

// Upload Word/PDF Answer Sheet
app.post('/api/submissions/upload-sheet', upload.single('answerFile'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No answer sheet file provided' });
  }

  const uploadedFileInfo = {
    filename: req.file.filename,
    originalName: req.file.originalname,
    path: `uploads/${req.file.filename}`,
    size: req.file.size,
    mimeType: req.file.mimetype,
    uploadedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    file: uploadedFileInfo,
    message: 'Answer sheet uploaded successfully.'
  });
});

// Submit Exam with automatic Section A (MCQs) marking
app.post('/api/submissions/submit', (req: Request, res: Response) => {
  const { examId, studentId, mcqAnswers, uploadedFile, richTextAnswers } = req.body;

  if (!examId || !studentId) {
    return res.status(400).json({ error: 'examId and studentId are required' });
  }

  const exam = db.getExamById(examId);
  if (!exam) return res.status(404).json({ error: 'Exam not found' });

  const student = db.getUserById(studentId);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  // Automatic Server-Side Marking of Section A (MCQs)
  let mcqScore = 0;
  const mcqDetail: Record<string, { isCorrect: boolean; selected: string; correct: string }> = {};

  const userAnswers: Record<string, 'A' | 'B' | 'C' | 'D'> = mcqAnswers || {};

  exam.mcqIds.forEach(mcqId => {
    const question = db.getMCQById(mcqId);
    if (question) {
      const selected = userAnswers[mcqId];
      const isCorrect = selected === question.correctAnswer;
      if (isCorrect) mcqScore += 1;

      mcqDetail[mcqId] = {
        isCorrect,
        selected: selected || 'Unanswered',
        correct: question.correctAnswer
      };
    }
  });

  const submission: ExamSubmission = {
    id: `sub_${Date.now()}`,
    examId,
    examTitle: exam.title,
    subjectId: exam.subjectId,
    subjectName: exam.subjectName,
    studentId: student.id,
    studentName: student.name,
    studentRollNo: student.rollNo || 'DIT-2024-000',
    studentCollege: student.collegeName || 'Superior College',
    studentSession: student.session || '2023-2025',
    startedAt: req.body.startedAt || new Date(Date.now() - 3600000).toISOString(),
    submittedAt: new Date().toISOString(),
    status: 'pending_marking', // Section B & C require faculty evaluation
    mcqAnswers: userAnswers,
    mcqScore,
    mcqTotalMarks: exam.sectionAMarks || 39,
    mcqDetail,
    uploadedFile: uploadedFile || null,
    richTextAnswers: richTextAnswers || {},
    sectionAMarksObtained: mcqScore,
    sectionBMarksObtained: null, // Pending teacher evaluation
    sectionCMarksObtained: null, // Pending teacher evaluation
    totalMarksObtained: mcqScore, // Provisional score
    maxTotalMarks: 75,
    percentage: Math.round((mcqScore / 75) * 100),
    grade: null,
    isPassed: null,
    teacherFeedbackGeneral: 'MCQ Section evaluated automatically. Written Word answers submitted and queued for faculty evaluation.'
  };

  db.createSubmission(submission);

  res.json({
    success: true,
    submission,
    summary: {
      mcqScore,
      mcqTotal: exam.sectionAMarks || 39,
      status: 'pending_marking',
      message: `Section A MCQs marked automatically: ${mcqScore}/39. Section B (28 Marks) & Section C (8 Marks) submitted to faculty for evaluation.`
    }
  });
});

app.get('/api/submissions', (req: Request, res: Response) => {
  const studentId = req.query.studentId as string | undefined;
  const examId = req.query.examId as string | undefined;
  const status = req.query.status as string | undefined;

  const submissions = db.getSubmissions({ studentId, examId, status });
  res.json({ submissions });
});

app.get('/api/submissions/:id', (req: Request, res: Response) => {
  const sub = db.getSubmissionById(req.params.id);
  if (!sub) return res.status(404).json({ error: 'Submission not found' });

  // Also include exam details with questions for easy teacher grading
  const exam = db.getExamById(sub.examId);
  const shortQuestions = exam?.shortQuestionIds
    .map(id => db.getShortQuestionById(id))
    .filter(Boolean) as ShortQuestion[];
  const longQuestion = exam ? db.getLongQuestionById(exam.longQuestionId) : undefined;

  res.json({ submission: sub, exam, shortQuestions, longQuestion });
});

// Teacher / Admin Marking of Section B and C
app.post('/api/submissions/:id/grade', (req: Request, res: Response) => {
  const { shortQuestionGrades, longQuestionGrade, teacherFeedbackGeneral, gradedBy } = req.body;

  if (!shortQuestionGrades || !longQuestionGrade) {
    return res.status(400).json({ error: 'shortQuestionGrades and longQuestionGrade are required' });
  }

  const gradedSubmission = db.gradeSubmission(req.params.id, {
    shortQuestionGrades,
    longQuestionGrade,
    teacherFeedbackGeneral,
    gradedBy: gradedBy || 'Prof. Dr. Tariq Mahmood'
  });

  if (!gradedSubmission) {
    return res.status(404).json({ error: 'Submission not found' });
  }

  res.json({
    success: true,
    submission: gradedSubmission,
    message: 'Final result calculated and published successfully.'
  });
});

// -------------------------------------------------------------
// Statistics & Reports APIs
// -------------------------------------------------------------
app.get('/api/reports/statistics', (_req: Request, res: Response) => {
  const stats = db.getStatistics();
  res.json({ statistics: stats });
});

// Export Results to CSV
app.get('/api/reports/export-csv', (_req: Request, res: Response) => {
  const submissions = db.getSubmissions();

  const headers = [
    'Submission ID',
    'Roll Number',
    'Student Name',
    'College Campus',
    'Session',
    'Subject',
    'Section A (MCQs /39)',
    'Section B (Short /28)',
    'Section C (Long /8)',
    'Total Marks (/75)',
    'Percentage (%)',
    'Grade',
    'Result Status',
    'Submitted At',
    'Graded At',
    'Graded By'
  ];

  const rows = submissions.map(s => [
    `"${s.id}"`,
    `"${s.studentRollNo}"`,
    `"${s.studentName.replace(/"/g, '""')}"`,
    `"${s.studentCollege.replace(/"/g, '""')}"`,
    `"${s.studentSession}"`,
    `"${s.subjectName}"`,
    s.sectionAMarksObtained,
    s.sectionBMarksObtained !== null ? s.sectionBMarksObtained : 'Pending',
    s.sectionCMarksObtained !== null ? s.sectionCMarksObtained : 'Pending',
    s.totalMarksObtained !== null ? s.totalMarksObtained : s.sectionAMarksObtained,
    s.percentage !== null ? `${s.percentage}%` : 'Pending',
    s.grade || 'Pending',
    s.isPassed === true ? 'PASSED' : s.isPassed === false ? 'FAILED' : 'Awaiting Grading',
    `"${new Date(s.submittedAt).toLocaleString()}"`,
    s.gradedAt ? `"${new Date(s.gradedAt).toLocaleString()}"` : 'N/A',
    `"${s.gradedBy || 'N/A'}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="Superior_College_DIT_Exam_Results.csv"');
  res.send(csvContent);
});

// -------------------------------------------------------------
// Vite Server Integration (Dev / Prod)
// -------------------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Superior College DIT Smart Exam System running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Error starting server:', err);
});
