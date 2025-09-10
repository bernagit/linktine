import { RequestHandler } from "express";
import { ZodObject, ZodError } from "zod";

const validate = (schema: ZodObject<any>): RequestHandler => {
    return (req, res, next) => {
        try {
            const result = schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            // (req as any).validated = result;
            next();
        } catch (e) {
            if (e instanceof ZodError) {
                return res.status(400).json({ error: JSON.parse(e.message) });
            }
            next(e);
        }
    };
};

export default validate;
