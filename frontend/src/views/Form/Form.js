// Form.js
import React, { useState } from "react";
import axios from "axios";
import { StepNavigation, CenteredHeading, QuestionList, DocumentLoader } from "../../components/forms";
import { useParams } from 'react-router-dom';
function Form() {
  const [navbarEnabled, setNavbarEnabled] = useState(true);
  const [allAnswers, setAllAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [autoCorrectEnabled, setAutoCorrectEnabled] = useState(true);
  const [textTimeoutEnabled, setTextTimeoutEnabled] = useState(true);
  const token = localStorage.getItem('token');
  const totalSteps = 7;
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT
  const { project_id } = useParams();
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
      // Generate Report
      setIsLoading(true);
      const reportResponse = await axios.get(
        `${apiEndpoint}/api/generate-report/`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            language: selectedLanguage,
            project_id: project_id
          },
          responseType: "blob",
        },

      );
      setIsLoading(false);

      const url = window.URL.createObjectURL(new Blob([reportResponse.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report_summary.docx");
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error("Error submitting answers:", error);
    }

    setNavbarEnabled(false);
  };

  const handleAnswersChange = async (answers) => {
    try {
      const response = await axios.post(
        `${apiEndpoint}/api/submit-answers/`,
        {answers},
        {
          headers: { Authorization: `Bearer ${token}` }
        },
      );
      setAllAnswers(answers);
    } catch (error) {
      console.error("Error submitting answers:", error.response ? error.response.data : error.message);
    }
  }

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleAutoTextTimeoutToggle = () => {
    setTextTimeoutEnabled((prev) => !prev);
  };

  const handleAutoCorrectToggle = () => {
    setAutoCorrectEnabled((prev) => !prev);
  };

  return (
    <div class="app-container">
      <StepNavigation
        currentStep={currentStep}
        handleStepChange={handleStepChange}
      />
      <CenteredHeading currentStep={currentStep} />
      <QuestionList
        currentStep={currentStep}
        onAnswersChange={handleAnswersChange}
        projectID={project_id}
        language={selectedLanguage}
        autoCorrectEnabled={autoCorrectEnabled}
        navbarEnabled={navbarEnabled}
        setNavbarEnabled={setNavbarEnabled}
        totalSteps={totalSteps}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
        handleAutoCorrectToggle={handleAutoCorrectToggle}
        setAutoCorrectEnabled={setAutoCorrectEnabled}
        handleLanguageChange={handleLanguageChange}
        textTimeoutEnabled = {textTimeoutEnabled}
        handleAutoTextTimeoutToggle = {handleAutoTextTimeoutToggle}
      />
      <DocumentLoader isLoading={isLoading} text={"We are preparing your report"} />
    </div>
  );
}

export default Form;