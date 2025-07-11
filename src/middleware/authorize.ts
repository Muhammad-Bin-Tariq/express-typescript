import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        role?: string;
        email?: string;
      };
    }
  }
}

export const authorize = (allowedRoles: string[]): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user?.role || !allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ error: "Access forbidden: insufficient rights" });
    }

    console.log(`User with role ${user.role} authorized.`);
    next();
  };
};
