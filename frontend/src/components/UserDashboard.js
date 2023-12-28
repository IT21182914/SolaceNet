import React, { useState } from 'react';
import ChatBot from './ChatBot'; // Import the ChatBot component

const UserDashboard = () => {
  const [showChatBot, setShowChatBot] = useState(false);

  const handleChatNowClick = () => {
    setShowChatBot(true);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {/* Health Chatbot Card */}
      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        onClick={handleChatNowClick} // Handle click to show chatbot
      >
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src="https://cdn.pixabay.com/photo/2023/03/05/21/11/ai-generated-7832244_640.jpg"
          alt="Health Chatbot"
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center dark:text-white">
            Health Chatbot
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-100">
            Welcome to the health chatbot. Here, you can interact with an AI-Powered assistant for mental health support.
          </p>
          <button className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
            Chat Now
          </button>
        </div>
      </a>

      {/* Therapist Card */}
      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl mt-8 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src="https://cdn.pixabay.com/photo/2013/04/03/06/08/counseling-99740_640.jpg"
          alt="Therapist"
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center dark:text-white">Talk to a Therapist</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-100">
            Connect with a professional therapist for personalized guidance and counseling.
          </p>
          <button className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-0 rounded focus:outline-none focus:shadow-outline">
            Connect Now
          </button>
        </div>
      </a>

      {/* Render the ChatBot component only when showChatBot is true */}
      {showChatBot && <ChatBot />}
    </div>
  );
};

export default UserDashboard;
