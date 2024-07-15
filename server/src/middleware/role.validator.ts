import { Request, Response, NextFunction } from "express";
import { SignedUser } from "../utils/types";

type R = "administrator" | "member" | "liberian";
/** Checks deserialized user role agains required role. */
function roleValidator(role: R | R[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const signedUser = res.locals?.user as SignedUser;
    if (Array.isArray(role)) {
      if (!role.includes(signedUser.role)) {
        return res.status(401).json({ message: "Access denied" });
      }
    } else {
      if (signedUser.role !== role) {
        return res.status(401).json({ message: "Access denied" });
      }
    }
    next();
  };
}

export default roleValidator;
