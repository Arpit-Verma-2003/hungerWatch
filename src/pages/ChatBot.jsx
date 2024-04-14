import { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css';

function ChatBot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Ask a question");

  async function generateResponse() {
    console.log("Loading...");
    setAnswer("Loading...");
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAPemiFWS-ahNSsvU-e9g0FsltB8iDvTv4",
      method: "post",
      data: {
        "contents": [{
          "parts": [{
            "text": question + "give response as if you are food insecurity tracker website named hunger watch"
          }]
        }]
      }
    });
    setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
  }

  useEffect(() => {
    // Fetch 3D elements or videos here if necessary
  }, []);

  return (
    <div className="chatbot-container">
      {/* Background for 3D elements or videos */}
      <div className="background-container">
        {/* You can add Three.js elements or video tags here */}
      </div>

      {/* Chatbot UI */}
      <div className="chatbot-content">
        <h1 className="chatbot-title">Chatbot</h1>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="chatbot-textarea"
          placeholder='Ask any Doubts regarding this Website'
          rows="6"
          cols="30"
        ></textarea>
        <br /><br />
        <button onClick={generateResponse} className="chatbot-button">Generate Response</button>
        <p className="chatbot-answer">{answer}</p>
      </div>
    </div>
  );
}

export default ChatBot;
