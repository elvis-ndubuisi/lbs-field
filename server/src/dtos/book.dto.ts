import { z } from "zod";

export const addBookSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Book name is required" }),
    author: z.string({ required_error: "Book author is required" }),
    genre: z.string({ required_error: "Genre ID is required" }),
    copies: z.number({ required_error: "Available copies are required" }),
  }),
});
export type AddBookType = z.TypeOf<typeof addBookSchema>["body"];

export const bookSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Book ID is required" }),
  }),
});
export type BookSchema = z.TypeOf<typeof bookSchema>["params"];

export const addGenre = z.object({
  body: z.object({
    title: z.string({ required_error: "Genre title is required" }),
  }),
});
export type AddGenre = z.TypeOf<typeof addGenre>["body"];
