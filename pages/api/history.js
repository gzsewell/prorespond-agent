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

{
  emails.map((email) => (
    <div key={email.id} className="p-4 bg-white border rounded shadow relative">
      <button
        onClick={() => handleDelete(email.id)}
        className="absolute top-2 right-2 text-red-600 hover:underline text-sm"
      >
        🗑 Delete
      </button>
    </div>
  ));
}
