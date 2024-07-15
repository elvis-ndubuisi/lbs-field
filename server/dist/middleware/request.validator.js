"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Validates incoming requests again a provided *Zod* schema
 * @param Zod schema object used for validation
 * @returns A zod error message if validation fails or proceed to next middleware in callstack.
 */
function requestValidator(zodSchema) {
    return (req, res, next) => {
        try {
            zodSchema.parse({ body: req.body, params: req.params, query: req.query });
            next();
        }
        catch (error) {
            // TODO: log error to remove analytic service
            return res.status(400).send(error === null || error === void 0 ? void 0 : error.errors);
        }
    };
}
exports.default = requestValidator;
