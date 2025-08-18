import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">
        You scored {score} out of {total}!
      </h1>
      <button 
        className="px-6 py-2 bg-green-600 text-white rounded-lg"
        onClick={() => navigate("/")}
      >
        Play Again
      </button>
    </div>
  );
}