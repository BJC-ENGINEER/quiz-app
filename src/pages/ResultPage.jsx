import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  const percentage = total > 0 ? ((score / total) * 100).toFixed(0) : 0;

  const getMessage = () => {
    if (percentage >= 80) return "🌟 Excellent work!";
    if (percentage >= 50) return "👍 Good job, keep practicing!";
    return "💪 Don’t give up, try again!";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold mb-2">
        You scored {score} out of {total}!
      </h1>
      <p className="text-lg mb-6">{getMessage()}</p>
      <p className="mb-6 text-gray-600">Your score: {percentage}%</p>

      <button
        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => navigate("/")}
      >
        Play Again
      </button>
    </div>
  );
}