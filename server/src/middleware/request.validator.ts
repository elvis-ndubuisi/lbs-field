import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

/** Validates incoming requests again a provided *Zod* schema
 * @param Zod schema object used for validation
 * @returns A zod error message if validation fails or proceed to next middleware in callstack.
 */
function requestValidator(zodSchema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      zodSchema.parse({ body: req.body, params: req.params, query: req.query });
      next();
    } catch (error: any) {
      // TODO: log error to remove analytic service
      return res.status(400).send(error?.errors);
    }
  };
}
export default requestValidator;
