import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secret = process.env.JWTKEY;

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secret as string, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    if (typeof decoded === "object" && decoded !== null) {
      req.user = {
        role: (decoded as jwt.JwtPayload).role,
        email: (decoded as jwt.JwtPayload).email,
      };
      console.log("Authenticated user:", req.user);
    }

    next();
  });
};
