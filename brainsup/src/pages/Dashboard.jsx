import React, { useEffect, useState } from "react";
import question from "../utils/api";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import QuizSection from "./QuizSection";
import "./Dashboard.css";

const Dashboard = ({ email }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); 
  const [answers, setAnswers] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();

  // Fetch Questions
  useEffect(() => {
    async function getData() {
      try {
        const data = await question();
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        alert("Failed to load quiz questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  //Timer
  useEffect(() => {
    if (!isLoading && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLoading, timeLeft]);

  // Auto-submit when timer ends
  useEffect(() => {
    if (timeLeft === 0) {
      confirmSubmission(); 
    }
  }, [timeLeft]);

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

  const handleSubmit = () => {
    setShowConfirmModal(true);
  };

  const confirmSubmission = () => {
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("questions", JSON.stringify(questions));
    navigate("/result", { replace: true });
  };

if (isLoading) {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p>Loading, please wait...</p>
    </div>
  );
}

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];

  return (
    <div className="dashboard-container">
      <Sidebar
        questions={questions}
        currentIndex={currentIndex}
        answers={answers}
        setCurrentIndex={setCurrentIndex}
        onSubmit={handleSubmit}
      />

      <QuizSection
        email={email}
        currentQuestion={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        selectedAnswer={selectedAnswer}
        timeLeft={timeLeft}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        handleOptionSelect={handleOptionSelect}
        handleClearOption={handleClearOption}
      />

      {showConfirmModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Confirm Submission</h3>
            <p>Are you sure you want to submit the test?</p>
            <div className="modal-buttons">
              <button onClick={confirmSubmission} className="confirm-btn">
                Yes, Submit
              </button>
              <button onClick={() => setShowConfirmModal(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
