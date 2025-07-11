import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";

const prisma = new PrismaClient();

export const userDetails = async (
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
