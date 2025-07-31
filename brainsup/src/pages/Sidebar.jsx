
import React from "react";

const Sidebar = ({ questions, currentIndex, answers, setCurrentIndex, onSubmit }) => {
  return (
    <div className="sidebar">
      <button className="submit-btn" onClick={onSubmit}>
        Submit
      </button>
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
  );
};

export default Sidebar;
