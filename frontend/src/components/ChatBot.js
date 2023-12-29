// frontend/src/components/ChatBot.js
import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import './ChatBot.css'; // Import your custom styles

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm SolaceNet! Ask me about mental health or general health.",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    const lastMessage = chatMessages[chatMessages.length - 1];
    
    // Add custom logic for handling mental health and general health questions
    if (lastMessage.sender === "user") {
      const userQuestion = lastMessage.message.toLowerCase();
      const response = getResponseForUserQuestion(userQuestion);

      const apiResponse = {
        message: response,
        sender: "ChatGPT"
      };

      // Add the assistant's response to the list
      setMessages([...chatMessages, apiResponse]);

      // Stop simulating typing
      setIsTyping(false);
    }
  }

  function getResponseForUserQuestion(question) {
    // Updated questionAnswers with more responses
    const questionAnswers = {
      "hello": "Hello! How can I assist you today?",
      "hi": "Hi there! Feel free to ask me anything about mental health or general health.",
      "how are you": "I'm just a computer program, but I'm here to help! How can I assist you today?",
      "mental health": "Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act.",
      "reduce stress": "Try deep breathing exercises or take a short walk to reduce stress.",
      "anxiety": "Anxiety is a normal human emotion that responds to stress, but excessive anxiety can be a mental health disorder.",
      "improve mental health": "Maintain a balanced diet, exercise regularly, get enough sleep, and seek support from friends or professionals.",
      "depression": "Depression is a mood disorder that affects how you feel, think, and handle daily activities.",
      "mindfulness": "Mindfulness is the practice of bringing one's attention to the present moment.",
      "handle insomnia": "Establish a regular sleep routine, avoid caffeine and electronics before bedtime, and create a comfortable sleep environment.",
      "benefits of exercise": "Exercise can improve mood, reduce stress, and contribute to overall physical and mental well-being.",
      "PTSD": "Post-traumatic stress disorder (PTSD) is a mental health condition that can develop after experiencing or witnessing a traumatic event.",
      "loneliness": "Connect with friends and family, engage in social activities, and consider talking to a mental health professional for support.",
      // Add more questions and answers...

      // Default response guidance
      "default": "I'm sorry, I don't have information on that specific topic. You can ask me about mental health or general health!"
    };

    // Check if the question contains keywords and has a predefined answer
    for (const key in questionAnswers) {
      if (question.includes(key)) {
        return questionAnswers[key];
      }
    }

    // If no matching question is found, provide the default response
    return questionAnswers["default"];
  }

  return (
    <div className="ChatBot">
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={isTyping ? <TypingIndicator content="SolaceNet is typing" /> : null}
            style={{ flexDirection: 'column-reverse' }}
          >
            {messages.map((message, i) => {
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatBot;
