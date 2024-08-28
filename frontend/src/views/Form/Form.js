// Form.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { StepNavigation, NavigationButtons, CenteredHeading, QuestionList, DocumentLoader } from "../../components/forms";
import { useNavigate } from 'react-router-dom';

function Form() {
  const [navbarEnabled, setNavbarEnabled] = useState(true);
  const [allAnswers, setAllAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 6;
  const navigate = useNavigate();

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
        "http://localhost:8000/api/submit-answers/",
        allAnswers
      );

      console.log("Answers submitted successfully:", response.data);

      setIsLoading(true);
      const reportResponse = await axios.get(
        "http://localhost:8000/api/generate-report/",
        {
          responseType: "blob",
        }
      );
      setIsLoading(false);

      const url = window.URL.createObjectURL(new Blob([reportResponse.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report_summary.docx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      navigate("/form-submitted")

    } catch (error) {
      console.error("Error submitting answers:", error);
    }

    setNavbarEnabled(false);
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
      <CenteredHeading currentStep={currentStep} />
      <QuestionList
        currentStep={currentStep}
        onAnswersChange={handleAnswersChange}
      />
      <DocumentLoader isLoading={isLoading}/>
      <NavigationButtons
        navbarEnabled={navbarEnabled}
        currentStep={currentStep}
        totalSteps={totalSteps}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Form;