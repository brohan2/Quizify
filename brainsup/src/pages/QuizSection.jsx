// components/QuizSection.jsx
import React from "react";

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const QuizSection = ({
  email,
  currentQuestion,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  timeLeft,
  handlePrevious,
  handleNext,
  handleOptionSelect,
  handleClearOption
}) => {
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
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
        <button onClick={handleNext} disabled={currentIndex === totalQuestions - 1}>
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

        <button
          className="clear-btn"
          onClick={handleClearOption}
          disabled={!selectedAnswer}
        >
          Clear Selection
        </button>
      </div>
    </div>
  );
};

export default QuizSection;
