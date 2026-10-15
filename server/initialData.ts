import { Subject, MCQQuestion, ShortQuestion, LongQuestion, Exam, User } from '../src/types';

export const INITIAL_USERS: User[] = [
  {
    id: 'admin_1',
    name: 'Prof. Dr. Tariq Mahmood',
    email: 'admin@superior.edu.pk',
    role: 'admin',
    createdAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'student_1',
    name: 'Muhammad Ali Raza',
    email: 'ali.raza@superior.edu.pk',
    role: 'student',
    rollNo: 'DIT-2024-042',
    collegeName: 'Superior College of Commerce & IT, Lahore',
    session: '2023-2025',
    phone: '+92 301 4567890',
    createdAt: '2024-02-15T10:00:00Z',
  },
  {
    id: 'student_2',
    name: 'Fatima Zahra',
    email: 'fatima.zahra@superior.edu.pk',
    role: 'student',
    rollNo: 'DIT-2024-089',
    collegeName: 'Superior College, Faisalabad Campus',
    session: '2023-2025',
    phone: '+92 302 9876543',
    createdAt: '2024-02-16T11:00:00Z',
  },
  {
    id: 'student_3',
    name: 'Hamza Bilal',
    email: 'hamza.bilal@superior.edu.pk',
    role: 'student',
    rollNo: 'DIT-2024-115',
    collegeName: 'Superior College, Multan Campus',
    session: '2023-2025',
    phone: '+92 303 5551234',
    createdAt: '2024-02-17T09:30:00Z',
  }
];

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'prog_lang',
    code: 'DIT-101',
    name: 'Programming Language',
    description: 'Comprehensive coverage of C, C++, Algorithms, Control Structures, Functions, Arrays, Pointers, and OOP.',
    totalModules: 6,
    modules: [
      {
        id: 'mod_pl_1',
        code: 'MOD-PL-01',
        title: 'Introduction to Programming & Problem Solving',
        description: 'Algorithms, Flowcharts, Pseudocode, Compilers, Interpreters, and IDEs.',
        chapters: [
          {
            id: 'ch_pl_1',
            title: 'Algorithm Design & Flowcharting',
            topics: [
              { id: 'top_pl_1', title: 'Flowchart Symbols & Logic Structure' },
              { id: 'top_pl_2', title: 'Translators: Compilers vs Interpreters vs Assemblers' }
            ]
          }
        ]
      },
      {
        id: 'mod_pl_2',
        code: 'MOD-PL-02',
        title: 'Fundamentals of C & C++ Syntax',
        description: 'Data types, Variables, Constants, Operators, Expressions, and Input/Output.',
        chapters: [
          {
            id: 'ch_pl_2',
            title: 'Data Representation & Expressions',
            topics: [
              { id: 'top_pl_3', title: 'Primitive Data Types and Memory Sizing' },
              { id: 'top_pl_4', title: 'Arithmetic, Relational & Logical Operators' }
            ]
          }
        ]
      },
      {
        id: 'mod_pl_3',
        code: 'MOD-PL-03',
        title: 'Control Structures & Decision Making',
        description: 'Conditional statements (if-else, nested if, switch) and Looping constructs (for, while, do-while).',
        chapters: [
          {
            id: 'ch_pl_3',
            title: 'Branching and Iteration',
            topics: [
              { id: 'top_pl_5', title: 'Nested If-Else and Switch-Case Selection' },
              { id: 'top_pl_6', title: 'Loop Control: break, continue, and infinite loops' }
            ]
          }
        ]
      },
      {
        id: 'mod_pl_4',
        code: 'MOD-PL-04',
        title: 'Functions & Modular Architecture',
        description: 'Function definition, declaration, parameters, pass by value vs reference, and recursion.',
        chapters: [
          {
            id: 'ch_pl_4',
            title: 'Modular Code Design',
            topics: [
              { id: 'top_pl_7', title: 'Variable Scope: Local, Global, and Static' },
              { id: 'top_pl_8', title: 'Recursive Functions & Stack Execution' }
            ]
          }
        ]
      },
      {
        id: 'mod_pl_5',
        code: 'MOD-PL-05',
        title: 'Arrays, Strings & Pointers',
        description: 'One-dimensional and multi-dimensional arrays, string handling functions, pointer arithmetic, memory addressing.',
        chapters: [
          {
            id: 'ch_pl_5',
            title: 'Linear Data & Pointers',
            topics: [
              { id: 'top_pl_9', title: '2D Arrays and Matrix Processing' },
              { id: 'top_pl_10', title: 'Pointer Basics, Dereferencing, and Dynamic Allocation' }
            ]
          }
        ]
      },
      {
        id: 'mod_pl_6',
        code: 'MOD-PL-06',
        title: 'Object-Oriented Programming (OOP) & File Handling',
        description: 'Classes, Objects, Constructors, Encapsulation, Inheritance, Polymorphism, and File Streams.',
        chapters: [
          {
            id: 'ch_pl_6',
            title: 'OOP Principles and I/O Streams',
            topics: [
              { id: 'top_pl_11', title: 'Constructors, Destructors, and Access Specifiers' },
              { id: 'top_pl_12', title: 'Single & Multiple Inheritance, Virtual Functions' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ict',
    code: 'DIT-102',
    name: 'Information and Communication Technology (ICT)',
    description: 'Fundamental computer hardware, digital representation, system architecture, software categories, cloud computing, and cybersecurity.',
    totalModules: 6,
    modules: [
      {
        id: 'mod_ict_1',
        code: 'MOD-ICT-01',
        title: 'Computer Evolution & Von Neumann Architecture',
        description: 'Computer generations, classifications, block diagram of a computer system, and execution cycle.',
        chapters: [
          {
            id: 'ch_ict_1',
            title: 'System Foundations',
            topics: [
              { id: 'top_ict_1', title: 'Fetch-Decode-Execute Cycle & Bus Structures' },
              { id: 'top_ict_2', title: 'Classification: Micro, Mini, Mainframe, Supercomputer' }
            ]
          }
        ]
      },
      {
        id: 'mod_ict_2',
        code: 'MOD-ICT-02',
        title: 'Central Processing Unit & Motherboard Components',
        description: 'Arithmetic Logic Unit (ALU), Control Unit (CU), Registers, Cache hierarchy, Clock speed, and Chipset.',
        chapters: [
          {
            id: 'ch_ict_2',
            title: 'Processing Hardware',
            topics: [
              { id: 'top_ict_3', title: 'Internal CPU Registers (PC, MAR, MDR, IR)' },
              { id: 'top_ict_4', title: 'Expansion Slots: PCIe, RAM channels, and CMOS battery' }
            ]
          }
        ]
      },
      {
        id: 'mod_ict_3',
        code: 'MOD-ICT-03',
        title: 'Memory & Storage Systems',
        description: 'Primary memory (SRAM vs DRAM, ROM types), Secondary storage (HDD, NVMe SSD, Optical, Flash storage).',
        chapters: [
          {
            id: 'ch_ict_3',
            title: 'Memory Hierarchies',
            topics: [
              { id: 'top_ict_5', title: 'Volatile vs Non-Volatile Storage' },
              { id: 'top_ict_6', title: 'Solid State Drives (SSD) vs Hard Disk Drives (HDD)' }
            ]
          }
        ]
      },
      {
        id: 'mod_ict_4',
        code: 'MOD-ICT-04',
        title: 'Digital Representation & Number Systems',
        description: 'Binary, Octal, Decimal, Hexadecimal conversions, Two’s complement, and ASCII/Unicode encoding.',
        chapters: [
          {
            id: 'ch_ict_4',
            title: 'Number Bases & Boolean Logic',
            topics: [
              { id: 'top_ict_7', title: 'Base Conversions & Binary Arithmetic' },
              { id: 'top_ict_8', title: 'Logic Gates (AND, OR, NOT, NAND, NOR, XOR)' }
            ]
          }
        ]
      },
      {
        id: 'mod_ict_5',
        code: 'MOD-ICT-05',
        title: 'Software Systems & Operating Environments',
        description: 'System software vs Application software, Device drivers, Firmware, Utility programs, and Open-Source licenses.',
        chapters: [
          {
            id: 'ch_ict_5',
            title: 'Software Ecosystem',
            topics: [
              { id: 'top_ict_9', title: 'OS Roles, Compilers vs Assemblers' },
              { id: 'top_ict_10', title: 'Freeware, Shareware, Open Source, and Proprietary Licensing' }
            ]
          }
        ]
      },
      {
        id: 'mod_ict_6',
        code: 'MOD-ICT-06',
        title: 'Cybersecurity, Cloud & Digital Ethics',
        description: 'Malware classifications, Firewalls, Phishing, Encryption, Cloud delivery models (IaaS, PaaS, SaaS), and Intellectual Property Rights.',
        chapters: [
          {
            id: 'ch_ict_6',
            title: 'Security and Cloud',
            topics: [
              { id: 'top_ict_11', title: 'Viruses, Trojans, Ransomware, and Prevention' },
              { id: 'top_ict_12', title: 'Public, Private, and Hybrid Cloud Computing' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'os',
    code: 'DIT-103',
    name: 'Operating System',
    description: 'Operating system principles, kernel structure, process scheduling, synchronization, deadlocks, memory management, and file systems.',
    totalModules: 6,
    modules: [
      {
        id: 'mod_os_1',
        code: 'MOD-OS-01',
        title: 'Operating System Architecture & System Calls',
        description: 'Kernel types, Monolithic vs Microkernel, Dual-mode operation (User vs Kernel mode), System Call interface.',
        chapters: [
          {
            id: 'ch_os_1',
            title: 'OS Structure',
            topics: [
              { id: 'top_os_1', title: 'User Mode vs Kernel Mode Trap Handlers' },
              { id: 'top_os_2', title: 'Monolithic vs Microkernel vs Hybrid Design' }
            ]
          }
        ]
      },
      {
        id: 'mod_os_2',
        code: 'MOD-OS-02',
        title: 'Process Management & CPU Scheduling',
        description: 'Process State transitions, PCB, Context Switching, Preemptive vs Non-preemptive Scheduling (FCFS, SJF, Round Robin, Priority).',
        chapters: [
          {
            id: 'ch_os_2',
            title: 'Process Scheduling Algorithms',
            topics: [
              { id: 'top_os_3', title: 'Process Control Block (PCB) Attributes' },
              { id: 'top_os_4', title: 'Round Robin Quantum Tuning and Gantt Charts' }
            ]
          }
        ]
      },
      {
        id: 'mod_os_3',
        code: 'MOD-OS-03',
        title: 'Synchronization & Deadlocks',
        description: 'Critical Section Problem, Race Conditions, Semaphores, Mutex Locks, Deadlock Characterization (Coffman conditions), Banker’s Algorithm.',
        chapters: [
          {
            id: 'ch_os_3',
            title: 'Concurrency & Deadlock Prevention',
            topics: [
              { id: 'top_os_5', title: 'Peterson’s Solution & Counting vs Binary Semaphores' },
              { id: 'top_os_6', title: 'Four Necessary Deadlock Conditions & Resource Allocation Graphs' }
            ]
          }
        ]
      },
      {
        id: 'mod_os_4',
        code: 'MOD-OS-04',
        title: 'Memory Management & Paging',
        description: 'Logical vs Physical Address Space, Contiguous Memory Allocation, Fragmentation (Internal vs External), Paging, Page Tables, TLB.',
        chapters: [
          {
            id: 'ch_os_4',
            title: 'Address Translation & Paging',
            topics: [
              { id: 'top_os_7', title: 'Translation Lookaside Buffer (TLB) Hit Ratio' },
              { id: 'top_os_8', title: 'Segmentation vs Paging Mechanisms' }
            ]
          }
        ]
      },
      {
        id: 'mod_os_5',
        code: 'MOD-OS-05',
        title: 'Virtual Memory & Page Replacement',
        description: 'Demand Paging, Page Faults, Thrashing, Page Replacement Policies (FIFO, LRU, Optimal), Working Set Model.',
        chapters: [
          {
            id: 'ch_os_5',
            title: 'Virtual Memory Performance',
            topics: [
              { id: 'top_os_9', title: 'Bélády’s Anomaly in FIFO Replacement' },
              { id: 'top_os_10', title: 'Least Recently Used (LRU) Stack Implementation' }
            ]
          }
        ]
      },
      {
        id: 'mod_os_6',
        code: 'MOD-OS-06',
        title: 'File Systems & Storage Management',
        description: 'File concepts, Directory hierarchies, File Allocation (Contiguous, Linked, Indexed), Disk Scheduling (FCFS, SSTF, SCAN, C-SCAN).',
        chapters: [
          {
            id: 'ch_os_6',
            title: 'Disk Architecture & File Systems',
            topics: [
              { id: 'top_os_11', title: 'Indexed File Allocation & Inodes' },
              { id: 'top_os_12', title: 'SCAN (Elevator) and C-LOOK Disk Scheduling' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'msoffice',
    code: 'DIT-104',
    name: 'MS Office',
    description: 'Microsoft Word, Microsoft Excel, Microsoft PowerPoint, and Microsoft Access for professional productivity, automation, and data handling.',
    totalModules: 6,
    modules: [
      {
        id: 'mod_mo_1',
        code: 'MOD-MO-01',
        title: 'Microsoft Word Document Formatting & Typography',
        description: 'Ribbon navigation, Styles, Page setups, Margins, Breaks, Columns, Drop caps, and Document themes.',
        chapters: [
          {
            id: 'ch_mo_1',
            title: 'Document Layouts',
            topics: [
              { id: 'top_mo_1', title: 'Section Breaks vs Page Breaks' },
              { id: 'top_mo_2', title: 'Custom Styles & Paragraph Alignment Rules' }
            ]
          }
        ]
      },
      {
        id: 'mod_mo_2',
        code: 'MOD-MO-02',
        title: 'Word Tables, References & Automated Tables of Contents',
        description: 'Table designs, Formulas in tables, Captions, Footnotes, Endnotes, Citations, and Automatic TOC generation.',
        chapters: [
          {
            id: 'ch_mo_2',
            title: 'Academic & Formal Reports',
            topics: [
              { id: 'top_mo_3', title: 'Heading Styles and Automatic TOC Mapping' },
              { id: 'top_mo_4', title: 'Footnotes vs Endnotes in Technical Reports' }
            ]
          }
        ]
      },
      {
        id: 'mod_mo_3',
        code: 'MOD-MO-03',
        title: 'Mail Merge & Document Collaboration',
        description: 'Mail Merge Wizard, Data source connection (Excel/Access), Merge fields, Labels, Envelopes, Track Changes, Comments.',
        chapters: [
          {
            id: 'ch_mo_3',
            title: 'Mass Communication & Reviewing',
            topics: [
              { id: 'top_mo_5', title: 'Linking Excel Sheets as Mail Merge Data Sources' },
              { id: 'top_mo_6', title: 'Track Changes, Comparing Documents, and Protection' }
            ]
          }
        ]
      },
      {
        id: 'mod_mo_4',
        code: 'MOD-MO-04',
        title: 'Microsoft Excel Cell Referencing & Essential Formulas',
        description: 'Workbook structure, Relative, Absolute ($A$1), and Mixed referencing, Mathematical, Statistical, and Text functions.',
        chapters: [
          {
            id: 'ch_mo_4',
            title: 'Formula Fundamentals',
            topics: [
              { id: 'top_mo_7', title: 'Relative vs Absolute ($A$1) Cell Addressing' },
              { id: 'top_mo_8', title: 'SUM, AVERAGE, MIN, MAX, CONCATENATE, and LEN' }
            ]
          }
        ]
      },
      {
        id: 'mod_mo_5',
        code: 'MOD-MO-05',
        title: 'Advanced Excel Functions, Charts & PivotTables',
        description: 'Logical IF, Nested IF, VLOOKUP, HLOOKUP, XLOOKUP, COUNTIF, SUMIF, Data Validation, PivotTables, and Dynamic Charts.',
        chapters: [
          {
            id: 'ch_mo_5',
            title: 'Business Analysis in Excel',
            topics: [
              { id: 'top_mo_9', title: 'VLOOKUP vs XLOOKUP Syntax & Exact Matching' },
              { id: 'top_mo_10', title: 'PivotTables, Calculated Fields, and Slicers' }
            ]
          }
        ]
      },
      {
        id: 'mod_mo_6',
        code: 'MOD-MO-06',
        title: 'PowerPoint Presentations & MS Access Relational Databases',
        description: 'Slide Masters, Animations, Transitions, Presentation delivery; Access Tables, Primary Keys, Relationships, Queries, and Forms.',
        chapters: [
          {
            id: 'ch_mo_6',
            title: 'Presentations & Relational Databases',
            topics: [
              { id: 'top_mo_11', title: 'Slide Master Customization & Action Buttons' },
              { id: 'top_mo_12', title: 'Primary Key, Foreign Key, and Select Queries in Access' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'networks',
    code: 'DIT-105',
    name: 'Computer Networks',
    description: 'Data communication, network architectures, OSI model, TCP/IP protocol suite, IP addressing, subnetting, routing, switching, and security.',
    totalModules: 6,
    modules: [
      {
        id: 'mod_cn_1',
        code: 'MOD-CN-01',
        title: 'Data Communication & Network Fundamentals',
        description: 'Components of data communication, Transmission modes (Simplex, Half-Duplex, Full-Duplex), LAN, MAN, WAN, PAN.',
        chapters: [
          {
            id: 'ch_cn_1',
            title: 'Basics of Networking',
            topics: [
              { id: 'top_cn_1', title: 'Data Transmission Modes & Bandwidth Concepts' },
              { id: 'top_cn_2', title: 'Network Scopes: LAN vs MAN vs WAN' }
            ]
          }
        ]
      },
      {
        id: 'mod_cn_2',
        code: 'MOD-CN-02',
        title: 'Network Topologies & Transmission Media',
        description: 'Star, Bus, Ring, Mesh, Tree, and Hybrid topologies; Guided media (UTP, STP, Coaxial, Fiber Optic) and Unguided (Radio, Microwave, Infrared).',
        chapters: [
          {
            id: 'ch_cn_2',
            title: 'Physical Topology & Cables',
            topics: [
              { id: 'top_cn_3', title: 'Mesh vs Star Topology Fault Tolerance' },
              { id: 'top_cn_4', title: 'Single-mode vs Multi-mode Fiber Optic Cables' }
            ]
          }
        ]
      },
      {
        id: 'mod_cn_3',
        code: 'MOD-CN-03',
        title: 'OSI 7-Layer Reference Model',
        description: 'Physical, Data Link, Network, Transport, Session, Presentation, Application layers; Encapsulation and Decapsulation.',
        chapters: [
          {
            id: 'ch_cn_3',
            title: 'The OSI Architecture',
            topics: [
              { id: 'top_cn_5', title: 'Functions of Data Link (MAC, Framing, CRC)' },
              { id: 'top_cn_6', title: 'Transport Layer End-to-End Reliability' }
            ]
          }
        ]
      },
      {
        id: 'mod_cn_4',
        code: 'MOD-CN-04',
        title: 'TCP/IP Protocol Suite & Transport Layer',
        description: 'TCP vs UDP, 3-Way Handshake, Port Numbers, Windowing, Flow Control, and Error Correction.',
        chapters: [
          {
            id: 'ch_cn_4',
            title: 'Transport Protocols',
            topics: [
              { id: 'top_cn_7', title: 'TCP Connection Establishment (SYN, SYN-ACK, ACK)' },
              { id: 'top_cn_8', title: 'Connectionless UDP vs Connection-Oriented TCP' }
            ]
          }
        ]
      },
      {
        id: 'mod_cn_5',
        code: 'MOD-CN-05',
        title: 'IPv4 Addressing, Subnetting & CIDR',
        description: 'Classful IP addressing (Classes A, B, C, D, E), Subnet Masks, CIDR notation, Network ID, Broadcast ID, and Subnetting calculations.',
        chapters: [
          {
            id: 'ch_cn_5',
            title: 'IP Addressing Mechanics',
            topics: [
              { id: 'top_cn_9', title: 'Default Subnet Masks for Class A, B, and C' },
              { id: 'top_cn_10', title: 'Calculating Subnets and Usable Host Ranges' }
            ]
          }
        ]
      },
      {
        id: 'mod_cn_6',
        code: 'MOD-CN-06',
        title: 'Network Devices, Protocols & Network Security',
        description: 'Hubs, Switches (Layer 2), Routers (Layer 3), Gateways, DHCP, DNS, HTTP/HTTPS, FTP, ARP, Firewalls, and VPNs.',
        chapters: [
          {
            id: 'ch_cn_6',
            title: 'Hardware & Application Services',
            topics: [
              { id: 'top_cn_11', title: 'Collision Domains vs Broadcast Domains (Hub vs Switch vs Router)' },
              { id: 'top_cn_12', title: 'DNS Resolution Process and DHCP Lease Allocation' }
            ]
          }
        ]
      }
    ]
  }
];
