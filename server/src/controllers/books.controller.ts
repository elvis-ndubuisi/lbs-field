import { Response, Request } from "express";
import prisma from "../utils/prisma";
import { SignedUser } from "../utils/types";
import { AddBookType, AddGenre, BookSchema } from "../dtos/book.dto";
import { generateRandomISBN } from "../utils/genIsbn";

async function addGenre(req: Request, res: Response) {
  const body = req.body as AddGenre;
  try {
    await prisma.genre.create({ data: { title: body.title } });
    return res.sendStatus(201);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to process request.", name: "", data: {} });
  }
}

async function getGenre(req: Request, res: Response) {
  try {
    const genre = await prisma.genre.findMany({});
    return res.json(genre);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to process request.", name: "", data: {} });
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const books = await prisma.book.findMany({});
    return res.json(books);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to process request.", name: "", data: {} });
  }
}

async function getOne(req: Request, res: Response) {
  const params = req.params as BookSchema;
  try {
    const book = await prisma.book.findUnique({
      where: { id: params.id },
    });
    return res.json(book);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to process request.", name: "", data: {} });
  }
}

async function add(req: Request, res: Response) {
  const user = res.locals?.user as SignedUser;
  const body = req.body as AddBookType;
  try {
    await prisma.book.create({
      data: {
        author: body.author,
        copies: body.copies,
        title: body.title,
        genreId: body.genre,
        isbn: generateRandomISBN(),
        publicationDate: new Date(),
      },
    });
    return res.sendStatus(201);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to process request.", name: "", data: {} });
  }
}

async function update(req: Request, res: Response) {
  const params = req.params as BookSchema;
  const body = req.body as AddBookType;
  try {
    await prisma.book.update({
      where: { id: params.id },
      data: {
        author: body.author,
        copies: body.copies,
        title: body.title,
        genreId: body.genre,
      },
    });
    return res.sendStatus(201);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to process request.", name: "", data: {} });
  }
}

async function remove(req: Request, res: Response) {
  const params = req.params as BookSchema;
  try {
    await prisma.book.delete({ where: { id: params.id } });
    return res.sendStatus(201);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to process request.", name: "", data: {} });
  }
}

/** Only access by the member role to borrowed books */
async function borrow(req: Request, res: Response) {
  const user = res.locals?.user as SignedUser;
  const params = req.params as BookSchema;
  try {
    const alreadyRequested = await prisma.borrowHistory.findFirst({
      where: { borrowedBy: user.id, approved: false, bookBorrowed: params.id },
    });
    if (alreadyRequested) {
      return res
        .status(200)
        .json({ message: "Already requested. Please wait" });
    }

    await prisma.borrowHistory.create({
      data: {
        bookBorrowed: params.id,
        borrowedBy: user.id,
      },
    });
    return res.status(201).json({ message: "Request sent" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to process request.", name: "", data: {} });
  }
}

async function getBorrowed(req: Request, res: Response) {
  const user = res.locals?.user as SignedUser;
  try {
    const borrowed = await prisma.borrowHistory.findMany({
      where: { borrowedBy: user.id, approved: true },
    });
    return res.json(borrowed);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to process request.", name: "", data: {} });
  }
}

/**
 * Accessed by liberian and member role.
 * @returns all borrowed books if role is member or
 * all borrowed books for a particular user (member)
 */
async function ddddd(req: Request, res: Response) {
  const params = req.params as BookSchema;
  const user = res.locals?.user as SignedUser;

  try {
    // await prisma.book.delete({ where: { id: params.id } });
    // return res.sendStatus(201);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to process request.", name: "", data: {} });
  }
}

export default {
  addGenre,
  getGenre,
  getAll,
  add,
  update,
  remove,
  getOne,
  getBorrowed,
  borrow,
};
