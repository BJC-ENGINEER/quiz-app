import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleStart = () => {
    navigate("/quiz", { state: { category, difficulty } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Quizzy!</h1>

      {/* Category Selector */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-4 py-2 border rounded"
      >
        <option value="">Any Category</option>
        <option value="9">General Knowledge</option>
        <option value="17">Science & Nature</option>
        <option value="21">Sports</option>
        <option value="23">History</option>
      </select>

      {/* Difficulty Selector */}
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="px-4 py-2 border rounded"
      >
        <option value="">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button
        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        onClick={handleStart}
      >
        Start Quiz
      </button>
    </div>
  );
}