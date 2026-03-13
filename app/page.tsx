"use client";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExplain = async () => {
    if (!topic) {
      setError("Please enter a topic to continue."); // [cite: 58]
      return;
    }
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }), // [cite: 63-66]
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setExplanation(data.explanation); // [cite: 40, 44]
    } catch (err) {
      setError("Failed to get explanation. Check your API key."); // [cite: 56]
    } finally {
      setLoading(false); // [cite: 50-53]
    }
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Study Topic Explainer</h1>
      <input 
        type="text" 
        className="border p-2 w-full mb-4 text-black" 
        placeholder="Enter topic (e.g. Photosynthesis)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button 
        onClick={handleExplain}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Generating explanation..." : "Explain Topic"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {explanation && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-bold">Explanation:</h2>
          <p>{explanation}</p>
        </div>
      )}
    </main>
  );
}