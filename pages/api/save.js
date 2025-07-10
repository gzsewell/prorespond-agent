import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { context, goal, tone, result } = req.body;

  console.log("Received POST:", req.body);

  if (!context || !goal || !tone || !result) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const savedEmail = await prisma.email.create({
      data: { context, goal, tone, result },
    });

    console.log("Saved to DB:", savedEmail);

    res.status(200).json({ message: "Email saved!", id: savedEmail.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving email" });
  }
}
