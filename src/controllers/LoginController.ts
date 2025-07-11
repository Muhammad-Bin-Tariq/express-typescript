import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const secret = process.env.JWTKEY as string;

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    // Step 1: Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const storedPassword = user.password;
    let isPasswordMatch = false;

    // Step 2: Detect if password is hashed
    const isHashed = storedPassword.startsWith("$2b$");

    if (isHashed) {
      // New user (bcrypt)
      isPasswordMatch = await bcrypt.compare(password, storedPassword);
    } else {
      // Legacy user (plain-text password)
      isPasswordMatch = password === storedPassword;

      if (isPasswordMatch) {
        // Rehash and store password for future logins
        const hashed = await bcrypt.hash(password, 10);
        await prisma.user.update({
          where: { id: user.id },
          data: { password: hashed },
        });
        console.log(`✅ Rehashed legacy password for ${user.email}`);
      }
    }

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Step 3: Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role.name,
      },
      secret,
      { expiresIn: "1h" }
    );

    const redirectPath = user.role.name === "Admin" ? "/admin" : "/profile";

    return res.status(200).json({
      message: "Login successful",
      token,
      redirect: redirectPath,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
