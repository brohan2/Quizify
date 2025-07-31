import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Import the CSS file

const LandingPage = ({ setemail }) => {
  const [inputEmail, setInputEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (inputEmail.trim()) {
      setemail(inputEmail);
      navigate("/dashboard");
    }
  }

  return (
    <div className="landing-container">
      <h1 className="landing-header">Welcome to the Quiz App</h1>
      <form className="landing-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          required
        />
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
};

export default LandingPage;
