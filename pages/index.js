import { useState } from "react";

const [context, setContext] = useState("");
const [goal, setGoal] = useState("");
const [tone, setTone] = useState("Professional");
const [result, setResult] = useState("");
const [loading, setLoading] = useState(false);

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-4">
          ProRespond Agent
        </h1>
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

        <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors mb-4">
          Generate Email
        </button>
      </div>
    </div>
  );
}
