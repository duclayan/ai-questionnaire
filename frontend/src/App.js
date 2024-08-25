import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import StepNavigation from "./components/forms/StepNavigation/StepNavigation";
import NavigationButtons from "./components/forms/NavigationButtons/NavigationButtons";
import CenteredHeading from "./components/forms/CenteredHeading/CenteredHeading";
import QuestionList from "./components/forms/QuestionList/QuestionList";

function App() {
  const [text, setText] = useState("");
  const [autoCorrectEnabled, setAutoCorrectEnabled] = useState(false);
  const [allAnswers, setAllAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 6; // Total number of steps in the form

  useEffect(() => {
    const timer = setTimeout(() => {
      if (autoCorrectEnabled) {
        handleAutoCorrect();
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [text, autoCorrectEnabled]);

  const handleAutoCorrect = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/",
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setText(response.data.generated_text);
    } catch (error) {
      console.error("Error during auto-correct:", error);
    }
  };

  const handleStepChange = (newStep) => {
    setCurrentStep(newStep);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps - 1));
  };

  const handleSubmit = async () => {
    try {
      console.log("ALL ANSWERS", allAnswers);
      const response = await axios.post(
        "http://localhost:8000/submit-answers/",
        allAnswers
      );
      console.log("Answers submitted successfully:", response.data);
      // Handle successful submission (e.g., show a success message, reset form, etc.)
    } catch (error) {
      console.error("Error submitting answers:", error);
      // Handle error (e.g., show error message to user)
    }
    setCurrentStep(totalSteps - 1);
  };
  const handleAnswersChange = (answers) => {
    setAllAnswers(answers);
  };
  return (
    <div>
      <StepNavigation
        currentStep={currentStep}
        handleStepChange={handleStepChange}
      />
      <CenteredHeading />
      {/* <FormContainer onSubmit={handleSubmit} /> */}
      <QuestionList
        currentStep={currentStep}
        onAnswersChange={handleAnswersChange}
      />{" "}
      <NavigationButtons
        currentStep={currentStep}
        totalSteps={totalSteps}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
