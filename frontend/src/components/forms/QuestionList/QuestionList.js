import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { DocumentLoader } from "../DocumentLoader/DocumentLoader";
import { NavigationButtons } from "../NavigationButtons/NavigationButtons";
import { AutoCorrectSettings } from "../AutoCorrectSettings/AutoCorrectSettings";
import { InputField } from "../InputField/InputField";
import { MermaidDiagram } from "../MermaidDiagram/MermaidDiagram";
import FileUploadComponent from "../FileUploadDocument/FileUploadComponent";

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
  setAutoCorrectEnabled,
  handleLanguageChange,
  textTimeoutEnabled,
  handleAutoTextTimeoutToggle,
  isFormSubmitted,
  setIsFormSubmitted
}) => {
  const categories = [
    "Upload File",
    "General Information",
    "Authentication and Authorization",
    "Application Architecture",
    "Cloud Architecture",
    "Architecture Diagram",
    "Report",
  ];

  const currentCategory = categories[currentStep];
  const token = localStorage.getItem('token');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tempAutoCorrectEnable, setTempAutoCorrectEnable] = useState(true);
  const [questionBeingCorrected, setQuestionBeingCorrected] = useState(new Set())
  const [idleTimers, setIdleTimers] = useState(new Set());
  const [isTyping, setIsTyping] = useState(true);

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
      if (currentCategory === 'Architecture Diagram') {
        setTempAutoCorrectEnable(autoCorrectEnabled)
        // Disable Auto Correct in Architecture Diagram
        // Original value is saved in tempAutoCorrectEnable
        setAutoCorrectEnabled(false)
      } else {
        setAutoCorrectEnabled(tempAutoCorrectEnable)
      }
      await fetchQuestions(currentCategory);
      setLoading(false);
    };
    fetchData();
  }, [currentStep]);
  // When the answers change, the answerlist is updated in the main form 
  useEffect(() => {
    const answers_length = Object.keys(answers).length
    if (answers_length > 0) {
      onAnswersChange(answers);
    }
  }, [currentCategory]);
  // Functions : FetchQuestion
  const fetchQuestions = async (category) => {
    try {
      const response = await axios.get(
        `${apiEndpoint}/api/questions`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { currentCategory: category },
        },
      );
      const question_list = response.data.question_list;
      setQuestions(question_list);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  const fetchAnswers = async () => {
    try {
      const response = await axios.get(
        `${apiEndpoint}/api/submit-answers`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { project_id: projectID }
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
    let isMounted = true; // Flag to track if the component is mounted

    const question = questions.find(q => q.question_id === questionId);
    handleInputChange(questionId, value, question.category);
    // Clear previous timer if exists
    if (idleTimers[questionId]) {
      clearTimeout(idleTimers[questionId]);
    }

    // Set a new timer for auto-correction
    if (autoCorrectEnabled && value.trim() !== "") {
      const timer = setTimeout(async () => {
        if (isMounted) {
          try {
            await handleAutoCorrect(question, value);
          } catch (error) {
            console.error("Error in auto-correction:", error);
          } finally {
            if (isMounted) {
            }
          }
        }
      }, 3000);

      setIdleTimers((prev) => ({ ...prev, [questionId]: timer }));

      // Cleanup function
      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
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
  // Modify giveSampleAnswer to accept selected answer
  const giveSampleAnswer = (currentQuestion, selectedAnswer) => {
    if (textTimeoutEnabled) {
      giveSampleAnswerWithTimeout(currentQuestion);
    } else {
      currentQuestion['input_answer'] = ''
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion.question_id]: {
          input_answer: currentQuestion.sample_answer || selectedAnswer, // Use selected answer or fallback to sample answer
          question: currentQuestion.question_id,
          project_id: projectID,
          category: currentCategory,
        },
      }));
    }
  };
  const giveSampleAnswerWithTimeout = (currentQuestion) => {
    const sample_answer = currentQuestion.sample_answer;
    let currentIndex = 0;
    let currentText = '';

    setQuestionBeingCorrected((prev) => new Set(prev).add(currentQuestion.question_id));


    const typeNextCharacter = () => {
      if (currentIndex < sample_answer.length && isTyping) {
        // Append next character to currentText
        currentText += sample_answer[currentIndex];

        // Update answers state with the new input_text
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [currentQuestion.question_id]: {
            input_answer: currentText,
            question: currentQuestion.question_id,
            project_id: projectID,
            category: currentCategory,
          },
        }));

        currentIndex++;

        setTimeout(typeNextCharacter, 1); // Adjust typing speed here (1 ms)
      } else {

        setQuestionBeingCorrected((prev) => {
          const newSet = new Set(prev);
          newSet.delete(currentQuestion.question_id); // Remove from loading set
          return newSet;
        });
      }

    };

    typeNextCharacter(); // Start typing

    return () => clearTimeout(typeNextCharacter);
  };
  const handleAutoCorrect = async (currentQuestion, inputValue) => {
    const existingAnswer = answers[currentQuestion.question_id];
    // Update the input answer if provided
    if (inputValue) {
      existingAnswer.input_answer = inputValue;
    }

    // Validate the input answer
    if (!existingAnswer || !existingAnswer.input_answer.trim()) {
      setQuestionBeingCorrected((prev) => {
        const newSet = new Set(prev);
        newSet.delete(currentQuestion.question_id); // Remove from loading set
        return newSet;
      });
      return;
    }

    // Add question ID to the loading set
    setQuestionBeingCorrected((prev) => new Set(prev).add(currentQuestion.question_id));

    try {
      const { data } = await axios.post(`${apiEndpoint}/api/`, {
        language,
        text: existingAnswer,
        prompt_strategy: currentQuestion.prompt,
        question: currentQuestion.question,
        sample_answer: currentQuestion.sample_answer,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the answers state with the corrected text
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion.question_id]: {
          input_answer: data.generated_text,
          question: currentQuestion.question_id,
          project_id: projectID,
          category: currentCategory,
        },
      }));

    } catch (error) {
      console.error("Error during auto-correct:", error.message);
    } finally {
      // Remove question ID from loading set
      setQuestionBeingCorrected((prev) => {
        const newSet = new Set(prev);
        newSet.delete(currentQuestion.question_id); // Remove from loading set
        return newSet;
      });
    }
  }

  const handleDocumentSubmit = async (answers) => {
    setAnswers(answers)
  }
  if (loading) {
    return <DocumentLoader isLoading={loading} text={"Preparing the Data"} />;
  }

  return (
    <Box sx={{ mt: 4, paddingBottom: '100px'}}>
          {currentCategory === "Upload File" ? (
            <>
              <FileUploadComponent project_id={projectID} onAnswersChange={handleDocumentSubmit}/>
            </>
          ) : null}

      {questions.map((question) => (
        <>
          <InputField
            question={question}
            answers={answers}
            handleInputChangeWithIdle={handleInputChangeWithIdle}
            handleAutoCorrect={handleAutoCorrect}
            giveSampleAnswer={(currentQuestion) => giveSampleAnswer(currentQuestion, answers[question.question_id]?.input_answer)}
            questionBeingCorrected={questionBeingCorrected}
            currentCategory={currentCategory}
            onChange={(selectedAnswer) => {
              setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [question.question_id]: {
                  input_answer: selectedAnswer,
                  question: question.question_id,
                  project_id: projectID,
                  category: currentCategory,
                },
              }));
            }}
          />
          {currentCategory === "Architecture Diagram" ? (
            <>
              <MermaidDiagram
                diagramName='diagram'
                question={question}
                answers={answers}
                token={token}
                apiEndpoint={apiEndpoint}
                language={language}

              />
            </>
          ) : null}

        </>
      ))}
      <NavigationButtons
        navbarEnabled={navbarEnabled}
        setNavbarEnabled={setNavbarEnabled}
        currentStep={currentStep}
        totalSteps={totalSteps}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
        isFormSubmitted={isFormSubmitted}
        setIsFormSubmitted={setIsFormSubmitted}
        projectId={projectID}
      />
      {currentStep < totalSteps - 2 && (
        <AutoCorrectSettings
          autoCorrectEnabled={autoCorrectEnabled}
          handleAutoCorrectToggle={handleAutoCorrectToggle}
          language={language}
          handleLanguageChange={handleLanguageChange}
          textTimeoutEnabled={textTimeoutEnabled}
          handleAutoTextTimeoutToggle={handleAutoTextTimeoutToggle}
        />

      )}
    </Box>
  );
}
