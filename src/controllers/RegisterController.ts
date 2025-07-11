import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<any> => {
  const {
    username,
    email,
    password,
  }: { username: string; email: string; password: string } = req.body;

  try {
    // 1. Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // 2. Get the "User" role
    const userRole = await prisma.role.findUnique({
      where: { name: "User" },
    });

    if (!userRole) {
      return res.status(500).json({ error: "User role not found in database" });
    }

    // 3. Create new user
    await prisma.user.create({
      data: {
        username,
        email,
        password, // 🔒 Optional: hash this in production later
        roleId: userRole.id,
      },
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
