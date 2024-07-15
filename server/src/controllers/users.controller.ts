import { Response, Request } from "express";
import prisma from "../utils/prisma";
import { SignedUser } from "../utils/types";
import { RegisterSchema } from "../dtos/auth.dto";
import argon from "argon2";
import { Prisma } from "@prisma/client";

async function fetchAllUsers(req: Request, res: Response) {
  const signedUser = res.locals?.user as SignedUser;

  try {
    const users = await prisma.user.findMany({
      where: { NOT: { id: signedUser.id } },
      select: { id: true, name: true, role: true },
    });
    return res.json(users);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Unable to process request.", name: "", data: {} });
  }
}

async function deleteUser(req: Request, res: Response) {
  const userId = req.params?.id;
  try {
    const deletedUser = await prisma.user.delete({ where: { id: userId } });
    return res.status(201).json(deletedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to process request.", name: "", data: {} });
  }
}

async function updateUser(req: Request, res: Response) {
  const userId = req.params?.id;
  const body = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: body.role },
    });
    return res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Unable to process request.", name: "", data: {} });
  }
}

async function addUser(req: Request, res: Response) {
  const body = req.body as RegisterSchema;

  try {
    const hashed = await argon.hash(body.password);
    const user = await prisma.user.create({
      data: { name: body.username, password: hashed, role: body.role },
    });

    res.status(201);
    return res.json({
      message: "Adding user was successful",
      user: {
        route: user.role.toLowerCase(),
      },
    });
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        message: "User already exists. Change username",
        name: "Unique constraint",
        data: {},
      });
    }

    return res
      .status(500)
      .json({ message: "Unable to process request.", name: "", data: {} });
  }
}

export default { fetchAllUsers, deleteUser, updateUser, addUser };
