// Form.js
import React, { useState} from "react";
import axios from "axios";
import { StepNavigation, NavigationButtons, CenteredHeading, QuestionList, DocumentLoader } from "../../components/forms";
import { useParams } from 'react-router-dom';
import { AutoCorrectSettings } from "../../components/forms/AutoCorrectSettings/AutoCorrectSettings";
function Form() {
  const [navbarEnabled, setNavbarEnabled] = useState(true);
  const [allAnswers, setAllAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [autoCorrectEnabled, setAutoCorrectEnabled] = useState(true);

  const totalSteps = 6;
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
      const response = await axios.post(
        `${apiEndpoint}/submit-answers/`,
        allAnswers
      );


      setIsLoading(true);
      const reportResponse = await axios.get(
        `${apiEndpoint}/generate-report/`,
        {
          params: { language: selectedLanguage, project_id: project_id },
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

    } catch (error) {
      console.error("Error submitting answers:", error);
    }

    setNavbarEnabled(false);
  };

  const handleAnswersChange = (answers) => {
    setAllAnswers(answers);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleAutoCorrectToggle = () => {
    setAutoCorrectEnabled((prev) => !prev);
  };

  return (
    <div class="app-container">
      <AutoCorrectSettings
       autoCorrectEnabled={autoCorrectEnabled}
       handleAutoCorrectToggle={handleAutoCorrectToggle}
       language = {selectedLanguage}
       handleLanguageChange={handleLanguageChange}
       />
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
      />
      <DocumentLoader isLoading={isLoading} text={"We are preparing your report"} />      
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