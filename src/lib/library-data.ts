
export interface Book {
  id: string;
  title: string;
  file: string;
  grade: string;
  type: "PB" | "TG";
  subject: string;
}

export const LIBRARY_BOOKS: Book[] = [
  // P1
  { id: "p1-math-pb", title: "P1 Mathematics PB", file: "/library/P1 revised Pupils Books  and Teachers Guides 2025-20260511/PB/P1 Mathematics PB.pdf", grade: "P1", type: "PB", subject: "Mathematics" },
  { id: "p1-english-pb", title: "P1 English PB", file: "/library/P1 revised Pupils Books  and Teachers Guides 2025-20260511/PB/P1-English-PB.pdf", grade: "P1", type: "PB", subject: "English" },
  { id: "p1-french-pb", title: "P1 French PB", file: "/library/P1 revised Pupils Books  and Teachers Guides 2025-20260511/PB/P1-French-PB (1).pdf", grade: "P1", type: "PB", subject: "French" },
  { id: "p1-set-pb", title: "P1 SET PB", file: "/library/P1 revised Pupils Books  and Teachers Guides 2025-20260511/PB/P1-SET-PB.pdf", grade: "P1", type: "PB", subject: "SET" },
  
  // P2
  { id: "p2-math-pb", title: "P2 Mathematics PB", file: "/library/P2 revised Pupils books B and Teachers Guides  2025-20260511/PB/P2-Mathematics-PB.pdf", grade: "P2", type: "PB", subject: "Mathematics" },
  { id: "p2-english-pb", title: "P2 English PB", file: "/library/P2 revised Pupils books B and Teachers Guides  2025-20260511/PB/P2-English-PB.pdf", grade: "P2", type: "PB", subject: "English" },
  { id: "p2-set-pb", title: "P2 SET PB", file: "/library/P2 revised Pupils books B and Teachers Guides  2025-20260511/PB/P2-SET-PB.pdf", grade: "P2", type: "PB", subject: "SET" },
  
  // P3
  { id: "p3-math-pb", title: "P3 Mathematics PB", file: "/library/P3 revised Pupils Books  and Teachers Guides 2025-20260511/PB/P3 Mathematics PB.pdf", grade: "P3", type: "PB", subject: "Mathematics" },
  { id: "p3-english-pb", title: "P3 English PB", file: "/library/P3 revised Pupils Books  and Teachers Guides 2025-20260511/PB/P3-English-PB.pdf", grade: "P3", type: "PB", subject: "English" },

  // P4
  { id: "p4-math-pb", title: "P4 Mathematics PB", file: "/library/P4 revised Pupils Books  and Teachers Guides  2025-20260511/PB/P4 Mathematics PB.pdf", grade: "P4", type: "PB", subject: "Mathematics" },
  { id: "p4-english-pb", title: "P4 English PB", file: "/library/P4 revised Pupils Books  and Teachers Guides  2025-20260511/PB/P4-ENGLISH-PB.pdf", grade: "P4", type: "PB", subject: "English" },

  // P5
  { id: "p5-math-pb", title: "P5 Mathematics PB", file: "/library/P5 revised  Pupils Books  and Teachers Guides  2025-20260511/PB/P5-Mathematics-PB.pdf", grade: "P5", type: "PB", subject: "Mathematics" },
  { id: "p5-english-pb", title: "P5 English PB", file: "/library/P5 revised  Pupils Books  and Teachers Guides  2025-20260511/PB/P5-ENGLISH-PB.pdf", grade: "P5", type: "PB", subject: "English" },

  // P6
  { id: "p6-math-pb", title: "P6 Mathematics PB", file: "/library/P6 revised Pupils Books and Teachers Guides 2025-20260511/PB/P6 Mathematics PB.pdf", grade: "P6", type: "PB", subject: "Mathematics" },
  { id: "p6-english-pb", title: "P6 English PB", file: "/library/P6 revised Pupils Books and Teachers Guides 2025-20260511/PB/P6-ENGLISH-PB.pdf", grade: "P6", type: "PB", subject: "English" },

  // Teachers Guides (Expansion)
  { id: "p1-math-tg", title: "P1 Mathematics TG", file: "/library/P1 revised Pupils Books  and Teachers Guides 2025-20260511/TG/P1 Mathematics TG.pdf", grade: "P1", type: "TG", subject: "Mathematics" },
  { id: "p2-math-tg", title: "P2 Mathematics TG", file: "/library/P2 revised Pupils books B and Teachers Guides  2025-20260511/TG/P2 Mathematics TG.pdf", grade: "P2", type: "TG", subject: "Mathematics" },
  { id: "p3-math-tg", title: "P3 Mathematics TG", file: "/library/P3 revised Pupils Books  and Teachers Guides 2025-20260511/TG/P3 Mathematics TG.pdf", grade: "P3", type: "TG", subject: "Mathematics" },
  { id: "p6-math-tg", title: "P6 Mathematics TG", file: "/library/P6 revised Pupils Books and Teachers Guides 2025-20260511/TG/P6 Mathematics TG.pdf", grade: "P6", type: "TG", subject: "Mathematics" },
];

export const getBooksByGrade = (grade: string) => LIBRARY_BOOKS.filter(b => b.grade === grade && b.type === "PB");
export const getTeachersGuides = () => LIBRARY_BOOKS.filter(b => b.type === "TG");
