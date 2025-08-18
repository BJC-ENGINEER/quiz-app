import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Quizzy!</h1>
      <button 
        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => navigate("/quiz")}
      >
        Start Quiz
      </button>
    </div>
  );
}