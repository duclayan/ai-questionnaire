// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // import FormContainer from "./components/forms/FormContainer/";

// // import FormContainer from "./components/forms/FormContainer";

// import InputField from "./components/forms/InputField/InputField";
// import FormContainer from "./components/forms/FormContainer/FormContainer";
// import StepNavigation from "./components/forms/StepNavigation/StepNavigation";
// import NavigationButtons from "./components/forms/NavigationButtons/NavigationButtons";
// import CenteredHeading from "./components/forms/CenteredHeading/CenteredHeading";
// function App() {
//   const [text, setText] = useState("");
//   const [autoCorrectEnabled, setAutoCorrectEnabled] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (autoCorrectEnabled) {
//         handleAutoCorrect();
//       }
//     }, 10000);
//     return () => clearTimeout(timer);
//   }, [text, autoCorrectEnabled]); // Added autoCorrectEnabled to dependencies

//   const handleAutoCorrect = async () => {
//     // 1. Post the current input
//     // 2. Call OpenAI
//     // 3. Gett the results
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/",
//         { text },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Check the response in the console
//       console.log(response);

//       setText(response.data.generated_text);
//       console.log(response);
//     } catch (error) {
//       console.error("Error during auto-correct:", error);
//     }
//   };

//   const handleVoiceToText = () => {
//     // Implement Azure Speech Service here
//   };

//   const handleSampleText = () => {
//     setText("This is a sample text.");
//   };

//   const handleFormSubmit = (formData) => {
//     // Handle form submission logic here
//     console.log("Form submitted with data:", formData);
//   };

//   return (
//     <div>
//       <StepNavigation />
//       <CenteredHeading />
//       <FormContainer onSubmit={handleFormSubmit} />
//       <NavigationButtons />
//       {/* <FormContainer /> */}
//       {/* <FormContainer onSubmit={handleFormSubmit} /> */}
//       {/* <textarea value={text} onChange={(e) => setText(e.target.value)} /> */}

//       {/* <button onClick={handleAutoCorrect}>Auto Correct</button>
//       <button onClick={handleVoiceToText}>Voice to Text</button>
//       <button onClick={handleSampleText}>Sample Text</button> */}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import InputField from "./components/forms/InputField/InputField";
import FormContainer from "./components/forms/FormContainer/FormContainer";
import StepNavigation from "./components/forms/StepNavigation/StepNavigation";
import NavigationButtons from "./components/forms/NavigationButtons/NavigationButtons";
import CenteredHeading from "./components/forms/CenteredHeading/CenteredHeading";
import QuestionList from "./components/forms/QuestionList/QuestionList";

function App() {
  const [text, setText] = useState("");
  const [autoCorrectEnabled, setAutoCorrectEnabled] = useState(false);
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

  const handleSubmit = () => {
    alert("Form submitted!");
    setCurrentStep(totalSteps - 1);
  };

  return (
    <div>
      <StepNavigation
        currentStep={currentStep}
        handleStepChange={handleStepChange}
      />
      <CenteredHeading />
      {/* <FormContainer onSubmit={handleSubmit} /> */}
      <QuestionList currentStep={currentStep} />{" "}
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
