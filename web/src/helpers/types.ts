export type User = {
  role: "member" | "administrator" | "liberian";
  name: string;
  id: string;
};

export type Book = {
  title: string;
  id: string;
  isbn: string;
  author: string;
  createdAt: string;
  lastModified: string;
  publicationDate: string;
  copies: number;
};

export type History = {
  id: string;
  lastModified: Date;
  createdAt: Date;
  borrowedBy: string;
  approved: boolean;
  bookBorrowed: string;
  BorrowedBy?: { name: string };
  BookBorrowed?: { title: string; isbn: true };
};
