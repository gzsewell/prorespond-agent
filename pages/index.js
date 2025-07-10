import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [context, setContext] = useState("");
  const [goal, setGoal] = useState("");
  const [tone, setTone] = useState("Professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, goal, tone }),
      });

      const data = await response.json();
      setResult(data.email || "No response generated.");
      await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, goal, tone, result: data.email }),
      });
    } catch (err) {
      console.error(err);
      setResult("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };
  const handleExport = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prorespond-email.txt";
    a.click();
    URL.revokeObjectURL(url); // cleanup
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Link + Main content goes here */}

      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl w-full">
          <h1 className="text-3xl font-bold text-center mb-4">
            ProRespond Agent
          </h1>
          <Link
            href="/"
            className="absolute top-4 right-4 text-blue-600 underline hover:text-blue-800"
          >
            ⬅️ Back to Home
          </Link>
          <Link
            href="/history"
            className="absolute top-4 right-4 text-blue-600 underline hover:text-blue-800"
          >
            📜 Email History
          </Link>

          <p className="text-center text-gray-600 mb-6">
            Generate personalized emails for outreach, job apps, and more.
          </p>
          <textarea
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
            placeholder="Paste a LinkedIn profile, job description, or other context..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
          ></textarea>
          <input
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="What is your goal? (e.g., Introduce yourself for a job, pitch a service)"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <select
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="Professional">Professional</option>
            <option value="Friendly">Friendly</option>
            <option value="Confident">Confident</option>
            <option value="Persuasive">Persuasive</option>
            <option value="Formal">Formal</option>
            <option value="Conversational">Conversational</option>
            <option value="Bold">Bold</option>
          </select>
          <button
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors mb-4"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Email"}
          </button>
          {result && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-300 rounded">
              <h2 className="font-semibold mb-2">Generated Email:</h2>
              <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                {result}
              </div>

              <button
                onClick={handleCopy}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                {copied ? "Copied!" : "📋 Copy to Clipboard"}
              </button>
              <button
                onClick={handleExport}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition ml-2"
              >
                ⬇ Export as .txt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
