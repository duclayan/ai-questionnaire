import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { DocumentLoader } from "../DocumentLoader/DocumentLoader";
import { NavigationButtons } from "../NavigationButtons/NavigationButtons";
import { AutoCorrectSettings } from "../AutoCorrectSettings/AutoCorrectSettings";
import { InputField } from "../InputField/InputField";

export const QuestionList = ({
  currentStep,
  onAnswersChange,
  projectID,
  language,
  autoCorrectEnabled,
  navbarEnabled,
  setNavbarEnabled,
  totalSteps,
  handlePrevious,
  handleNext,
  handleSubmit,
  handleAutoCorrectToggle,
  selectedLanguage,
  handleLanguageChange
}) => {
  const categories = [
    "General Information",
    "Authentication and Authorization",
    "Application Architecture",
    "Cloud Architecture",
    "Report",
  ];

  const currentCategory = categories[currentStep];

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionBeingCorrected, setQuestionBeingCorrected] = useState(null)
  const [idleTimers, setIdleTimers] = useState({});
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT

  // Fetch answers according to the current project
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchAnswers();
      setLoading(false);
    };
    fetchData();
  }, [projectID]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchQuestions(currentCategory);
      setLoading(false);
    };
    fetchData();
  }, [currentStep]);

  // When the answers change, the answerlist is updated in the main form 
  useEffect(() => {
    onAnswersChange(answers);
    console.log("Updated Answers", answers)
  }, [answers]);

  // Functions : FetchQuestion
  const fetchQuestions = async (category) => {
    try {
      const response = await axios.get(
        `${apiEndpoint}/api/questions`, {
        params: { currentCategory: category },
      });
      const question_list = response.data.question_list;
      setQuestions(question_list);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const response = await axios.get(
        `${apiEndpoint}/api/submit-answers`, {
        params: { project_id: projectID },
      });
      const answer_list = response.data.answer_list;
      // Temporary holder for the anwers
      const initialInputValues = {};
      answer_list.forEach(answer => {
        initialInputValues[answer.question] = {
          input_answer: answer.input_answer,
          question: answer.question,
          category: answer.category,
          project_id: answer.project_id
        };
      });
      setAnswers(initialInputValues);
    } catch (error) {
      console.error('Error fetching answers:', error);
      setAnswers([]); // Ensure answers is an empty array on error
    }
  };

  // Functions involving the input box directly 
  // This includes handling change of input, giving sample answer and gpt autocorrect
  const handleInputChangeWithIdle = (questionId, value) => {
    console.log("Handle Input Change with Idle")
    const question = questions.find(q => q.question_id === questionId);
    handleInputChange(questionId, value, question.category);

    // Clear previous timer if exists
    if (idleTimers[questionId]) {
      clearTimeout(idleTimers[questionId]);
    }

    // Set a new timer for auto-correction
    if (autoCorrectEnabled) {
      const timer = setTimeout(() => {
        handleAutoCorrect(question);
      }, 3000);

      setIdleTimers((prev) => ({ ...prev, [questionId]: timer }));
    }
  };

  const handleInputChange = (id, value, category, currentStep) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: {
        input_answer: value,
        question: id,
        project_id: projectID,
        category: category
      },
    }));
  };

  const giveSampleAnswer = (currentQuestion) => {
    const id = currentQuestion.question_id;
    const sample_answer = currentQuestion.sample_answer;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: {
        input_answer: sample_answer,
        question: id,
        project_id: projectID,
        category: currentCategory
      },
    }));
  };

  const handleAutoCorrect = async (currentQuestion) => {
    const text = answers[currentQuestion.question_id];
    const prompt_strategy = currentQuestion.prompt;
    const question = currentQuestion.question;
    const sample_answer = currentQuestion.sample_answer;
    setQuestionBeingCorrected(currentQuestion.question_id)
    try {
      const response = await axios.post(`${apiEndpoint}/api/`, {
        language,
        text,
        prompt_strategy,
        question,
        sample_answer,
      });

      const correctedText = response.data.generated_text;
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion.question_id]: {
          input_answer: correctedText,
          question: currentQuestion.question_id,
          project_id: projectID,
          category: currentCategory
        },
      }));
    } catch (error) {
      console.error("Error during auto-correct:", error);
    }
    setQuestionBeingCorrected(null)
  };

  if (loading) {
    return <DocumentLoader isLoading={loading} text={"Preparing the Data"} />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      {questions.map((question) => (
        <InputField
          question={question}
          answers={answers}
          handleInputChangeWithIdle={handleInputChangeWithIdle}
          handleAutoCorrect={handleAutoCorrect}
          giveSampleAnswer={giveSampleAnswer}
          questionBeingCorrected={questionBeingCorrected} />
      ))}
      <NavigationButtons
        navbarEnabled={navbarEnabled}
        setNavbarEnabled={setNavbarEnabled}
        currentStep={currentStep}
        totalSteps={totalSteps}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
      />
      {currentStep < totalSteps - 2 && (
        <AutoCorrectSettings
          autoCorrectEnabled={autoCorrectEnabled}
          handleAutoCorrectToggle={handleAutoCorrectToggle}
          language={selectedLanguage}
          handleLanguageChange={handleLanguageChange}
        />

      )}
    </Box>
  );
}
