// import db from "../server";
import { PrismaClient } from "@prisma/client";
import express from "express";
import { Request, Response } from "express";

const prisma = new PrismaClient();

//Admin Personal Details
export const adminDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  const email = req.user?.email;

  if (!email) {
    return res.status(400).json({ error: "Email not provided in token" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        username: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User profile fetched", user });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET USERS (Prisma)
export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// UPDATE USERNAME (Prisma)
export const updateUsername = async (
  req: Request,
  res: Response
): Promise<any> => {
  const {
    oldUsername,
    newUsername,
  }: { oldUsername: string; newUsername: string } = req.body;

  if (!oldUsername || !newUsername) {
    res.status(400).json({ error: "Both old and new usernames are required" });
    return;
  }

  try {
    const user = await prisma.user.updateMany({
      where: { username: oldUsername },
      data: { username: newUsername },
    });

    if (user.count === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "Username updated successfully" });
  } catch (err) {
    console.error("Error updating username:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE USER BY USERNAME (Prisma)
export const deleteUserByUsername = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { username }: { username: string } = req.body;
  if (!username) {
    res.status(400).json({ error: "Username is required" });
    return;
  }

  try {
    const user = await prisma.user.deleteMany({
      where: { username },
    });

    if (user.count === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
