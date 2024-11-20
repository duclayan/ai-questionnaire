import React, { useEffect, useState } from "react";
import axios from "axios";

function ChatComponent() {
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newList, setNewList] = useState(null);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;


  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    if(newList){
      fetchDocuments();
    }
    setNewList(false);
  }, [newList]);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/api/documents/`);
      setDocuments(response.data);
      if (response.data.length < 10) {
        setDocuments(response.data);
        console.log(response.data)
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${apiEndpoint}/api/documents/`, formData);
      alert("File uploaded successfully");
      setNewList(true)
      fetchDocuments();
    } catch (error) {
      // setNewList(true);
      console.error("Error uploading file:", error);
    }
  };

  const handleDocumentSelect = (document) => {
    setSelectedDocument(document);
  };

  const handleDeleteDocument = async (id) => {
    try {
      await axios.delete(`${apiEndpoint}/api/documents/${id}/`);
      alert("Document deleted successfully");
      fetchDocuments();
      if (selectedDocument && selectedDocument.id === id) {
        setSelectedDocument(null);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleQuestionSubmit = async () => {
    if (!selectedDocument) {
      alert("Please select a document first");
      return;
    }

    try {
      const response = await axios.post(`${apiEndpoint}/api/ask/`, {
        question,
        document_id: selectedDocument.id,
      });

      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Error asking question:", error);
    }
  };

  return (
    <div className="ChatComponent">
      <h1>Chat</h1>
      {documents.length < 1? (
        <>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </>
      ) : (
        <>
          <h2>Documents</h2>
          <ul>
            {documents.map((doc) => (
              <li key={doc.id}>
                {doc.file}
                <button onClick={() => handleDocumentSelect(doc)}>
                  Select
                </button>
                <button onClick={() => handleDeleteDocument(doc.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          {selectedDocument && (
            <div>
              <h3>Selected Document: {selectedDocument.file}</h3>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question about the document"
              />
              <button onClick={handleQuestionSubmit}>Send</button>
              {answer && <p>Answer: {answer}</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ChatComponent;