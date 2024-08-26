import React, { useState, useEffect } from "react";
import axios from "axios";
import StepNavigation from "./components/forms/StepNavigation/StepNavigation";
import NavigationButtons from "./components/forms/NavigationButtons/NavigationButtons";
import CenteredHeading from "./components/forms/CenteredHeading/CenteredHeading";
import QuestionList from "./components/forms/QuestionList/QuestionList";
import DocumentLoader from "./components/forms/DocumentLoader/DocumentLoader";

function App() {
  const [text, setText] = useState("");
  const [autoCorrectEnabled, setAutoCorrectEnabled] = useState(false);
  const [allAnswers, setAllAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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

  // const handleSubmit = async () => {
  //   try {
  //     console.log("ALL ANSWERS", allAnswers);
  //     const response = await axios.post(
  //       "http://localhost:8000/submit-answers/",
  //       allAnswers
  //     );
  //     console.log("Answers submitted successfully:", response.data);
  //     // Handle successful submission (e.g., show a success message, reset form, etc.)
  //   } catch (error) {
  //     console.error("Error submitting answers:", error);
  //     // Handle error (e.g., show error message to user)
  //   }
  //   setCurrentStep(totalSteps - 1);
  // };

  const handleSubmit = async () => {
    try {
      console.log("ALL ANSWERS", allAnswers);

      // Step 1: Submit the answers to the server
      const response = await axios.post(
        "http://localhost:8000/submit-answers/",
        allAnswers
      );

      console.log("Answers submitted successfully:", response.data);

      // Step 2: Generate the report
      setIsLoading(true)
      const reportResponse = await axios.get(
        "http://localhost:8000/generate-report/",
        {
          responseType: "blob", // Important for downloading files
        }
      );
      setIsLoading(false)
      // Step 3: Create a URL for the report and download it
      const url = window.URL.createObjectURL(new Blob([reportResponse.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report_summary.docx"); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.remove();

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
      <DocumentLoader isLoading={isLoading}/>
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
