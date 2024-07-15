import { Request, Response, NextFunction } from "express";
import tokenizer from "../utils/tokenizer";

/** Verifies *user* token(access token) in request header
 * and appends verified result to locals (request-level info)
 * @returns {id:string, username:string, role: Role} | null
 * @usage res.locals.user
 */
export default function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next();

  const user = tokenizer.verify(token);
  if (user) res.locals.user = user;
  return next();
}
