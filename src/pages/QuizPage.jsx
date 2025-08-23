import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { category, difficulty } = location.state || {};

  useEffect(() => {
    let url = "https://opentdb.com/api.php?amount=5&type=multiple";
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;

    axios.get(url).then((res) => {
      const formatted = res.data.results.map((q) => {
        const answers = [...q.incorrect_answers];
        const randIndex = Math.floor(Math.random() * 4);
        answers.splice(randIndex, 0, q.correct_answer);
        return { ...q, answers };
      });
      setQuestions(formatted);
      setLoading(false);
    });
  }, [category, difficulty]);

  const handleNext = () => {
    if (selected === questions[current].correct_answer) {
      setScore(score + 1);
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      navigate("/result", { state: { score, total: questions.length } });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading questions...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Progress Tracker */}
      <h2 className="text-xl font-bold mb-4">
        Question {current + 1} of {questions.length}
      </h2>

      {/* Question */}
      <p
        className="mb-4 text-lg"
        dangerouslySetInnerHTML={{ __html: questions[current].question }}
      />

      {/* Answer Options */}
      <div className="flex flex-col gap-2">
        {questions[current].answers.map((ans, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded border ${
              selected === ans
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setSelected(ans)}
            dangerouslySetInnerHTML={{ __html: ans }}
          />
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={!selected}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
      >
        {current + 1 === questions.length ? "Finish Quiz" : "Next"}
      </button>
    </div>
  );
}