import { Response, Request } from "express";
import { LoginSchema, RegisterSchema } from "../dtos/auth.dto";
import argon from "argon2";
import prisma from "../utils/prisma";
import { Prisma } from "@prisma/client";
import tokenizer from "../utils/tokenizer";
import { SignedUser } from "../utils/types";

async function register(req: Request, res: Response) {
  const body = req.body as RegisterSchema;

  try {
    const hashed = await argon.hash(body.password);
    const user = await prisma.user.create({
      data: { name: body.username, password: hashed, role: body.role },
    });

    const accessToken = tokenizer.sign(
      { name: user.name, role: user.role, id: user.id },
      { expiresIn: "30s" }
    );

    const refreshToken = tokenizer.sign(
      { id: user.id, role: user.role },
      { expiresIn: "1d" }
    );
    res.status(201);
    return res.json({
      message: "Registration was successful",
      user: {
        route: user.role.toLowerCase(),
      },
      token: accessToken,
      xRefresh: refreshToken,
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

async function signIn(req: Request, res: Response) {
  const body = req.body as LoginSchema;

  try {
    const user = await prisma.user.findUnique({
      where: { name: body.username },
    });
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });
    const correctPassword = await argon.verify(user.password, body.password);
    if (!correctPassword)
      return res.status(401).json({ message: "Invalid username or password" });

    const accessToken = tokenizer.sign(
      { name: user.name, role: user.role, id: user.id },
      { expiresIn: "30s" }
    );
    const refreshToken = tokenizer.sign(
      { id: user.id, role: user.role },
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Access granted.",
      user: { route: user.role.toLowerCase() },
      token: accessToken,
      xRefresh: refreshToken,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Unable to process request" });
  }
}

async function refreshToken(req: Request, res: Response) {
  const xRefresh = req.body.xRefresh;

  if (!xRefresh) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const decoded = tokenizer.verify(xRefresh) as SignedUser;
    if (!decoded)
      return res.status(401).json({ message: "Could not refresh token" });

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(404).json({ message: "User is missing" });

    const accessToken = tokenizer.sign(
      { name: user.name, role: user.role, id: user.id },
      { expiresIn: "30s" }
    );
    const refreshToken = tokenizer.sign(
      { id: user.id, role: user.role },
      { expiresIn: "1d" }
    );
    return res.json({
      message: "Access granted.",
      user: { route: user.role.toLowerCase() },
      token: accessToken,
      xRefresh: refreshToken,
    });
  } catch (error: any) {
    return res.status(500).json({ message: "Unable to process request" });
  }
}

async function signOut(req: Request, res: Response) {
  return res
    .status(204)
    .json({ statusCode: "204", message: "Logged out successfully" });
}

export default { register, signIn, signOut, refreshToken };
