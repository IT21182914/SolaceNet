// frontend/src/components/ChatBot.js
import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import './ChatBot.css'; // Import your custom styles

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm SolaceNet! Ask me Health Problems!",
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
    // 100 Questions and Answers
    const questionAnswers = {
      "how to reduce stress": "Try deep breathing exercises or take a short walk to reduce stress.",
      "what is anxiety": "Anxiety is a normal human emotion that responds to stress, but excessive anxiety can be a mental health disorder.",
      "how to improve mental health": "Maintain a balanced diet, exercise regularly, get enough sleep, and seek support from friends or professionals.",
      "tell me about depression": "Depression is a mood disorder that affects how you feel, think, and handle daily activities.",
      // Add more questions and answers...

      // Additional 50 questions and answers
      "tell me about mindfulness": "Mindfulness is the practice of bringing one's attention to the present moment.",
      "how to handle insomnia": "Establish a regular sleep routine, avoid caffeine and electronics before bedtime, and create a comfortable sleep environment.",
      "benefits of exercise": "Exercise can improve mood, reduce stress, and contribute to overall physical and mental well-being.",
      // Add more questions and answers...

      // Example of a default response
      "default": "I'm sorry, I don't have information on that topic. You can ask me about mental health or general health!"
    };

    // Check if the question has a predefined answer
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
