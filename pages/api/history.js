// pages/api/history.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET requests allowed" });
  }

  try {
    const emails = await prisma.email.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(emails);
  } catch (err) {
    console.error("Error fetching email history:", err);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
}
