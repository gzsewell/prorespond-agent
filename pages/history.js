// pages/history.js
import { useEffect, useState } from "react";
import Link from "next/link";

export default function History() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      const res = await fetch("/api/history");
      const data = await res.json();
      setEmails(data);
    };

    fetchEmails();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">📜 Email History</h1>

      {emails.length === 0 ? (
        <p className="text-gray-600">No emails saved yet.</p>
      ) : (
        <div className="space-y-6">
          {emails.map((email) => (
            <div key={email.id} className="p-4 bg-white border rounded shadow">
              <div className="text-sm text-gray-500 mb-1">
                {new Date(email.createdAt).toLocaleString()} |{" "}
                <strong>{email.tone}</strong>
              </div>
              <div className="text-gray-800 font-medium mb-1">
                Goal: {email.goal}
              </div>
              <div className="whitespace-pre-line text-gray-700">
                {email.result}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
