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
    // Add your 100 questions and answers here
    const questionAnswers = {
      "how to reduce stress": "Try deep breathing exercises or take a short walk to reduce stress.",
      // Add more questions and answers...
    };

    // Check if the question has a predefined answer
    if (question in questionAnswers) {
      return questionAnswers[question];
    } else {
      return "I'm sorry, I don't have information on that topic. You can ask me about mental health or general health!";
    }
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
