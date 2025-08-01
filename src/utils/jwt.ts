import jwt, { SignOptions } from "jsonwebtoken";
import { JwtPayload } from "../types";

export class JwtUtil {
  private static secret = process.env.JWT_SECRET || "fallback-secret";
  private static expiresIn: SignOptions["expiresIn"] = (process.env
    .JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"];

  static sign(payload: JwtPayload): string {
    const options: SignOptions = { expiresIn: this.expiresIn };
    return jwt.sign(payload, this.secret, options);
  }

  static verify(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }
}
