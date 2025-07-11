import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const secret = process.env.JWTKEY;

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    // Find user by email and password, and include their role
    const user = await prisma.user.findFirst({
      where: { email, password },
      include: { role: true }, // Includes the linked Role either User or Admin
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role.name, // Include role name in JWT payload which changes the token based on admin or user login
      },
      secret as string,
      { expiresIn: "1h" }
    );

    // Return both token and redirect route based on role
    const redirectPath = user.role.name === "Admin" ? "/admin" : "/profile";

    return res.status(200).json({
      message: "Login successful",
      token,
      redirect: redirectPath,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
