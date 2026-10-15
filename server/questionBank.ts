import { MCQQuestion, ShortQuestion, LongQuestion, Exam } from '../src/types';

// Helper to generate realistic DIT MCQs for the 5 subjects
export const INITIAL_MCQS: MCQQuestion[] = [
  // --- SUBJECT 1: Programming Language (39 MCQs) ---
  {
    id: 'pl_mcq_1',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_1',
    questionText: 'Which of the following translators converts high-level code line-by-line into machine code?',
    options: { A: 'Compiler', B: 'Interpreter', C: 'Assembler', D: 'Linker' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_2',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_1',
    questionText: 'In a flowchart, what geometric symbol represents a decision or condition?',
    options: { A: 'Rectangle', B: 'Parallelogram', C: 'Diamond (Rhombus)', D: 'Oval' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_3',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_2',
    questionText: 'What is the size of a standard "int" data type in modern 32/64-bit C/C++ compilers?',
    options: { A: '1 Byte', B: '2 Bytes', C: '4 Bytes', D: '8 Bytes' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_4',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_2',
    questionText: 'Which of the following is an invalid identifier in C language?',
    options: { A: 'student_roll', B: '_count', C: '2totalMarks', D: 'final_score_2024' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'pl_mcq_5',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_2',
    questionText: 'What is the result of the integer expression (17 % 5) in C?',
    options: { A: '3.4', B: '3', C: '2', D: '1' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_6',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_2',
    questionText: 'Which format specifier is used to input or print a double precision floating point number in C?',
    options: { A: '%d', B: '%f', C: '%lf', D: '%s' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_7',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_3',
    questionText: 'Which loop construct guarantees at least one execution of its loop body even if condition is false?',
    options: { A: 'for loop', B: 'while loop', C: 'do-while loop', D: 'nested loop' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_8',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_3',
    questionText: 'What statement is used to immediately exit a loop or switch structure?',
    options: { A: 'continue', B: 'break', C: 'return', D: 'exit' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_9',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_3',
    questionText: 'In a switch-case construct, what executes if no case label matches the selector expression?',
    options: { A: 'else', B: 'finally', C: 'default', D: 'break' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_10',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_3',
    questionText: 'What will happen if a loop condition never evaluates to false?',
    options: { A: 'Syntax error', B: 'Compilation error', C: 'Infinite loop', D: 'Segmentation fault' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_11',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_4',
    questionText: 'What is a function prototype in C?',
    options: { A: 'The body of the function', B: 'The declaration specifying name, return type, and parameters', C: 'A built-in library', D: 'A pointer variable' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'pl_mcq_12',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_4',
    questionText: 'When arguments are passed by reference, what is actually transferred to the formal parameter?',
    options: { A: 'A duplicate copy of the value', B: 'The memory address of the actual argument', C: 'The data type identifier', D: 'The ASCII code' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'pl_mcq_13',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_4',
    questionText: 'A function that calls itself either directly or indirectly is known as a:',
    options: { A: 'Inline function', B: 'Virtual function', C: 'Recursive function', D: 'Friend function' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_14',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_4',
    questionText: 'Which storage class retains variable values across successive function calls?',
    options: { A: 'auto', B: 'register', C: 'static', D: 'extern' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'pl_mcq_15',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_5',
    questionText: 'If an array is declared as "int marks[10];", what is the valid index range?',
    options: { A: '1 to 10', B: '0 to 9', C: '0 to 10', D: '-1 to 9' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_16',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_5',
    questionText: 'Which character automatically marks the termination of a string in C?',
    options: { A: '\\n', B: '\\0', C: '\\t', D: 'EOF' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_17',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_5',
    questionText: 'Which operator is used to extract the memory address of an existing variable in C?',
    options: { A: '*', B: '->', C: '&', D: '%' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_18',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_5',
    questionText: 'What is the purpose of the dereference operator (*) when applied to a pointer?',
    options: { A: 'Get the address of pointer', B: 'Access the value stored at the memory address', C: 'Multiply two pointers', D: 'Allocate heap memory' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'pl_mcq_19',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_5',
    questionText: 'Which standard library function calculates the length of a string without counting the null terminator?',
    options: { A: 'strrev()', B: 'strcmp()', C: 'strlen()', D: 'strcpy()' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_20',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_6',
    questionText: 'Wrapping data and methods together into a single unit in OOP is called:',
    options: { A: 'Polymorphism', B: 'Inheritance', C: 'Encapsulation', D: 'Abstraction' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_21',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_6',
    questionText: 'Which member function has the exact same name as the class and executes automatically upon instantiation?',
    options: { A: 'Destructor', B: 'Friend function', C: 'Constructor', D: 'Operator function' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_22',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_6',
    questionText: 'What symbol is prefixed before a class name to declare its destructor in C++?',
    options: { A: '#', B: '~', C: '&', D: '*' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_23',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_6',
    questionText: 'The ability of a single interface or function name to exhibit different behaviors is known as:',
    options: { A: 'Inheritance', B: 'Polymorphism', C: 'Composition', D: 'Aggregation' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'pl_mcq_24',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_6',
    questionText: 'Which access specifier allows class members to be accessed by derived classes but not outside code?',
    options: { A: 'private', B: 'public', C: 'protected', D: 'internal' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'pl_mcq_25',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_2',
    questionText: 'Which header file is required to use printf() and scanf() in standard C?',
    options: { A: '<conio.h>', B: '<math.h>', C: '<stdio.h>', D: '<stdlib.h>' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_26',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_3',
    questionText: 'What is the output of the logical condition (5 > 3 && 2 > 8)?',
    options: { A: '1 (true)', B: '0 (false)', C: 'Syntax error', D: 'Undefined' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_27',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_2',
    questionText: 'What is the prefix decrement operator in C++?',
    options: { A: 'x--', B: '--x', C: 'x -= 1', D: 'x - 1' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_28',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_4',
    questionText: 'What does a function return type "void" signify?',
    options: { A: 'Returns integer zero', B: 'Returns a null pointer', C: 'Does not return any value', D: 'Returns empty string' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_29',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_5',
    questionText: 'How many elements can the 2D array "float matrix[3][4];" store in total?',
    options: { A: '7', B: '12', C: '16', D: '34' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_30',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_6',
    questionText: 'Which C++ file stream class is specifically used for reading data from a disk file?',
    options: { A: 'ofstream', B: 'ifstream', C: 'fstream', D: 'iostream' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'pl_mcq_31',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_1',
    questionText: 'Which stage of program compilation combines compiled object code with standard library code?',
    options: { A: 'Preprocessing', B: 'Lexical analysis', C: 'Linking', D: 'Loading' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'pl_mcq_32',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_2',
    questionText: 'Which of the following data types cannot be used inside a switch statement selector in C?',
    options: { A: 'int', B: 'char', C: 'float', D: 'short' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'pl_mcq_33',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_3',
    questionText: 'What is the keyword "continue" used for inside a loop?',
    options: { A: 'Terminates the loop completely', B: 'Skips the remaining statements in the current iteration and starts next', C: 'Restarts program from main()', D: 'Suspends loop execution for 1 second' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'pl_mcq_34',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_5',
    questionText: 'Which dynamic memory allocation function in C initializes all allocated bytes to zero?',
    options: { A: 'malloc()', B: 'calloc()', C: 'realloc()', D: 'free()' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'pl_mcq_35',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_5',
    questionText: 'What is a pointer that does not point to any valid memory location called?',
    options: { A: 'Void pointer', B: 'Dangling pointer', C: 'Null pointer', D: 'Wild pointer' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'pl_mcq_36',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_6',
    questionText: 'When a derived class inherits properties from more than one base class, it is called:',
    options: { A: 'Single inheritance', B: 'Multilevel inheritance', C: 'Multiple inheritance', D: 'Hierarchical inheritance' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_37',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_6',
    questionText: 'Which keyword is used in C++ to achieve runtime polymorphism with base pointers?',
    options: { A: 'inline', B: 'virtual', C: 'static', D: 'friend' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'pl_mcq_38',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_2',
    questionText: 'What is the ternary conditional operator in C/C++?',
    options: { A: '::', B: '?:', C: '->', D: '&&' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'pl_mcq_39',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_4',
    questionText: 'Where are local variables declared inside a function stored in memory during runtime?',
    options: { A: 'Data segment', B: 'Heap', C: 'Call Stack', D: 'Code segment' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },

  // --- SUBJECT 2: Information and Communication Technology (ICT) (39 MCQs) ---
  {
    id: 'ict_mcq_1',
    subjectId: 'ict',
    moduleId: 'mod_ict_1',
    questionText: 'Which major hardware technology characterized the First Generation of computers?',
    options: { A: 'Transistors', B: 'Vacuum Tubes', C: 'Integrated Circuits (ICs)', D: 'Microprocessors' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_2',
    subjectId: 'ict',
    moduleId: 'mod_ict_1',
    questionText: 'Who proposed the stored-program concept known as the Von Neumann Architecture?',
    options: { A: 'Charles Babbage', B: 'Alan Turing', C: 'John von Neumann', D: 'Blaise Pascal' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_3',
    subjectId: 'ict',
    moduleId: 'mod_ict_2',
    questionText: 'Which unit of the Central Processing Unit performs arithmetic additions and logical comparisons?',
    options: { A: 'Control Unit (CU)', B: 'Arithmetic Logic Unit (ALU)', C: 'Registers', D: 'Cache' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_4',
    subjectId: 'ict',
    moduleId: 'mod_ict_2',
    questionText: 'Which CPU register holds the memory address of the next instruction to be fetched?',
    options: { A: 'Instruction Register (IR)', B: 'Memory Data Register (MDR)', C: 'Program Counter (PC)', D: 'Accumulator (AC)' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'ict_mcq_5',
    subjectId: 'ict',
    moduleId: 'mod_ict_2',
    questionText: 'The tiny, ultra-fast memory located inside or immediately adjacent to the CPU core is:',
    options: { A: 'Virtual Memory', B: 'Cache Memory', C: 'ROM', D: 'Secondary Storage' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_6',
    subjectId: 'ict',
    moduleId: 'mod_ict_3',
    questionText: 'Which type of primary memory loses all its contents when the computer power is switched off?',
    options: { A: 'ROM', B: 'RAM', C: 'Flash BIOS', D: 'EEPROM' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_7',
    subjectId: 'ict',
    moduleId: 'mod_ict_3',
    questionText: 'Which storage drive has no mechanical moving parts and uses NAND flash memory?',
    options: { A: 'Hard Disk Drive (HDD)', B: 'Solid State Drive (SSD)', C: 'Magnetic Tape', D: 'Floppy Disk' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_8',
    subjectId: 'ict',
    moduleId: 'mod_ict_3',
    questionText: 'How many bytes are equivalent to one Kilobyte (KB) in binary notation?',
    options: { A: '1000 Bytes', B: '1024 Bytes', C: '512 Bytes', D: '2048 Bytes' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_9',
    subjectId: 'ict',
    moduleId: 'mod_ict_4',
    questionText: 'What is the base or radix of the Hexadecimal number system?',
    options: { A: '2', B: '8', C: '10', D: '16' },
    correctAnswer: 'D',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_10',
    subjectId: 'ict',
    moduleId: 'mod_ict_4',
    questionText: 'What is the binary representation of decimal number 13?',
    options: { A: '1011', B: '1101', C: '1110', D: '1001' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'ict_mcq_11',
    subjectId: 'ict',
    moduleId: 'mod_ict_4',
    questionText: 'Which logic gate produces output 1 only when BOTH inputs are 1?',
    options: { A: 'OR Gate', B: 'AND Gate', C: 'XOR Gate', D: 'NOT Gate' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_12',
    subjectId: 'ict',
    moduleId: 'mod_ict_4',
    questionText: 'Which logic gate produces output 1 if and only if the two inputs are DIFFERENT?',
    options: { A: 'AND Gate', B: 'NAND Gate', C: 'XOR Gate', D: 'NOR Gate' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'ict_mcq_13',
    subjectId: 'ict',
    moduleId: 'mod_ict_5',
    questionText: 'Which of the following is categorized as System Software?',
    options: { A: 'Microsoft Word', B: 'Adobe Photoshop', C: 'Operating System', D: 'Web Browser' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_14',
    subjectId: 'ict',
    moduleId: 'mod_ict_5',
    questionText: 'What is the role of a device driver?',
    options: { A: 'Translates high-level language code', B: 'Enables OS to communicate with specific hardware peripherals', C: 'Protects from viruses', D: 'Manages user accounts' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'ict_mcq_15',
    subjectId: 'ict',
    moduleId: 'mod_ict_5',
    questionText: 'Software provided free of charge with full access to modify its source code is called:',
    options: { A: 'Proprietary software', B: 'Shareware', C: 'Open-Source Software', D: 'Freeware without source' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_16',
    subjectId: 'ict',
    moduleId: 'mod_ict_6',
    questionText: 'Which malware disguises itself as a legitimate program to deceive users into installing it?',
    options: { A: 'Worm', B: 'Trojan Horse', C: 'Spyware', D: 'Adware' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_17',
    subjectId: 'ict',
    moduleId: 'mod_ict_6',
    questionText: 'The fraudulent attempt to obtain sensitive information like passwords by masquerading as a trustworthy entity is:',
    options: { A: 'Spoofing', B: 'Phishing', C: 'Spamming', D: 'DDoS' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_18',
    subjectId: 'ict',
    moduleId: 'mod_ict_6',
    questionText: 'A network security system that monitors and filters incoming and outgoing network traffic based on security rules is:',
    options: { A: 'Modem', B: 'Firewall', C: 'Switch', D: 'Repeater' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_19',
    subjectId: 'ict',
    moduleId: 'mod_ict_6',
    questionText: 'Which cloud service model provides virtualized computing resources such as virtual machines and raw storage?',
    options: { A: 'SaaS', B: 'PaaS', C: 'IaaS', D: 'DaaS' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'ict_mcq_20',
    subjectId: 'ict',
    moduleId: 'mod_ict_1',
    questionText: 'What is the full form of BIOS in personal computers?',
    options: { A: 'Binary Integrated Operating System', B: 'Basic Input Output System', C: 'Built-in Input Operational Software', D: 'Base Interface Optical Sensor' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_21',
    subjectId: 'ict',
    moduleId: 'mod_ict_2',
    questionText: 'The system bus that carries memory addresses from the CPU to the RAM is called the:',
    options: { A: 'Data Bus', B: 'Control Bus', C: 'Address Bus', D: 'Expansion Bus' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'ict_mcq_22',
    subjectId: 'ict',
    moduleId: 'mod_ict_2',
    questionText: 'Which port interface replaced VGA and DVI to transmit both high-definition video and audio?',
    options: { A: 'PS/2', B: 'HDMI', C: 'Serial COM', D: 'Parallel LPT' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_23',
    subjectId: 'ict',
    moduleId: 'mod_ict_3',
    questionText: 'Which optical storage disc standard has the highest typical capacity of 25 GB to 50 GB?',
    options: { A: 'CD-ROM', B: 'DVD-R', C: 'Blu-ray Disc (BD)', D: 'MiniDVD' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_24',
    subjectId: 'ict',
    moduleId: 'mod_ict_4',
    questionText: 'In standard ASCII encoding, how many bits are used to represent a single character?',
    options: { A: '4 bits', B: '7 bits', C: '16 bits', D: '32 bits' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'ict_mcq_25',
    subjectId: 'ict',
    moduleId: 'mod_ict_4',
    questionText: 'What is the two\'s complement of binary 0101?',
    options: { A: '1010', B: '1011', C: '1100', D: '0010' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'hard'
  },
  {
    id: 'ict_mcq_26',
    subjectId: 'ict',
    moduleId: 'mod_ict_5',
    questionText: 'Software that is provided on a trial basis for evaluation before purchase is known as:',
    options: { A: 'Freeware', B: 'Shareware', C: 'Firmware', D: 'Adware' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_27',
    subjectId: 'ict',
    moduleId: 'mod_ict_6',
    questionText: 'Which encryption technique uses a single secret key for both encryption and decryption?',
    options: { A: 'Asymmetric Encryption', B: 'Symmetric Encryption', C: 'Public-Key Encryption', D: 'Hashing' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'ict_mcq_28',
    subjectId: 'ict',
    moduleId: 'mod_ict_6',
    questionText: 'What type of malware locks a user’s files or system and demands monetary payment to restore access?',
    options: { A: 'Spyware', B: 'Keylogger', C: 'Ransomware', D: 'Rootkit' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_29',
    subjectId: 'ict',
    moduleId: 'mod_ict_2',
    questionText: 'What keeps the real-time clock running and CMOS memory intact when the PC is powered off?',
    options: { A: 'SMPS', B: 'CMOS CR2032 Lithium Battery', C: 'Capacitor', D: 'Heat sink' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_30',
    subjectId: 'ict',
    moduleId: 'mod_ict_1',
    questionText: 'Which computer class is engineered specifically to execute complex simulations such as weather forecasting?',
    options: { A: 'Microcomputer', B: 'Workstation', C: 'Supercomputer', D: 'Mainframe' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_31',
    subjectId: 'ict',
    moduleId: 'mod_ict_3',
    questionText: 'What does "DRAM" require continuously to prevent its charge and data from leaking away?',
    options: { A: 'Magnetic pulses', B: 'Periodic refreshing cycle', C: 'Cooling liquid', D: 'Optical beams' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'ict_mcq_32',
    subjectId: 'ict',
    moduleId: 'mod_ict_5',
    questionText: 'Which program checks and tests system hardware components immediately when the computer is turned on?',
    options: { A: 'POST (Power-On Self-Test)', B: 'Bootloader', C: 'Kernel', D: 'Scandisk' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'ict_mcq_33',
    subjectId: 'ict',
    moduleId: 'mod_ict_4',
    questionText: 'What is the hexadecimal equivalent of binary 1111 0000?',
    options: { A: 'F0', B: '0F', C: 'FF', D: 'E0' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'ict_mcq_34',
    subjectId: 'ict',
    moduleId: 'mod_ict_6',
    questionText: 'Which Google Workspace or Microsoft 365 model is an example of cloud computing?',
    options: { A: 'IaaS', B: 'PaaS', C: 'SaaS', D: 'CaaS' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_35',
    subjectId: 'ict',
    moduleId: 'mod_ict_2',
    questionText: 'Which slot interface on modern motherboards connects graphics cards at high bandwidth?',
    options: { A: 'PCIe x16', B: 'AGP 2x', C: 'ISA', D: 'IDE' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'ict_mcq_36',
    subjectId: 'ict',
    moduleId: 'mod_ict_3',
    questionText: 'Which memory type is non-volatile and can be erased electrically using high voltage?',
    options: { A: 'SRAM', B: 'DRAM', C: 'EEPROM', D: 'Cache L1' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'ict_mcq_37',
    subjectId: 'ict',
    moduleId: 'mod_ict_4',
    questionText: 'What is the universal character encoding standard that can represent text in virtually all written languages?',
    options: { A: 'ASCII', B: 'EBCDIC', C: 'Unicode (UTF-8/UTF-16)', D: 'BCD' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_38',
    subjectId: 'ict',
    moduleId: 'mod_ict_6',
    questionText: 'Unauthorized copying and distribution of copyrighted commercial software is known as:',
    options: { A: 'Data scraping', B: 'Software Piracy', C: 'Cyber stalking', D: 'Digital forensics' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'ict_mcq_39',
    subjectId: 'ict',
    moduleId: 'mod_ict_1',
    questionText: 'The physical parts of a computer system that you can touch and manipulate are called:',
    options: { A: 'Hardware', B: 'Software', C: 'Firmware', D: 'Liveware' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'easy'
  },

  // --- SUBJECT 3: Operating System (39 MCQs) ---
  {
    id: 'os_mcq_1',
    subjectId: 'os',
    moduleId: 'mod_os_1',
    questionText: 'What core component of an Operating System remains continuously resident in RAM throughout runtime?',
    options: { A: 'Shell', B: 'Kernel', C: 'Compiler', D: 'Desktop Window Manager' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_2',
    subjectId: 'os',
    moduleId: 'mod_os_1',
    questionText: 'Which OS architecture implements only minimum essential services in kernel space and runs drivers in user space?',
    options: { A: 'Monolithic Kernel', B: 'Microkernel', C: 'Layered Kernel', D: 'Exokernel' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_3',
    subjectId: 'os',
    moduleId: 'mod_os_1',
    questionText: 'How does an executing user program request privileged hardware services from the operating system?',
    options: { A: 'Function call', B: 'System Call', C: 'Goto statement', D: 'Subroutine' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_4',
    subjectId: 'os',
    moduleId: 'mod_os_2',
    questionText: 'What data structure maintains all state information, registers, and memory pointers of a process?',
    options: { A: 'File Allocation Table (FAT)', B: 'Process Control Block (PCB)', C: 'Page Table', D: 'Inodes' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_5',
    subjectId: 'os',
    moduleId: 'mod_os_2',
    questionText: 'When the CPU switches execution context from one process to another, the overhead operation is called:',
    options: { A: 'Context Switching', B: 'Thread Pooling', C: 'Paging', D: 'Spooling' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_6',
    subjectId: 'os',
    moduleId: 'mod_os_2',
    questionText: 'Which CPU scheduling algorithm allocates a fixed time slice (time quantum) to each ready process in cyclic order?',
    options: { A: 'First-Come, First-Served (FCFS)', B: 'Shortest Job First (SJF)', C: 'Round Robin (RR)', D: 'Priority Scheduling' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_7',
    subjectId: 'os',
    moduleId: 'mod_os_2',
    questionText: 'Which scheduling algorithm is provably optimal in minimizing the average waiting time for a set of processes?',
    options: { A: 'FCFS', B: 'Shortest Job First (SJF)', C: 'Round Robin', D: 'Multilevel Queue' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_8',
    subjectId: 'os',
    moduleId: 'mod_os_3',
    questionText: 'A condition where multiple concurrent threads access shared data and outcome depends on execution timing is a:',
    options: { A: 'Critical Section', B: 'Race Condition', C: 'Deadlock', D: 'Starvation' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_9',
    subjectId: 'os',
    moduleId: 'mod_os_3',
    questionText: 'Which integer variable accessed through atomic wait() and signal() operations is used for synchronization?',
    options: { A: 'Mutex', B: 'Semaphore', C: 'Condition variable', D: 'Pipe' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_10',
    subjectId: 'os',
    moduleId: 'mod_os_3',
    questionText: 'How many Coffman conditions must hold simultaneously for a system deadlock to occur?',
    options: { A: '2', B: '3', C: '4', D: '5' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_11',
    subjectId: 'os',
    moduleId: 'mod_os_3',
    questionText: 'Which famous algorithm is applied to avoid deadlocks in resource allocation systems?',
    options: { A: 'Dijkstra\'s Banker\'s Algorithm', B: 'Prim\'s Algorithm', C: 'Kruskal\'s Algorithm', D: 'Peterson\'s Algorithm' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_12',
    subjectId: 'os',
    moduleId: 'mod_os_4',
    questionText: 'The hardware component responsible for translating logical memory addresses into physical RAM addresses is:',
    options: { A: 'ALU', B: 'Memory Management Unit (MMU)', C: 'Direct Memory Access (DMA)', D: 'Northbridge' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_13',
    subjectId: 'os',
    moduleId: 'mod_os_4',
    questionText: 'In paging memory schemes, logical address space is divided into fixed-size blocks called:',
    options: { A: 'Frames', B: 'Pages', C: 'Segments', D: 'Clusters' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_14',
    subjectId: 'os',
    moduleId: 'mod_os_4',
    questionText: 'Physical RAM memory is divided into fixed-size blocks corresponding to pages called:',
    options: { A: 'Page Tables', B: 'Frames', C: 'Blocks', D: 'Sectors' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_15',
    subjectId: 'os',
    moduleId: 'mod_os_4',
    questionText: 'What type of memory fragmentation occurs inside an allocated block when the process requires less space than given?',
    options: { A: 'External Fragmentation', B: 'Internal Fragmentation', C: 'Virtual Fragmentation', D: 'Dynamic Fragmentation' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_16',
    subjectId: 'os',
    moduleId: 'mod_os_5',
    questionText: 'What event occurs when an executing process references a page that is not currently mapped into physical RAM?',
    options: { A: 'Segmentation Fault', B: 'Page Fault', C: 'Cache Miss', D: 'Deadlock' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_17',
    subjectId: 'os',
    moduleId: 'mod_os_5',
    questionText: 'The state where the operating system spends more time swapping pages in and out than executing real work is:',
    options: { A: 'Starvation', B: 'Paging bottleneck', C: 'Thrashing', D: 'Deadlock' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_18',
    subjectId: 'os',
    moduleId: 'mod_os_5',
    questionText: 'Bélády’s Anomaly (where increasing page frames leads to MORE page faults) occurs in which replacement algorithm?',
    options: { A: 'Least Recently Used (LRU)', B: 'Optimal Page Replacement', C: 'First-In, First-Out (FIFO)', D: 'Most Recently Used (MRU)' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_19',
    subjectId: 'os',
    moduleId: 'mod_os_6',
    questionText: 'Which disk scheduling algorithm services disk I/O requests closest to current head position to minimize seek time?',
    options: { A: 'FCFS', B: 'Shortest Seek Time First (SSTF)', C: 'SCAN', D: 'C-SCAN' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_20',
    subjectId: 'os',
    moduleId: 'mod_os_6',
    questionText: 'Which Linux command is used to alter the file permission bits (read, write, execute)?',
    options: { A: 'chown', B: 'chmod', C: 'chgrp', D: 'touch' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_21',
    subjectId: 'os',
    moduleId: 'mod_os_1',
    questionText: 'The dual-mode operation of modern CPUs distinguishes between:',
    options: { A: 'Online mode and Offline mode', B: 'User Mode and Kernel Mode (Supervisor Mode)', C: 'Direct mode and Indirect mode', D: 'Fast mode and Slow mode' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_22',
    subjectId: 'os',
    moduleId: 'mod_os_2',
    questionText: 'What is a lightweight process that shares the same address space with peer threads in a process called?',
    options: { A: 'Daemon', B: 'Thread', C: 'Child process', D: 'Semaphore' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_23',
    subjectId: 'os',
    moduleId: 'mod_os_2',
    questionText: 'The Long-Term Scheduler (Job Scheduler) in an OS is primarily responsible for controlling the:',
    options: { A: 'CPU clock speed', B: 'Degree of Multiprogramming', C: 'Page replacement frequency', D: 'Network bandwidth' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_24',
    subjectId: 'os',
    moduleId: 'mod_os_3',
    questionText: 'A binary semaphore whose value can only be 0 or 1 is functionally equivalent to a:',
    options: { A: 'Mutex lock', B: 'Spinlock', C: 'Barrier', D: 'Pipe' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_25',
    subjectId: 'os',
    moduleId: 'mod_os_3',
    questionText: 'Which condition for deadlock specifies that a process holding at least one resource is waiting to acquire additional resources?',
    options: { A: 'Mutual Exclusion', B: 'Hold and Wait', C: 'No Preemption', D: 'Circular Wait' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_26',
    subjectId: 'os',
    moduleId: 'mod_os_4',
    questionText: 'What high-speed hardware cache is integrated into the MMU to accelerate page table lookups?',
    options: { A: 'Instruction Cache', B: 'Translation Lookaside Buffer (TLB)', C: 'Data Cache', D: 'RAM buffer' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_27',
    subjectId: 'os',
    moduleId: 'mod_os_4',
    questionText: 'In memory compaction, what technique is used to solve external fragmentation in contiguous allocation?',
    options: { A: 'Shuffling all free memory together into one large block', B: 'Splitting RAM into pages', C: 'Swapping to disk', D: 'Dynamic linking' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_28',
    subjectId: 'os',
    moduleId: 'mod_os_5',
    questionText: 'Which theoretical page replacement algorithm gives the lowest possible page fault rate for any reference string?',
    options: { A: 'FIFO', B: 'LRU', C: 'Optimal Page Replacement (OPT)', D: 'Second Chance' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_29',
    subjectId: 'os',
    moduleId: 'mod_os_6',
    questionText: 'In UNIX file systems, what data structure stores the file metadata, size, ownership, and block pointers?',
    options: { A: 'Superblock', B: 'Inode', C: 'FAT table', D: 'Cluster map' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_30',
    subjectId: 'os',
    moduleId: 'mod_os_6',
    questionText: 'Which disk scheduling algorithm is often termed the "Elevator Algorithm" because it scans back and forth across tracks?',
    options: { A: 'SSTF', B: 'SCAN', C: 'LOOK', D: 'FCFS' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_31',
    subjectId: 'os',
    moduleId: 'mod_os_2',
    questionText: 'What state transition occurs when a process in the Running state requires I/O completion?',
    options: { A: 'Running -> Ready', B: 'Running -> Terminated', C: 'Running -> Waiting / Blocked', D: 'Waiting -> Ready' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_32',
    subjectId: 'os',
    moduleId: 'mod_os_1',
    questionText: 'What software interrupt instruction triggers a switch from user mode to kernel mode?',
    options: { A: 'Trap', B: 'Polling', C: 'DMA pulse', D: 'Context flush' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_33',
    subjectId: 'os',
    moduleId: 'mod_os_2',
    questionText: 'The Gantt chart in CPU scheduling is specifically used to represent:',
    options: { A: 'Memory allocation maps', B: 'Timeline of process allocation to the CPU', C: 'File hierarchy', D: 'Network bandwidth' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_34',
    subjectId: 'os',
    moduleId: 'mod_os_3',
    questionText: 'Starvation in priority scheduling can be resolved using what technique that gradually increases priority over time?',
    options: { A: 'Aging', B: 'Throttling', C: 'Spinning', D: 'Preemption' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_35',
    subjectId: 'os',
    moduleId: 'mod_os_4',
    questionText: 'In Segmentation, logical memory is divided into variable-length user-defined chunks called:',
    options: { A: 'Pages', B: 'Segments', C: 'Frames', D: 'Blocks' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_36',
    subjectId: 'os',
    moduleId: 'mod_os_5',
    questionText: 'Virtual memory allows execution of processes that:',
    options: { A: 'Have no CPU code', B: 'Are larger than physical RAM memory', C: 'Do not have an operating system', D: 'Are stored on tape only' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_37',
    subjectId: 'os',
    moduleId: 'mod_os_6',
    questionText: 'Which file allocation method suffers from zero external fragmentation but has poor direct/random access performance?',
    options: { A: 'Contiguous Allocation', B: 'Linked Allocation', C: 'Indexed Allocation', D: 'FAT32' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'os_mcq_38',
    subjectId: 'os',
    moduleId: 'mod_os_6',
    questionText: 'Which Linux command displays active processes and real-time CPU/memory utilization?',
    options: { A: 'ls', B: 'top', C: 'pwd', D: 'mkdir' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'os_mcq_39',
    subjectId: 'os',
    moduleId: 'mod_os_1',
    questionText: 'Which operating system type is designed to guarantee response within strictly defined, rigid time constraints?',
    options: { A: 'Batch Operating System', B: 'Time-Sharing System', C: 'Real-Time Operating System (RTOS)', D: 'Distributed System' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },

  // --- SUBJECT 4: MS Office (39 MCQs) ---
  {
    id: 'mo_mcq_1',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_1',
    questionText: 'What is the default file extension for documents saved in modern Microsoft Word (2007 and newer)?',
    options: { A: '.doc', B: '.docx', C: '.txt', D: '.dotx' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_2',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_1',
    questionText: 'Which keyboard shortcut is universally used to center-align the selected paragraph in MS Word?',
    options: { A: 'Ctrl + C', B: 'Ctrl + E', C: 'Ctrl + J', D: 'Ctrl + R' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_3',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_1',
    questionText: 'What type of break allows different sections of the same Word document to have different page orientations (Portrait and Landscape)?',
    options: { A: 'Page Break', B: 'Section Break (Next Page)', C: 'Column Break', D: 'Line Break' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'mo_mcq_4',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_2',
    questionText: 'Which feature in Microsoft Word automatically generates a Table of Contents based on document heading styles?',
    options: { A: 'Mailings tab', B: 'References tab -> Table of Contents', C: 'Insert tab -> Index', D: 'Review tab' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_5',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_2',
    questionText: 'Where does an Endnote appear in a Microsoft Word document by default?',
    options: { A: 'At the bottom of the current page', B: 'At the very end of the document', C: 'In the header', D: 'In the margin' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_6',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_3',
    questionText: 'Which powerful feature in MS Word enables printing personalized letters, diplomas, or envelopes from a data source?',
    options: { A: 'AutoText', B: 'Mail Merge', C: 'Macros', D: 'SmartArt' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_7',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_3',
    questionText: 'Which tool in Microsoft Word tracks all additions, deletions, and formatting changes made by multiple reviewers?',
    options: { A: 'Spell Check', B: 'Track Changes', C: 'AutoCorrect', D: 'Document Inspector' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_8',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_4',
    questionText: 'What character MUST every formula in Microsoft Excel begin with?',
    options: { A: '@', B: '=', C: '+', D: '#' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_9',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_4',
    questionText: 'What symbol is used in Microsoft Excel cell references to create an Absolute Reference (e.g., $B$4)?',
    options: { A: '%', B: '&', C: '$', D: '#' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_10',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_4',
    questionText: 'If cell A1 contains 20 and cell A2 contains 30, what does formula "=AVERAGE(A1:A2)" return?',
    options: { A: '50', B: '25', C: '20', D: '30' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_11',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_5',
    questionText: 'Which function looks up a value in the leftmost column of a table and returns a value in the same row from a specified column?',
    options: { A: 'HLOOKUP', B: 'VLOOKUP', C: 'INDEX', D: 'MATCH' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_12',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_5',
    questionText: 'Which Excel function counts the number of cells within a range that meet a single specific condition?',
    options: { A: 'COUNT', B: 'COUNTA', C: 'COUNTIF', D: 'COUNTBLANK' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_13',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_5',
    questionText: 'Which interactive Excel tool is used to rapidly summarize, aggregate, and analyze large datasets without manual formulas?',
    options: { A: 'Data Validation', B: 'PivotTable', C: 'Conditional Formatting', D: 'Goal Seek' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_14',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_5',
    questionText: 'What error message is displayed in Excel when a formula attempts to divide a number by zero?',
    options: { A: '#VALUE!', B: '#REF!', C: '#DIV/0!', D: '#N/A' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_15',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_6',
    questionText: 'In Microsoft PowerPoint, what top slide defines the universal fonts, colors, and layout background for the entire presentation?',
    options: { A: 'Title Slide', B: 'Slide Master', C: 'Handout Master', D: 'Theme Template' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_16',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_6',
    questionText: 'Which key is used to start a PowerPoint presentation in full Slide Show mode from the first slide?',
    options: { A: 'F1', B: 'F5', C: 'F7', D: 'F12' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_17',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_6',
    questionText: 'In Microsoft Access, a field (or combination of fields) that uniquely identifies each record in a database table is called the:',
    options: { A: 'Foreign Key', B: 'Primary Key', C: 'Composite Index', D: 'Candidate Identifier' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_18',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_6',
    questionText: 'Which MS Access database object is specifically designed to extract and retrieve filtered records from one or more tables?',
    options: { A: 'Table', B: 'Form', C: 'Query', D: 'Report' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_19',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_1',
    questionText: 'What is the function of the Format Painter tool in Microsoft Word and Excel?',
    options: { A: 'Paints drawings', B: 'Copies formatting from one item and applies it to another', C: 'Changes page background color', D: 'Corrects spelling' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_20',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_2',
    questionText: 'What is the keyboard shortcut to create a hyperlink in MS Word or PowerPoint?',
    options: { A: 'Ctrl + H', B: 'Ctrl + K', C: 'Ctrl + L', D: 'Ctrl + U' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_21',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_4',
    questionText: 'What Excel feature automatically completes a data series (such as days of week or months) when dragging the fill handle?',
    options: { A: 'AutoCorrect', B: 'AutoComplete', C: 'AutoFill', D: 'Flash Fill' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_22',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_5',
    questionText: 'Which function joins two or more text strings into a single unified text string in Excel?',
    options: { A: 'COMBINE()', B: 'CONCATENATE() / CONCAT()', C: 'MERGE()', D: 'JOIN()' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_23',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_5',
    questionText: 'What does the Excel error "#NAME?" typically indicate?',
    options: { A: 'A number is divided by zero', B: 'Excel does not recognize text in the formula (often a misspelled function name)', C: 'Cell column is too narrow', D: 'Circular reference' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'mo_mcq_24',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_6',
    questionText: 'In Microsoft PowerPoint, what is the visual effect that occurs when transitioning from one slide to the next called?',
    options: { A: 'Animation', B: 'Slide Transition', C: 'Action setting', D: 'Morph timing' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_25',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_6',
    questionText: 'In Microsoft Access, which view is used to define table fields, data types, and primary keys?',
    options: { A: 'Datasheet View', B: 'Design View', C: 'PivotChart View', D: 'SQL View' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_26',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_1',
    questionText: 'What is the shortcut key to justify paragraph alignment in Microsoft Word?',
    options: { A: 'Ctrl + J', B: 'Ctrl + F', C: 'Ctrl + Y', D: 'Ctrl + B' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_27',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_2',
    questionText: 'Which feature in Microsoft Word allows inserting a large decorative initial capital letter at the start of a paragraph?',
    options: { A: 'WordArt', B: 'Drop Cap', C: 'SmartArt', D: 'ClipArt' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_28',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_3',
    questionText: 'In Mail Merge, the placeholder text (such as «First_Name») where dynamic data is inserted is called a:',
    options: { A: 'Merge Field', B: 'Form Control', C: 'Macro tag', D: 'Variable label' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'mo_mcq_29',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_4',
    questionText: 'What occurs when a series of hash marks "#######" appears inside an Excel cell containing numerical data?',
    options: { A: 'Calculation error', B: 'The column width is too narrow to display the formatted number', C: 'The number is negative', D: 'Data type mismatch' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_30',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_5',
    questionText: 'Which Excel chart type is ideal for illustrating the proportions of parts to a whole?',
    options: { A: 'Line Chart', B: 'Pie Chart', C: 'Scatter Plot', D: 'Radar Chart' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_31',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_6',
    questionText: 'What database relationship type exists between "Student" and "Enrolled Courses" in university databases?',
    options: { A: 'One-to-One', B: 'One-to-Many', C: 'Many-to-Many', D: 'Self-Referencing' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'mo_mcq_32',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_1',
    questionText: 'Which tab on the Microsoft Word ribbon contains page margins, page orientation, and columns?',
    options: { A: 'Home tab', B: 'Layout / Page Layout tab', C: 'Design tab', D: 'View tab' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_33',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_2',
    questionText: 'What is the function of the "Header & Footer" in a formal document?',
    options: { A: 'Adds background watermarks only', B: 'Displays repeating information (document title, page numbers) at top/bottom of pages', C: 'Locks document editing', D: 'Exports to PDF' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_34',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_4',
    questionText: 'In Excel, if you copy formula "=A1*2" from cell B1 down to B2, what does the formula automatically adjust to?',
    options: { A: '=$A$1*2', B: '=A2*2', C: '=B1*2', D: '=A1*2' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_35',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_5',
    questionText: 'Which Excel function returns TRUE only if ALL logical conditions supplied to it evaluate to TRUE?',
    options: { A: 'OR()', B: 'AND()', C: 'NOT()', D: 'IF()' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_36',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_6',
    questionText: 'In Microsoft PowerPoint, what view displays thumbnails of all presentation slides for quick re-ordering?',
    options: { A: 'Normal View', B: 'Slide Sorter View', C: 'Notes Page View', D: 'Reading View' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_37',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_6',
    questionText: 'In Microsoft Access, what object is used to create a clean, printer-friendly formatted output of database records?',
    options: { A: 'Table', B: 'Query', C: 'Form', D: 'Report' },
    correctAnswer: 'D',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_38',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_3',
    questionText: 'Which document security feature in Word requires entering an authorized key to unlock reading or modifying?',
    options: { A: 'Password Protection / Encrypt with Password', B: 'Watermark', C: 'Digital Pen', D: 'Spelling Lock' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'mo_mcq_39',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_5',
    questionText: 'What feature restricts the types of data or values that users can enter into a specific Excel cell (e.g., whole numbers 1 to 100)?',
    options: { A: 'Data Sorting', B: 'Data Validation', C: 'AutoFit', D: 'Text to Columns' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },

  // --- SUBJECT 5: Computer Networks (39 MCQs) ---
  {
    id: 'cn_mcq_1',
    subjectId: 'networks',
    moduleId: 'mod_cn_1',
    questionText: 'In which data transmission mode can data travel in both directions simultaneously (like telephone conversations)?',
    options: { A: 'Simplex mode', B: 'Half-Duplex mode', C: 'Full-Duplex mode', D: 'Multiplex mode' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_2',
    subjectId: 'networks',
    moduleId: 'mod_cn_1',
    questionText: 'A network that connects computers across cities, countries, or across the entire globe is categorized as a:',
    options: { A: 'LAN (Local Area Network)', B: 'PAN (Personal Area Network)', C: 'WAN (Wide Area Network)', D: 'SAN (Storage Area Network)' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_3',
    subjectId: 'networks',
    moduleId: 'mod_cn_2',
    questionText: 'Which physical network topology connects all nodes to a central device such as a Switch or Hub?',
    options: { A: 'Bus Topology', B: 'Star Topology', C: 'Ring Topology', D: 'Mesh Topology' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_4',
    subjectId: 'networks',
    moduleId: 'mod_cn_2',
    questionText: 'In a fully connected Mesh topology with "n" nodes, how many physical communication links are required?',
    options: { A: 'n - 1', B: 'n', C: 'n(n - 1) / 2', D: '2n' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'cn_mcq_5',
    subjectId: 'networks',
    moduleId: 'mod_cn_2',
    questionText: 'Which transmission cable transmits data using light pulses through glass or plastic cores?',
    options: { A: 'Unshielded Twisted Pair (UTP)', B: 'Coaxial Cable', C: 'Fiber Optic Cable', D: 'Shielded Twisted Pair (STP)' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_6',
    subjectId: 'networks',
    moduleId: 'mod_cn_2',
    questionText: 'Which modular connector standard is universally used for terminating standard Category 5e/6 Ethernet UTP cables?',
    options: { A: 'RJ-11', B: 'RJ-45', C: 'BNC', D: 'DB-9' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_7',
    subjectId: 'networks',
    moduleId: 'mod_cn_3',
    questionText: 'How many distinct layers make up the International Organization for Standardization (ISO) OSI Reference Model?',
    options: { A: '4 Layers', B: '5 Layers', C: '7 Layers', D: '8 Layers' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_8',
    subjectId: 'networks',
    moduleId: 'mod_cn_3',
    questionText: 'Which OSI layer is directly responsible for logical addressing (IP addresses) and routing packets across networks?',
    options: { A: 'Data Link Layer (Layer 2)', B: 'Network Layer (Layer 3)', C: 'Transport Layer (Layer 4)', D: 'Session Layer (Layer 5)' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_9',
    subjectId: 'networks',
    moduleId: 'mod_cn_3',
    questionText: 'Which OSI layer handles physical hardware addressing (MAC addresses) and frame error detection (CRC)?',
    options: { A: 'Physical Layer (Layer 1)', B: 'Data Link Layer (Layer 2)', C: 'Transport Layer (Layer 4)', D: 'Presentation Layer (Layer 6)' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_10',
    subjectId: 'networks',
    moduleId: 'mod_cn_4',
    questionText: 'What transport protocol is connection-oriented, provides guaranteed in-order delivery, and uses flow control?',
    options: { A: 'UDP', B: 'TCP', C: 'IP', D: 'ICMP' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_11',
    subjectId: 'networks',
    moduleId: 'mod_cn_4',
    questionText: 'What lightweight transport protocol is connectionless and prioritizes minimal latency (ideal for live video/gaming)?',
    options: { A: 'TCP', B: 'UDP', C: 'FTP', D: 'SMTP' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_12',
    subjectId: 'networks',
    moduleId: 'mod_cn_4',
    questionText: 'How many packets are exchanged in the TCP connection establishment handshake?',
    options: { A: '1 Packet', B: '2 Packets (SYN, ACK)', C: '3 Packets (SYN, SYN-ACK, ACK)', D: '4 Packets' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'cn_mcq_13',
    subjectId: 'networks',
    moduleId: 'mod_cn_5',
    questionText: 'How many bits compose an IPv4 (Internet Protocol Version 4) address?',
    options: { A: '16 bits', B: '32 bits (4 octets)', C: '64 bits', D: '128 bits' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_14',
    subjectId: 'networks',
    moduleId: 'mod_cn_5',
    questionText: 'What is the default subnet mask for a standard Class C IPv4 network?',
    options: { A: '255.0.0.0', B: '255.255.0.0', C: '255.255.255.0', D: '255.255.255.255' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_15',
    subjectId: 'networks',
    moduleId: 'mod_cn_5',
    questionText: 'Which IP address is universally designated as the local loopback testing address in IPv4?',
    options: { A: '192.168.1.1', B: '127.0.0.1', C: '0.0.0.0', D: '255.255.255.255' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_16',
    subjectId: 'networks',
    moduleId: 'mod_cn_5',
    questionText: 'How many bits compose an IPv6 address?',
    options: { A: '32 bits', B: '64 bits', C: '128 bits', D: '256 bits' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_17',
    subjectId: 'networks',
    moduleId: 'mod_cn_6',
    questionText: 'Which protocol dynamically assigns IP addresses, subnet masks, and default gateways to client computers?',
    options: { A: 'DNS', B: 'DHCP', C: 'ARP', D: 'SNMP' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_18',
    subjectId: 'networks',
    moduleId: 'mod_cn_6',
    questionText: 'Which network service translates human-friendly domain names (e.g. superior.edu.pk) into numerical IP addresses?',
    options: { A: 'DHCP', B: 'DNS (Domain Name System)', C: 'FTP', D: 'Telnet' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_19',
    subjectId: 'networks',
    moduleId: 'mod_cn_6',
    questionText: 'What default TCP port is utilized by secure, encrypted web traffic over HTTPS?',
    options: { A: '21', B: '25', C: '80', D: '443' },
    correctAnswer: 'D',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_20',
    subjectId: 'networks',
    moduleId: 'mod_cn_6',
    questionText: 'Which Layer 3 device connects distinct networks and makes intelligent forwarding decisions based on IP addresses?',
    options: { A: 'Repeater', B: 'Hub', C: 'Switch', D: 'Router' },
    correctAnswer: 'D',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_21',
    subjectId: 'networks',
    moduleId: 'mod_cn_3',
    questionText: 'Which OSI layer is responsible for data encryption, compression, and character code translation (e.g. ASCII to Unicode)?',
    options: { A: 'Application Layer', B: 'Presentation Layer', C: 'Session Layer', D: 'Transport Layer' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'cn_mcq_22',
    subjectId: 'networks',
    moduleId: 'mod_cn_5',
    questionText: 'What is the binary CIDR prefix notation for the standard subnet mask 255.255.255.0?',
    options: { A: '/8', B: '/16', C: '/24', D: '/32' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_23',
    subjectId: 'networks',
    moduleId: 'mod_cn_6',
    questionText: 'Which protocol translates a known logical IP address into a physical Layer 2 MAC address?',
    options: { A: 'RARP', B: 'ARP (Address Resolution Protocol)', C: 'ICMP', D: 'IGMP' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'cn_mcq_24',
    subjectId: 'networks',
    moduleId: 'mod_cn_6',
    questionText: 'What command-line tool utilizes ICMP echo requests to verify network connectivity with a remote host?',
    options: { A: 'tracert / traceroute', B: 'ping', C: 'netstat', D: 'ipconfig / ifconfig' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_25',
    subjectId: 'networks',
    moduleId: 'mod_cn_2',
    questionText: 'What device operates at Layer 2 and creates separate collision domains for each connected port while maintaining a single broadcast domain?',
    options: { A: 'Passive Hub', B: 'Network Switch', C: 'Amplifier', D: 'Transceiver' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'cn_mcq_26',
    subjectId: 'networks',
    moduleId: 'mod_cn_1',
    questionText: 'Television and radio broadcasting are classic examples of which transmission mode?',
    options: { A: 'Simplex mode', B: 'Half-Duplex mode', C: 'Full-Duplex mode', D: 'Interactive mode' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_27',
    subjectId: 'networks',
    moduleId: 'mod_cn_3',
    questionText: 'In the OSI model, what is the Protocol Data Unit (PDU) at the Transport Layer named?',
    options: { A: 'Bits', B: 'Frames', C: 'Packets', D: 'Segments' },
    correctAnswer: 'D',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'cn_mcq_28',
    subjectId: 'networks',
    moduleId: 'mod_cn_5',
    questionText: 'Which of the following IPv4 address ranges is reserved for Private Networks (RFC 1918) in Class C?',
    options: { A: '10.0.0.0 to 10.255.255.255', B: '172.16.0.0 to 172.31.255.255', C: '192.168.0.0 to 192.168.255.255', D: '169.254.0.0 to 169.254.255.255' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_29',
    subjectId: 'networks',
    moduleId: 'mod_cn_6',
    questionText: 'Which protocol is used by email clients to send outgoing mail to mail servers?',
    options: { A: 'POP3', B: 'IMAP', C: 'SMTP (Simple Mail Transfer Protocol)', D: 'SNMP' },
    correctAnswer: 'C',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_30',
    subjectId: 'networks',
    moduleId: 'mod_cn_2',
    questionText: 'What optical fiber type has a very small core (approx. 9 microns) and allows signals to travel over dozens of kilometers without repeaters?',
    options: { A: 'Multi-mode fiber (MMF)', B: 'Single-mode fiber (SMF)', C: 'Plastic optical fiber', D: 'Coaxial fiber' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'cn_mcq_31',
    subjectId: 'networks',
    moduleId: 'mod_cn_4',
    questionText: 'What mechanism in TCP prevents a fast sender from overwhelming a slow receiver’s buffer?',
    options: { A: 'Flow Control (Sliding Window)', B: 'Congestion Avoidance', C: 'Checksum verification', D: 'Round Robin' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'cn_mcq_32',
    subjectId: 'networks',
    moduleId: 'mod_cn_5',
    questionText: 'If a subnet mask is /26 (255.255.255.192), how many usable host IP addresses are available per subnet?',
    options: { A: '30', B: '62', C: '126', D: '254' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'hard'
  },
  {
    id: 'cn_mcq_33',
    subjectId: 'networks',
    moduleId: 'mod_cn_6',
    questionText: 'What security mechanism creates an encrypted tunnel across the public Internet to securely connect remote users to a private network?',
    options: { A: 'Proxy Server', B: 'Virtual Private Network (VPN)', C: 'NAT', D: 'DMZ' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_34',
    subjectId: 'networks',
    moduleId: 'mod_cn_3',
    questionText: 'The process of adding layer-specific headers as data travels down the OSI stack from Application to Physical is called:',
    options: { A: 'Decapsulation', B: 'Encapsulation', C: 'Segmentation', D: 'Multiplexing' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_35',
    subjectId: 'networks',
    moduleId: 'mod_cn_2',
    questionText: 'In a traditional Bus topology, what passive resistor components are installed at both cable ends to absorb signal reflection?',
    options: { A: 'Terminators', B: 'Repeaters', C: 'Bridges', D: 'Attenuators' },
    correctAnswer: 'A',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_36',
    subjectId: 'networks',
    moduleId: 'mod_cn_5',
    questionText: 'What is the first address in any IP subnet (where all host bits are zero)?',
    options: { A: 'Broadcast Address', B: 'Network ID / Subnet Address', C: 'Default Gateway', D: 'Multicast Address' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'cn_mcq_37',
    subjectId: 'networks',
    moduleId: 'mod_cn_6',
    questionText: 'What is the default port number used by the Domain Name System (DNS) for standard queries?',
    options: { A: '23', B: '53', C: '67', D: '110' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 'cn_mcq_38',
    subjectId: 'networks',
    moduleId: 'mod_cn_4',
    questionText: 'Which field in the IPv4 header prevents packets from endlessly circulating in routing loops by decrementing at each hop?',
    options: { A: 'Header Checksum', B: 'Time To Live (TTL)', C: 'Type of Service', D: 'Identification' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'medium'
  },
  {
    id: 'cn_mcq_39',
    subjectId: 'networks',
    moduleId: 'mod_cn_1',
    questionText: 'Walkie-talkie communication where both parties can transmit but only one at a time is an example of:',
    options: { A: 'Simplex', B: 'Half-Duplex', C: 'Full-Duplex', D: 'Multiplex' },
    correctAnswer: 'B',
    marks: 1,
    difficulty: 'easy'
  }
];

// 7 Short Questions per Subject (worth 4 marks each = 28 Marks total)
export const INITIAL_SHORT_QUESTIONS: ShortQuestion[] = [
  // --- Programming Language ---
  {
    id: 'pl_sq_1',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_1',
    questionNumber: 1,
    questionText: 'Differentiate between a Compiler and an Interpreter with respect to execution speed, error detection, and memory consumption.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'Compiler translates whole code at once (produces .obj file, faster execution, shows all errors at end). Interpreter executes line by line (slower, stops at first error, no object file).'
  },
  {
    id: 'pl_sq_2',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_2',
    questionNumber: 2,
    questionText: 'Explain the difference between Pre-increment (++x) and Post-increment (x++) operators with a brief code example.',
    marks: 4,
    wordGuideline: '80 - 100 words',
    answerKeyHint: 'Pre-increment increments value first then returns it. Post-increment returns original value first and increments afterwards.'
  },
  {
    id: 'pl_sq_3',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_3',
    questionNumber: 3,
    questionText: 'Compare the While loop and Do-While loop. Why is Do-While called an exit-controlled loop?',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'While checks condition before entering (entry-controlled). Do-while executes body once before checking condition at the end (exit-controlled).'
  },
  {
    id: 'pl_sq_4',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_4',
    questionNumber: 4,
    questionText: 'What is Function Overloading in C++? State two rules for defining overloaded functions.',
    marks: 4,
    wordGuideline: '80 - 100 words',
    answerKeyHint: 'Functions sharing same name but differing in number or types of parameters. Return type alone is insufficient to overload.'
  },
  {
    id: 'pl_sq_5',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_5',
    questionNumber: 5,
    questionText: 'Define a Pointer in C. Write syntax for declaring a pointer to an integer and explain the role of the address-of (&) and dereference (*) operators.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'Pointer stores memory address of another variable. int *ptr = &num; & gets address, * dereferences value.'
  },
  {
    id: 'pl_sq_6',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_6',
    questionNumber: 6,
    questionText: 'Explain the concept of Data Encapsulation in Object-Oriented Programming and how access specifiers enforce it.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'Bundling data and methods together and restricting direct access using private and public specifiers with getter/setter methods.'
  },
  {
    id: 'pl_sq_7',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_6',
    questionNumber: 7,
    questionText: 'What is a Constructor in C++? List three distinct characteristics that distinguish a constructor from a standard member function.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'Special member function invoked upon object creation. Same name as class, no return type (not even void), automatically called.'
  },

  // --- ICT ---
  {
    id: 'ict_sq_1',
    subjectId: 'ict',
    moduleId: 'mod_ict_1',
    questionNumber: 1,
    questionText: 'Describe the Fetch-Decode-Execute machine cycle performed by the CPU.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'Fetch: instruction retrieved from RAM via PC/MAR. Decode: CU interprets instruction opcode. Execute: ALU/registers perform operation and write back.'
  },
  {
    id: 'ict_sq_2',
    subjectId: 'ict',
    moduleId: 'mod_ict_2',
    questionNumber: 2,
    questionText: 'Differentiate between SRAM (Static RAM) and DRAM (Dynamic RAM) in terms of structure, speed, and typical placement.',
    marks: 4,
    wordGuideline: '80 - 100 words',
    answerKeyHint: 'SRAM uses flip-flops, no refresh required, faster and more expensive (used for CPU Cache). DRAM uses capacitor+transistor, needs periodic refreshing, slower, higher density (used for Main RAM).'
  },
  {
    id: 'ict_sq_3',
    subjectId: 'ict',
    moduleId: 'mod_ict_3',
    questionNumber: 3,
    questionText: 'Compare Solid State Drives (SSD) with traditional Hard Disk Drives (HDD) across performance, durability, and cost.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'SSDs use NAND flash, no moving parts, 10x faster read/write, silent, shock-resistant, higher cost per GB. HDDs use spinning magnetic platters, mechanical latency, lower cost per TB.'
  },
  {
    id: 'ict_sq_4',
    subjectId: 'ict',
    moduleId: 'mod_ict_4',
    questionNumber: 4,
    questionText: 'Convert the decimal number 85 into both its Binary and Hexadecimal equivalents showing step-by-step arithmetic.',
    marks: 4,
    wordGuideline: '60 - 100 words with steps',
    answerKeyHint: 'Binary: 85 / 2 = 42 r 1 ... -> 01010101_2. Hexadecimal: 85 / 16 = 5 r 5 -> 55_16.'
  },
  {
    id: 'ict_sq_5',
    subjectId: 'ict',
    moduleId: 'mod_ict_4',
    questionNumber: 5,
    questionText: 'Draw the logic symbol and write the complete truth table for a 2-input XOR (Exclusive OR) gate.',
    marks: 4,
    wordGuideline: 'Symbol description & 4-row truth table',
    answerKeyHint: 'Inputs A,B: (0,0)->0, (0,1)->1, (1,0)->1, (1,1)->0. Output is high only when inputs differ.'
  },
  {
    id: 'ict_sq_6',
    subjectId: 'ict',
    moduleId: 'mod_ict_5',
    questionNumber: 6,
    questionText: 'What is Open-Source Software? How does it differ fundamentally from Proprietary / Commercial software?',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'Open source provides public source code with rights to modify and distribute (Linux, Apache). Proprietary keeps source code closed and restricted under strict user licensing (Windows, MS Office).'
  },
  {
    id: 'ict_sq_7',
    subjectId: 'ict',
    moduleId: 'mod_ict_6',
    questionNumber: 7,
    questionText: 'Define Cloud Computing. Briefly explain the three primary service delivery models: IaaS, PaaS, and SaaS.',
    marks: 4,
    wordGuideline: '100 - 130 words',
    answerKeyHint: 'On-demand delivery of IT resources over internet. IaaS: raw compute/storage (AWS EC2). PaaS: development environments (Google App Engine). SaaS: ready end-user applications (Gmail, Office 365).'
  },

  // --- Operating System ---
  {
    id: 'os_sq_1',
    subjectId: 'os',
    moduleId: 'mod_os_1',
    questionNumber: 1,
    questionText: 'Explain the distinction between User Mode and Kernel Mode in modern processor dual-mode operation.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'User mode has restricted privilege and cannot directly access I/O or kernel memory. Kernel mode has full hardware execution privileges controlled via system call traps.'
  },
  {
    id: 'os_sq_2',
    subjectId: 'os',
    moduleId: 'mod_os_2',
    questionNumber: 2,
    questionText: 'List and explain the five fundamental states in a standard Process Lifecycle (New, Ready, Running, Waiting, Terminated).',
    marks: 4,
    wordGuideline: '90 - 130 words',
    answerKeyHint: 'New: created. Ready: waiting for CPU. Running: instructions executing on CPU. Waiting: blocked waiting for I/O/event. Terminated: finished execution.'
  },
  {
    id: 'os_sq_3',
    subjectId: 'os',
    moduleId: 'mod_os_2',
    questionNumber: 3,
    questionText: 'What is a Context Switch? Why is it considered an unavoidable system overhead?',
    marks: 4,
    wordGuideline: '80 - 110 words',
    answerKeyHint: 'Saving current process PCB state and restoring next process PCB state to share CPU. No useful user work is done during context switch.'
  },
  {
    id: 'os_sq_4',
    subjectId: 'os',
    moduleId: 'mod_os_3',
    questionNumber: 4,
    questionText: 'State the four Coffman conditions that must simultaneously hold for a Deadlock to occur.',
    marks: 4,
    wordGuideline: '80 - 100 words',
    answerKeyHint: '1. Mutual Exclusion. 2. Hold and Wait. 3. No Preemption. 4. Circular Wait.'
  },
  {
    id: 'os_sq_5',
    subjectId: 'os',
    moduleId: 'mod_os_4',
    questionNumber: 5,
    questionText: 'Differentiate between Internal Fragmentation and External Fragmentation in main memory management.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'Internal: wasted space inside fixed allocated partitions/pages. External: total free memory is sufficient but scattered in non-contiguous fragments.'
  },
  {
    id: 'os_sq_6',
    subjectId: 'os',
    moduleId: 'mod_os_5',
    questionNumber: 6,
    questionText: 'Define Virtual Memory and Demand Paging. What sequence occurs when a Page Fault is raised?',
    marks: 4,
    wordGuideline: '90 - 130 words',
    answerKeyHint: 'Virtual memory separates user logical memory from physical RAM. Demand paging loads pages on demand. Page fault: trap to OS, OS finds free frame, loads page from disk, updates page table, restarts instruction.'
  },
  {
    id: 'os_sq_7',
    subjectId: 'os',
    moduleId: 'mod_os_6',
    questionNumber: 7,
    questionText: 'Compare the SCAN (Elevator) disk scheduling algorithm with the C-SCAN (Circular SCAN) algorithm.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'SCAN moves disk arm in one direction servicing requests until edge then reverses. C-SCAN services in one direction, then immediately returns to start without servicing, providing more uniform wait times.'
  },

  // --- MS Office ---
  {
    id: 'mo_sq_1',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_1',
    questionNumber: 1,
    questionText: 'Explain the difference between a Page Break and a Section Break in Microsoft Word. When is a Section Break necessary?',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'Page break starts new page with identical layout. Section break divides document into independent zones allowing different headers/footers, margins, and orientations.'
  },
  {
    id: 'mo_sq_2',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_2',
    questionNumber: 2,
    questionText: 'Describe how to create an automated Table of Contents (TOC) in MS Word using Heading styles.',
    marks: 4,
    wordGuideline: '80 - 110 words',
    answerKeyHint: 'Apply Heading 1, 2, 3 styles from Home ribbon to titles. Go to References -> Table of Contents -> Select automatic style. Word extracts headings with page numbers.'
  },
  {
    id: 'mo_sq_3',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_3',
    questionNumber: 3,
    questionText: 'What is Mail Merge in Microsoft Word? Outline the four key steps required to merge letters with an Excel recipient list.',
    marks: 4,
    wordGuideline: '90 - 130 words',
    answerKeyHint: 'Mass document generation. Steps: 1. Prepare main document. 2. Select recipients from Excel sheet. 3. Insert Merge Fields. 4. Preview and Finish & Merge.'
  },
  {
    id: 'mo_sq_4',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_4',
    questionNumber: 4,
    questionText: 'Explain Relative, Absolute, and Mixed cell referencing in Microsoft Excel using clear syntax examples.',
    marks: 4,
    wordGuideline: '90 - 120 words',
    answerKeyHint: 'Relative (A1) adjusts on copying. Absolute ($A$1) locks both row and column. Mixed ($A1 or A$1) locks only column or row.'
  },
  {
    id: 'mo_sq_5',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_5',
    questionNumber: 5,
    questionText: 'Write the syntax and explain the parameters of the VLOOKUP function in Excel: =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]).',
    marks: 4,
    wordGuideline: '80 - 110 words',
    answerKeyHint: 'lookup_value: search key. table_array: search table range. col_index_num: column number to extract from. range_lookup: FALSE for exact match, TRUE for approximate.'
  },
  {
    id: 'mo_sq_6',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_5',
    questionNumber: 6,
    questionText: 'What is a PivotTable in Excel? State three specific business advantages it offers for data reporting.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'Interactive summary tool. Advantages: instant data grouping/aggregation without writing formulas, multi-dimensional slicing, rapid rearrangement by dragging fields.'
  },
  {
    id: 'mo_sq_7',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_6',
    questionNumber: 7,
    questionText: 'In MS Access, define Primary Key and Foreign Key and explain how they establish referential integrity between two tables.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'Primary key uniquely identifies records in parent table. Foreign key references parent primary key in child table, ensuring no orphaned child records.'
  },

  // --- Computer Networks ---
  {
    id: 'cn_sq_1',
    subjectId: 'networks',
    moduleId: 'mod_cn_1',
    questionNumber: 1,
    questionText: 'Differentiate between Simplex, Half-Duplex, and Full-Duplex communication modes with real-world examples.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'Simplex: unidirectional (Keyboard to CPU, Radio). Half-Duplex: bidirectional one at a time (Walkie-talkie). Full-Duplex: simultaneous bidirectional (Telephone, modern Ethernet).'
  },
  {
    id: 'cn_sq_2',
    subjectId: 'networks',
    moduleId: 'mod_cn_2',
    questionNumber: 2,
    questionText: 'Compare Star Topology and Mesh Topology in terms of cabling cost, fault tolerance, and installation complexity.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'Star: central switch, moderate cable, single point of failure at switch, easy setup. Mesh: point-to-point dedicated links, high cable cost, supreme fault tolerance, complex setup.'
  },
  {
    id: 'cn_sq_3',
    subjectId: 'networks',
    moduleId: 'mod_cn_3',
    questionNumber: 3,
    questionText: 'List all seven layers of the ISO/OSI Model from Layer 1 to Layer 7 and state the core function of the Transport Layer.',
    marks: 4,
    wordGuideline: '80 - 110 words',
    answerKeyHint: '1. Physical, 2. Data Link, 3. Network, 4. Transport, 5. Session, 6. Presentation, 7. Application. Transport provides end-to-end reliability, segmentation, and flow control.'
  },
  {
    id: 'cn_sq_4',
    subjectId: 'networks',
    moduleId: 'mod_cn_4',
    questionNumber: 4,
    questionText: 'Compare TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) in five key operational attributes.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'TCP: connection-oriented, reliable, sequencing, slower, error recovery. UDP: connectionless, unreliable, no sequencing, high speed, best-effort.'
  },
  {
    id: 'cn_sq_5',
    subjectId: 'networks',
    moduleId: 'mod_cn_5',
    questionNumber: 5,
    questionText: 'Given the Class C network IP 192.168.10.0/26, determine: (a) Subnet Mask in dotted decimal, (b) Total subnets, (c) Usable hosts per subnet.',
    marks: 4,
    wordGuideline: 'Calculations with explanation',
    answerKeyHint: '/26 borrows 2 bits: 11000000 = 192. (a) Subnet Mask: 255.255.255.192. (b) Subnets = 2^2 = 4. (c) Usable hosts = 2^6 - 2 = 62 hosts.'
  },
  {
    id: 'cn_sq_6',
    subjectId: 'networks',
    moduleId: 'mod_cn_6',
    questionNumber: 6,
    questionText: 'Explain the working of DHCP (Dynamic Host Configuration Protocol) using the DORA (Discover, Offer, Request, Acknowledge) process.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'D - Discover: client broadcasts to find DHCP server. O - Offer: server offers IP lease. R - Request: client requests the offered IP. A - Acknowledge: server confirms lease.'
  },
  {
    id: 'cn_sq_7',
    subjectId: 'networks',
    moduleId: 'mod_cn_6',
    questionNumber: 7,
    questionText: 'Distinguish between a Layer 2 Switch and a Layer 3 Router regarding their address usage, collision domains, and broadcast domains.',
    marks: 4,
    wordGuideline: '80 - 120 words',
    answerKeyHint: 'Switch: uses MAC addresses, segments collision domains per port, single broadcast domain. Router: uses IP addresses, segments both collision and broadcast domains.'
  }
];

// 1 Long Question per Subject (worth 8 marks each = 8 Marks total)
export const INITIAL_LONG_QUESTIONS: LongQuestion[] = [
  // --- Programming Language ---
  {
    id: 'pl_lq_1',
    subjectId: 'prog_lang',
    moduleId: 'mod_pl_6',
    questionText: 'Write a comprehensive essay on Object-Oriented Programming (OOP) in C++. (a) Explain the four core pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism with practical real-world analogies. (b) Write a complete C++ program demonstrating a base class "Student" (with attributes: rollNo, name, marks) and a derived class "Result" that calculates percentage, assigns grade, and prints student transcript.',
    marks: 8,
    subQuestions: [
      'Detailed explanation of the 4 OOP pillars with real-world analogies (4 Marks)',
      'Complete, syntactically correct C++ inheritance code implementation with main() function and output demonstration (4 Marks)'
    ],
    wordGuideline: '250 - 400 words plus code block',
    answerKeyHint: 'Detailed breakdown of Encapsulation, Abstraction, Inheritance, Polymorphism. Code must have class Student, class Result : public Student, member functions input() and display(), calculation of total/percentage, and working main().'
  },

  // --- ICT ---
  {
    id: 'ict_lq_1',
    subjectId: 'ict',
    moduleId: 'mod_ict_2',
    questionText: 'Provide an exhaustive technical report on the Architecture of a Modern Microcomputer System. (a) Illustrate and explain the internal components of the CPU including Control Unit (CU), Arithmetic Logic Unit (ALU), System Registers (PC, MAR, MDR, IR), and Cache hierarchy (L1, L2, L3). (b) Explain how the three-tier System Bus (Address Bus, Data Bus, Control Bus) synchronizes data transfer between the CPU, RAM, and PCIe peripherals.',
    marks: 8,
    subQuestions: [
      'Internal CPU components, register roles, and multi-level cache operations (4 Marks)',
      'System bus architecture (widths, unidirectionality vs bidirectionality, bottlenecks) (4 Marks)'
    ],
    wordGuideline: '250 - 450 words with architectural breakdown',
    answerKeyHint: 'Thorough description of CU instruction decoding, ALU arithmetic/logic flags, specific register functions (PC, MAR, MDR, IR, Accumulator), L1/L2/L3 cache speeds. Analysis of Address bus (unidirectional), Data bus (bidirectional), and Control bus signals.'
  },

  // --- Operating System ---
  {
    id: 'os_lq_1',
    subjectId: 'os',
    moduleId: 'mod_os_3',
    questionText: 'Provide an in-depth analysis of Concurrency, Process Synchronization, and Deadlock Management in modern Operating Systems. (a) Define the Critical Section Problem and detail the three mandatory criteria for any valid synchronization solution (Mutual Exclusion, Progress, Bounded Waiting). (b) Detail the Banker\'s Algorithm for Deadlock Avoidance: explain the matrices used (Allocation, Max, Available, Need) and demonstrate with a step-by-step example how the OS determines if a system state is Safe or Unsafe.',
    marks: 8,
    subQuestions: [
      'Critical section requirements and Semaphores/Mutex operational mechanics (4 Marks)',
      'Banker\'s Algorithm data structures, safety verification algorithm, and resource-request handling (4 Marks)'
    ],
    wordGuideline: '300 - 500 words with matrix demonstration',
    answerKeyHint: 'Clear definitions of Mutual Exclusion, Progress, Bounded Waiting. Mutex vs counting semaphores. Detailed explanation of Banker\'s algorithm: Need = Max - Allocation, safety test finding a sequence <P1, P3, ...> where Need <= Available.'
  },

  // --- MS Office ---
  {
    id: 'mo_lq_1',
    subjectId: 'msoffice',
    moduleId: 'mod_mo_5',
    questionText: 'Design a Comprehensive Academic Assessment and Payroll Management System using Microsoft Office tools (Word, Excel, and Access). (a) In Microsoft Excel, explain how you would construct a student grading sheet utilizing nested IF statements or XLOOKUP for grade allocation, conditional formatting for failing students, and a dynamic PivotTable to summarize campus-wide pass percentages. (b) Explain the step-by-step procedure to link this Excel database to Microsoft Word to automatically generate and print official, secured DIT Examination Result Cards via Mail Merge.',
    marks: 8,
    subQuestions: [
      'Excel formula design, cell referencing, VLOOKUP/XLOOKUP syntax, conditional formatting, and PivotTable configuration (4 Marks)',
      'Word Mail Merge integration, field binding, document layout formatting, and printing distribution (4 Marks)'
    ],
    wordGuideline: '250 - 450 words with practical workflow steps',
    answerKeyHint: 'Detailed Excel formulas for total marks, percentage = (Obtained/Total)*100, nested IF formula for grades (>=80 A+, >=70 A, etc.), PivotTable setup. Complete 6-step Mail Merge process from recipient connection to merging individual cards.'
  },

  // --- Computer Networks ---
  {
    id: 'cn_lq_1',
    subjectId: 'networks',
    moduleId: 'mod_cn_5',
    questionText: 'Architect a secure, scalable Campus Local Area Network (LAN) for Superior College across 3 academic blocks. (a) Design a complete IPv4 Subnetting Scheme starting from network 192.168.100.0/24 to allocate subnets for Block A (60 hosts), Block B (30 hosts), and Server Room (12 hosts), specifying Subnet Address, Subnet Mask, Usable Host Range, and Broadcast Address for each subnet. (b) Select appropriate network hardware (Core/Distribution switches, Routers, Cat6 vs Fiber cables) and detail network security controls including VLANs, Firewalls, and Access Control Lists (ACLs).',
    marks: 8,
    subQuestions: [
      'VLSM IPv4 Subnetting table calculations with step-by-step host capacity derivation (4 Marks)',
      'Hardware topology design, cabling media choices, and network security isolation strategy (4 Marks)'
    ],
    wordGuideline: '300 - 500 words with structured subnetting table',
    answerKeyHint: 'VLSM calculations: Subnet 1 for 60 hosts (/26, mask 255.255.255.192, range 192.168.100.1-62). Subnet 2 for 30 hosts (/27, mask 255.255.255.224, range 192.168.100.65-94). Subnet 3 for 12 hosts (/28, mask 255.255.255.240, range 192.168.100.97-110). Topology with fiber backbone, distribution switches, VLAN segmentation, and perimeter firewall.'
  }
];

// Seed exams for each subject, strictly totaling 75 marks:
// Section A: 39 MCQs = 39 marks
// Section B: 7 Short Questions = 28 marks
// Section C: 1 Long Question = 8 marks
export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'exam_pl_2024',
    title: 'DIT Annual Exam 2024 – Programming Language',
    examCode: 'DIT-PL-75M',
    subjectId: 'prog_lang',
    subjectName: 'Programming Language',
    durationMinutes: 90,
    totalMarks: 75,
    passingMarks: 30,
    sectionAMarks: 39,
    sectionBMarks: 28,
    sectionCMarks: 8,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2026-12-31T23:59:59Z',
    isActive: true,
    instructions: [
      'Total time allowed is 90 minutes. Total maximum marks: 75.',
      'Section A carries 39 Multiple-Choice Questions (1 mark each = 39 Marks). Select options on screen; answers autosave continuously.',
      'Section B consists of 7 Short Questions (4 marks each = 28 Marks). Write concise answers.',
      'Section C consists of 1 Long Question (8 Marks). Write a comprehensive, well-structured answer.',
      'For Section B and C, download the official Superior College Word Answer Sheet (.docx), type your answers, and upload the completed file before clicking Final Submit.',
      'Alternatively, you may type your written answers in the provided built-in Rich-Text editor.',
      'Once submitted, Section A MCQs are automatically marked instantly. Section B and C answers will be marked by the examiner.'
    ],
    mcqIds: INITIAL_MCQS.filter(m => m.subjectId === 'prog_lang').map(m => m.id),
    shortQuestionIds: INITIAL_SHORT_QUESTIONS.filter(s => s.subjectId === 'prog_lang').map(s => s.id),
    longQuestionId: 'pl_lq_1'
  },
  {
    id: 'exam_ict_2024',
    title: 'DIT Annual Exam 2024 – Information & Communication Technology (ICT)',
    examCode: 'DIT-ICT-75M',
    subjectId: 'ict',
    subjectName: 'Information and Communication Technology (ICT)',
    durationMinutes: 90,
    totalMarks: 75,
    passingMarks: 30,
    sectionAMarks: 39,
    sectionBMarks: 28,
    sectionCMarks: 8,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2026-12-31T23:59:59Z',
    isActive: true,
    instructions: [
      'Total time allowed is 90 minutes. Total maximum marks: 75.',
      'Section A carries 39 Multiple-Choice Questions (39 Marks).',
      'Section B carries 7 Short Questions (4 marks each = 28 Marks).',
      'Section C carries 1 Long Question (8 Marks).',
      'Download the official .docx answer sheet template, type your responses in Microsoft Word, and upload the file prior to submission.',
      'Section A MCQs are graded automatically and immediately upon submission.'
    ],
    mcqIds: INITIAL_MCQS.filter(m => m.subjectId === 'ict').map(m => m.id),
    shortQuestionIds: INITIAL_SHORT_QUESTIONS.filter(s => s.subjectId === 'ict').map(s => s.id),
    longQuestionId: 'ict_lq_1'
  },
  {
    id: 'exam_os_2024',
    title: 'DIT Annual Exam 2024 – Operating System',
    examCode: 'DIT-OS-75M',
    subjectId: 'os',
    subjectName: 'Operating System',
    durationMinutes: 90,
    totalMarks: 75,
    passingMarks: 30,
    sectionAMarks: 39,
    sectionBMarks: 28,
    sectionCMarks: 8,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2026-12-31T23:59:59Z',
    isActive: true,
    instructions: [
      'Total time allowed is 90 minutes. Total marks: 75.',
      'Section A (MCQs): 39 questions, 39 marks.',
      'Section B (Short Questions): 7 questions, 28 marks.',
      'Section C (Long Question): 1 question, 8 marks.',
      'Use the MS Word template to complete your Section B and C answers.'
    ],
    mcqIds: INITIAL_MCQS.filter(m => m.subjectId === 'os').map(m => m.id),
    shortQuestionIds: INITIAL_SHORT_QUESTIONS.filter(s => s.subjectId === 'os').map(s => s.id),
    longQuestionId: 'os_lq_1'
  },
  {
    id: 'exam_mo_2024',
    title: 'DIT Annual Exam 2024 – MS Office Productivity Suite',
    examCode: 'DIT-MO-75M',
    subjectId: 'msoffice',
    subjectName: 'MS Office',
    durationMinutes: 90,
    totalMarks: 75,
    passingMarks: 30,
    sectionAMarks: 39,
    sectionBMarks: 28,
    sectionCMarks: 8,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2026-12-31T23:59:59Z',
    isActive: true,
    instructions: [
      'Total time allowed is 90 minutes. Total marks: 75.',
      'Section A: 39 MCQs covering Word, Excel, PowerPoint, Access (39 Marks).',
      'Section B: 7 Practical Short Questions (28 Marks).',
      'Section C: 1 Comprehensive Scenario Long Question (8 Marks).'
    ],
    mcqIds: INITIAL_MCQS.filter(m => m.subjectId === 'msoffice').map(m => m.id),
    shortQuestionIds: INITIAL_SHORT_QUESTIONS.filter(s => s.subjectId === 'msoffice').map(s => s.id),
    longQuestionId: 'mo_lq_1'
  },
  {
    id: 'exam_cn_2024',
    title: 'DIT Annual Exam 2024 – Computer Networks',
    examCode: 'DIT-CN-75M',
    subjectId: 'networks',
    subjectName: 'Computer Networks',
    durationMinutes: 90,
    totalMarks: 75,
    passingMarks: 30,
    sectionAMarks: 39,
    sectionBMarks: 28,
    sectionCMarks: 8,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2026-12-31T23:59:59Z',
    instructions: [
      'Total time allowed: 90 minutes. Total marks: 75.',
      'Section A: 39 MCQs on OSI, TCP/IP, Subnetting, Media, Protocols (39 Marks).',
      'Section B: 7 Short Questions (28 Marks).',
      'Section C: 1 Campus Network Architectural Design Question (8 Marks).'
    ],
    isActive: true,
    mcqIds: INITIAL_MCQS.filter(m => m.subjectId === 'networks').map(m => m.id),
    shortQuestionIds: INITIAL_SHORT_QUESTIONS.filter(s => s.subjectId === 'networks').map(s => s.id),
    longQuestionId: 'cn_lq_1'
  }
];
