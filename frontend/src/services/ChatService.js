// frontend/src/services/ChatService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Update this with your backend server URL

const initiateChat = async (userId, therapistId) => {
  try {
    const response = await axios.post(`${API_URL}/chat/initiate-chat`, { userId, therapistId });
    return response.data;
  } catch (error) {
    console.error('Error initiating chat:', error);
    throw error;
  }
};

const getUserChats = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/chat/user-chats/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user chats:', error);
    throw error;
  }
};

const getTherapistChats = async (therapistId) => {
  try {
    const response = await axios.get(`${API_URL}/chat/therapist-chats/${therapistId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching therapist chats:', error);
    throw error;
  }
};

// Add more chat service functions as needed...

export { initiateChat, getUserChats, getTherapistChats };
