import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => {
        const formatted = res.data.results.map(q => {
          const answers = [...q.incorrect_answers];
          const randIndex = Math.floor(Math.random() * 4);
          answers.splice(randIndex, 0, q.correct_answer);
          return { ...q, answers };
        });
        setQuestions(formatted);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (answer) => {
    if (answer === questions[current].correct_answer) {
      setScore(score + 1);
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      navigate("/result", { state: { score, total: questions.length } });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading questions...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">
        Question {current + 1} of {questions.length}
      </h2>
      <p className="mb-4">{questions[current].question}</p>
      <div className="flex flex-col gap-2">
        {questions[current].answers.map((ans, i) => (
          <button 
            key={i} 
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => handleAnswer(ans)}
          >
            {ans}
          </button>
        ))}
      </div>
    </div>
  );
}