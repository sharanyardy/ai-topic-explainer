"use client";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExplain = async () => {
    if (!topic) {
      setError("Please enter a topic to continue.");
      return;
    }
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setExplanation(data.explanation);
    } catch (err) {
      setError("Failed to get explanation. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main 
      className="flex min-h-screen flex-col items-center justify-center p-6"
      style={{
        backgroundImage: "url('/aib.jpg')", // Make sure your file in 'public' is named image.jpg
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="mb-2 text-center text-3xl font-extrabold text-blue-700">
          Study Buddy AI
        </h1>
        <p className="mb-6 text-center text-gray-700">
          Enter any topic to get a simple explanation.
        </p>

        <div className="space-y-4">
          <input 
            type="text" 
            className="w-full rounded-lg border border-gray-300 p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="e.g. Photosynthesis or java or python"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          
          <button 
            onClick={handleExplain}
            className="w-full rounded-lg bg-blue-700 py-3 font-semibold text-white transition-all hover:bg-blue-800 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? "Generating... wait a min" : "Explain Topic"}
          </button>
        </div>

        {error && <p className="mt-4 text-center text-sm font-medium text-red-600">{error}</p>}
      </div>

      {explanation && (
        <div className="mt-8 w-full max-w-2xl rounded-xl border-l-4 border-blue-600 bg-white/90 p-6 shadow-md backdrop-blur-sm">
          <h2 className="mb-2 text-xl font-bold text-gray-900">Explanation:</h2>
          <p className="leading-relaxed text-gray-700 text-black">{explanation}</p>
        </div>
      )}
    </main>
  );
}