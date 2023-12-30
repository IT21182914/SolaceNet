// frontend/src/components/Chat.js
import React, { useEffect, useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io.connect('http://localhost:8000');

const Chat = ({ user }) => {
  const { therapistId } = useParams();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('newMessage', (data) => {
      const newMessage = {
        message: data.message,
        direction: data.sender === 'user' ? 'incoming' : 'outgoing',
        sender: data.sender,
      };
  
      setMessages((prevMessages) => [...prevMessages, newMessage]);
  
      // Stop simulating typing
      setIsTyping(false);
    });
  }, [])

  const handleSend = (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setIsTyping(true);

    // Emit the user message to the server
    socket.emit('send-message', { content: message, room: therapistId, sender: 'user' });
  };

  return (
    <div className="Chat">
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={isTyping ? <TypingIndicator content="Therapist is typing" /> : null}
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

export default Chat;
