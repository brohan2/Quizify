import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const Result = () => {
  const navigate = useNavigate();
  const questions = JSON.parse(localStorage.getItem("questions")) || [];
  const answers = JSON.parse(localStorage.getItem("answers")) || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = questions[currentIndex];
  const selected = answers[currentIndex];
  const correct = currentQuestion?.correct_answer;
const getStatusMessage = () => {
  if (!selected) return { text: "Not Answered", className: " not-answered" };
  if (selected === correct) return { text: "Correctly Answered", className: "status correct" };
  return { text: "Wrongly Answered", className: "status wrong" };
};

const status = getStatusMessage();

  const getOptionClass = (option) => {
    if (option === correct && selected === correct) return "option-item correct";
    if (option === selected && selected !== correct) return "option-item wrong";
    if (option === correct && selected !== correct) return "option-item corrected";
    return "option-item";
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar result-sidebar" id="result-sidebar">
  <h4>Questions</h4>
  <div className="question-numbers result-question-numbers">
    {questions.map((_, index) => {
      const selected = answers[index];
      const correct = questions[index]?.correct_answer;
      const isCorrect = selected === correct;

      return (
        <button
          key={index}
          className={`question-number ${
            currentIndex === index ? "active" : ""
          } ${selected ? (isCorrect ? "answered-correct" : "answered-wrong") : ""}`}
          onClick={() => setCurrentIndex(index)}
        >
          {index + 1}
        </button>
      );
    })}
  </div>
</div>

      <div className="main-content">
        <div className="dashboard-header">
          <h2>Review Answers</h2>
          <button className="clear-btn" onClick={() => navigate("/", { replace: true })}>
            Home
          </button>
        </div>

        <div className="navigation-buttons">
          <button onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))} disabled={currentIndex === 0}>
            Previous
          </button>
          <button onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))} disabled={currentIndex === questions.length - 1}>
            Next
          </button>
        </div>

        <div className="question-box">
          <h3>{decodeHTML(currentQuestion?.question)}</h3>
          <p className={status.className}>{status.text}</p>

          <ul className="options-list">
            {currentQuestion?.options.map((opt, index) => (
              <li key={index} className={getOptionClass(opt)}>
                {decodeHTML(opt)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Result;
