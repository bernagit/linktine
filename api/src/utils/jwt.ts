import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export function createAccessToken(payload: object): string {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    });
}
