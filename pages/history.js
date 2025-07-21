import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Navbar from "../components/navbar";

export default function History() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        setEmails(data);
      } catch (err) {
        console.error("Failed to fetch email history", err);
        toast.error("Failed to load history");
      }
    };
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this email?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        toast.success("Deleted successfully");
        setEmails((prev) => prev.filter((email) => email.id !== id));
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.error("Error deleting email:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Saved Emails</h1>
        {emails.length === 0 ? (
          <p className="text-center text-gray-500">No saved emails yet.</p>
        ) : (
          <div className="space-y-6">
            {emails.map((email) => (
              <div
                key={email.id}
                className="p-4 bg-white border rounded shadow relative"
              >
                <div className="text-sm text-gray-500 mb-1">
                  {new Date(email.createdAt).toLocaleString()} |{" "}
                  <strong>{email.tone}</strong>
                </div>
                <div className="text-gray-800 font-medium mb-1">
                  Goal: {email.goal}
                </div>
                <div className="whitespace-pre-line text-gray-700 mb-2">
                  {email.result}
                </div>
                <button
                  onClick={() => handleDelete(email.id)}
                  className="absolute top-2 right-2 text-red-600 hover:underline text-sm"
                >
                  🗑 Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
