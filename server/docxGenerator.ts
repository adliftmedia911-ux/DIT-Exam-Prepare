import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  HeadingLevel,
  Packer
} from 'docx';
import { Exam, ShortQuestion, LongQuestion, User } from '../src/types';

export async function generateWordAnswerSheet(
  exam: Exam,
  shortQuestions: ShortQuestion[],
  longQuestion: LongQuestion | undefined,
  student?: Partial<User>
): Promise<Buffer> {
  const studentName = student?.name || '__________________________';
  const studentRollNo = student?.rollNo || '__________________________';
  const studentCollege = student?.collegeName || 'Superior College';
  const studentSession = student?.session || '2023-2025';
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const children: (Paragraph | Table)[] = [];

  // Header: College & Exam Title
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: 'SUPERIOR COLLEGE',
          bold: true,
          size: 32, // 16pt
          color: '0A192F',
          font: 'Calibri'
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: 'DEPARTMENT OF INFORMATION TECHNOLOGY (DIT)',
          bold: true,
          size: 24, // 12pt
          color: '059669',
          font: 'Calibri'
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [
        new TextRun({
          text: `OFFICIAL EXAM ANSWER SHEET - ${exam.title.toUpperCase()}`,
          bold: true,
          size: 22,
          color: '1E3A8A',
          font: 'Calibri'
        })
      ]
    })
  );

  // Student Info Table
  const tableBorder = {
    style: BorderStyle.SINGLE,
    size: 4,
    color: 'CCCCCC'
  };

  const infoTable = new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'Student Name:', bold: true, size: 20 })]
              })
            ]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
            children: [
              new Paragraph({
                children: [new TextRun({ text: studentName, size: 20, color: '1E3A8A' })]
              })
            ]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'Roll Number:', bold: true, size: 20 })]
              })
            ]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
            children: [
              new Paragraph({
                children: [new TextRun({ text: studentRollNo, size: 20, bold: true, color: '059669' })]
              })
            ]
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'College Campus:', bold: true, size: 20 })]
              })
            ]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
            children: [
              new Paragraph({
                children: [new TextRun({ text: studentCollege, size: 20 })]
              })
            ]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'Session / Year:', bold: true, size: 20 })]
              })
            ]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
            children: [
              new Paragraph({
                children: [new TextRun({ text: studentSession, size: 20 })]
              })
            ]
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'Subject:', bold: true, size: 20 })]
              })
            ]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
            children: [
              new Paragraph({
                children: [new TextRun({ text: exam.subjectName, size: 20 })]
              })
            ]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'Total Marks / Date:', bold: true, size: 20 })]
              })
            ]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
            children: [
              new Paragraph({
                children: [new TextRun({ text: `75 Marks | ${currentDate}`, size: 20 })]
              })
            ]
          })
        ]
      })
    ]
  });

  children.push(infoTable);

  // Instructions Box
  children.push(
    new Paragraph({
      spacing: { before: 240, after: 120 },
      children: [
        new TextRun({
          text: 'IMPORTANT INSTRUCTIONS FOR STUDENTS:',
          bold: true,
          size: 20,
          color: 'B91C1C'
        })
      ]
    }),
    new Paragraph({
      spacing: { after: 80 },
      bullet: { level: 0 },
      children: [
        new TextRun({
          text: 'Section A (39 MCQs) must be answered online in the examination portal on your laptop.',
          size: 19
        })
      ]
    }),
    new Paragraph({
      spacing: { after: 80 },
      bullet: { level: 0 },
      children: [
        new TextRun({
          text: 'Type your answers for Section B (7 Short Questions, 4 Marks each = 28 Marks) and Section C (1 Long Question = 8 Marks) in the designated areas below.',
          size: 19
        })
      ]
    }),
    new Paragraph({
      spacing: { after: 240 },
      bullet: { level: 0 },
      children: [
        new TextRun({
          text: 'Save your file on your computer as a .docx file and upload it through the portal before submitting the exam.',
          size: 19
        })
      ]
    })
  );

  // Section B Header
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 280, after: 140 },
      children: [
        new TextRun({
          text: 'SECTION B: SHORT QUESTIONS (Total Marks: 28)',
          bold: true,
          size: 24,
          color: '0A192F'
        })
      ]
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: 'Note: Answer all 7 questions. Each question carries 4 marks (7 x 4 = 28 Marks). Write concise, structured answers.',
          italics: true,
          size: 19,
          color: '475569'
        })
      ]
    })
  );

  // Iterate over Short Questions
  shortQuestions.forEach((sq, idx) => {
    children.push(
      new Paragraph({
        spacing: { before: 200, after: 80 },
        children: [
          new TextRun({
            text: `Question ${idx + 1} [4 Marks]: `,
            bold: true,
            size: 21,
            color: '1E3A8A'
          }),
          new TextRun({
            text: sq.questionText,
            size: 21,
            bold: false
          })
        ]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: `(Recommended guideline: ${sq.wordGuideline || '80-120 words'})`,
            italics: true,
            size: 18,
            color: '64748B'
          })
        ]
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: {
                  top: { style: BorderStyle.DASHED, size: 4, color: '94A3B8' },
                  bottom: { style: BorderStyle.DASHED, size: 4, color: '94A3B8' },
                  left: { style: BorderStyle.DASHED, size: 4, color: '94A3B8' },
                  right: { style: BorderStyle.DASHED, size: 4, color: '94A3B8' }
                },
                children: [
                  new Paragraph({
                    spacing: { before: 140, after: 140 },
                    children: [
                      new TextRun({
                        text: `[Type your Answer for Question ${idx + 1} here...]`,
                        italics: true,
                        size: 20,
                        color: '94A3B8'
                      })
                    ]
                  }),
                  new Paragraph({ spacing: { after: 300 }, children: [] }),
                  new Paragraph({ spacing: { after: 300 }, children: [] })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({ spacing: { after: 180 }, children: [] })
    );
  });

  // Section C Header
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 320, after: 140 },
      children: [
        new TextRun({
          text: 'SECTION C: LONG QUESTION (Total Marks: 8)',
          bold: true,
          size: 24,
          color: '0A192F'
        })
      ]
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: 'Note: Detailed, analytical question carrying 8 marks. Structure your answer with headings, points, and relevant diagrams/code where applicable.',
          italics: true,
          size: 19,
          color: '475569'
        })
      ]
    })
  );

  if (longQuestion) {
    children.push(
      new Paragraph({
        spacing: { before: 160, after: 100 },
        children: [
          new TextRun({
            text: 'Question 8 [Maximum Marks: 8]: ',
            bold: true,
            size: 22,
            color: '059669'
          }),
          new TextRun({
            text: longQuestion.questionText,
            size: 21,
            bold: false
          })
        ]
      })
    );

    if (longQuestion.subQuestions && longQuestion.subQuestions.length > 0) {
      children.push(
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: 'Marks Breakdown:',
              bold: true,
              size: 19,
              color: '334155'
            })
          ]
        })
      );
      longQuestion.subQuestions.forEach(sq => {
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 60 },
            children: [new TextRun({ text: sq, size: 19 })]
          })
        );
      });
    }

    children.push(
      new Paragraph({
        spacing: { before: 140, after: 120 },
        children: [
          new TextRun({
            text: `(Recommended guideline: ${longQuestion.wordGuideline || '250-400 words'})`,
            italics: true,
            size: 18,
            color: '64748B'
          })
        ]
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: {
                  top: { style: BorderStyle.DASHED, size: 4, color: '94A3B8' },
                  bottom: { style: BorderStyle.DASHED, size: 4, color: '94A3B8' },
                  left: { style: BorderStyle.DASHED, size: 4, color: '94A3B8' },
                  right: { style: BorderStyle.DASHED, size: 4, color: '94A3B8' }
                },
                children: [
                  new Paragraph({
                    spacing: { before: 140, after: 140 },
                    children: [
                      new TextRun({
                        text: '[Type your Comprehensive Long Answer for Section C here in MS Word...]',
                        italics: true,
                        size: 20,
                        color: '94A3B8'
                      })
                    ]
                  }),
                  new Paragraph({ spacing: { after: 400 }, children: [] }),
                  new Paragraph({ spacing: { after: 400 }, children: [] }),
                  new Paragraph({ spacing: { after: 400 }, children: [] })
                ]
              })
            ]
          })
        ]
      })
    );
  }

  // Footer text
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400 },
      children: [
        new TextRun({
          text: '--- END OF QUESTION PAPER & ANSWER SHEET ---',
          bold: true,
          size: 18,
          color: '94A3B8'
        })
      ]
    })
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children
      }
    ]
  });

  return await Packer.toBuffer(doc);
}
