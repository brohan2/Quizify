import React, { useEffect, useState } from "react";
import question from "../utils/api";
import "./Dashboard.css";

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const Dashboard = ({ email }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    async function getData() {
      const data = await question();
      const refined = data.map((q) => ({
        ...q,
        options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
      }));
      setQuestions(refined);
      setLoading(false);
    }
    getData();
  }, []);

  useEffect(() => {
    if (!isLoading && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLoading, timeLeft]);

  if (isLoading) return <p className="loading">Loading...</p>;
  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];

  const handleOptionSelect = (option) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: option }));
  };

  const handleClearOption = () => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[currentIndex];
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h4>Questions</h4>
        <div className="question-numbers">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`question-number ${
                currentIndex === index ? "active" : ""
              } ${answers[index] ? "answered" : ""}`}
              onClick={() => setCurrentIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="main-content">
        <div className="dashboard-header">
          <h2>Welcome, {email}</h2>
          <p className="dashboard-timer">
            <strong>Time Remaining:</strong> {formatTime(timeLeft)}
          </p>
        </div>

        <div className="navigation-buttons">
          <button onClick={handlePrevious} disabled={currentIndex === 0}>
            Previous
          </button>
          <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>
            Next
          </button>
        </div>

        <div className="question-box">
          <h3>{decodeHTML(currentQuestion.question)}</h3>
          <ul className="options-list">
            {currentQuestion.options.map((opt, index) => (
              <li
                key={index}
                className={`option-item ${selectedAnswer === opt ? "selected" : ""}`}
                onClick={() => handleOptionSelect(opt)}
              >
                {decodeHTML(opt)}
              </li>
            ))}
          </ul>
          <button className="clear-btn" onClick={handleClearOption}>
            Clear Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
