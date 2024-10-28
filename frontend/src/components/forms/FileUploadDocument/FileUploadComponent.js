import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DocumentLoader } from '../DocumentLoader/DocumentLoader';

function FileUploadComponent() {
  const [file, setFile] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const [refAnswers, setRefAnswers] = useState([]);
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      await fetchQuestions()
    };
    fetchData();
  }, []);

  useEffect(() => {
    // category, prompt, question, question_id, sample_answer
    console.log("Question List", questionList)
    const obj = JSON.stringify(questionList)
    const prompt = `
    Return in JSON Format (just return the json do not include 'json' return as plaintext).
    In reference to the file, Add the 'ref_answer' and remove other attributes aside from 'question_id' and 'category' for each of these question in this list answer the question : ${obj}`
    setQuestion(prompt)
  }, [questionList]);

  const fetchQuestions = async (category) => {
    try {
      const response = await axios.get(
        `${apiEndpoint}/api/questions`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { currentCategory: `all` },
        },
      );
      const question_list = response.data.question_list;

      setQuestionList(question_list);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  function cleanChatGPTResponse(text) {
    let cleanedText= text.trim();
    const lastBraceIndex = cleanedText.lastIndexOf('}');
    


    if (cleanedText.startsWith('```json') && cleanedText.endsWith('```')) {
        cleanedText = cleanedText.slice(7, -3).trim();
    } 
    else if (cleanedText.startsWith('```') && cleanedText.endsWith('```')) {
        cleanedText = cleanedText.slice(3, -3).trim();
    }
    else if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.slice(7).trim();
      if (lastBraceIndex !== -1) {
        cleanedText = cleanedText.substring(0, lastBraceIndex + 1) + ']';
      }
    }

    else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.slice(3).trim();
      if (lastBraceIndex !== -1) {
        cleanedText = cleanedText.substring(0, lastBraceIndex + 1) + ']';
      }
    }

    try {
        return JSON.parse(cleanedText);
    } catch (error) {
        // If parsing fails, return the cleaned text as is
        return cleanedText;
    }
  }

  const handleSubmit = async (event) => {

    setIsLoading(true)

    event.preventDefault();
    // Handle Empty File
    if (!file) {
      alert('Please select a file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      // Get the questions is in json format
      formData.append('question', question);

      // Process Document - saves the file, calls gpt to put the question and file, return answer in json format
      // Return: ref_answer, question_id, category
      const response = await axios.post(`${apiEndpoint}/api/process-document/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Cleaned text from the response
      const cleaned_text = cleanChatGPTResponse(response.data.generated_text)
      console.log("Final Text:", cleaned_text)
      setRefAnswers(cleaned_text)
      setResult(JSON.stringify(cleaned_text))

      // Save to the answers
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file');
    }      
    setIsLoading(false)
  };

  const handleAnswerFilling = async (fill_all) => {
    setIsLoading(true)
    try {
      const response = await axios.put(`${apiEndpoint}/api/process-document/`, 
        {
          project_id: 16, 
          ref_answers: refAnswers,
          fill_all: fill_all,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Update Successful", response.data)

    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file');
    }      

    setIsLoading(false)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Process Document</button>
      </form>

      <button type="button" onClick={() => handleAnswerFilling(true)}>Overwrite Answers</button>
      <button type="button" onClick={() => handleAnswerFilling(false)}>Fill Empty Input Fields</button>
      <DocumentLoader isLoading={isLoading} text={"Processing the Data"}  />

      {result && (
        <div>
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default FileUploadComponent;