import React, { useState } from 'react';
import ChatBot from './ChatBot'; // Import the ChatBot component

const UserDashboard = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const handleChatNowClick = () => {
    setShowChatBot(true);
  };

  const handleExploreClick = () => {
    setShowCards(true);

    // Scroll to the cards section
    const cardsSection = document.getElementById('cardsSection');
    if (cardsSection) {
      cardsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {/* Mental Health Statistics */}
      <div className="text-blue-500 text-5xl font-bold mb-4 text-center">
        Mental Health Statistics
      </div>
      <div className="text-center mb-8">
        <br /> <br />
        <p className="text-3xl">
          1 in 5 adults experience mental illness every year. Depression is the leading cause of disability worldwide.
        </p>
        <p className="text-3xl">
          Over 50% of mental illness begins by age 14.
        </p>
      </div>
      <button
        className="bg-blue-600 hover:bg-purple-800 text-lg text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleExploreClick}
      >
        Explore
      </button>
      <br /> <br />

      {/* Cards Section */}
      <div id="cardsSection">
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
      </div>

      {/* Render the ChatBot component only when showChatBot is true */}
      {showChatBot && <ChatBot />}
      <br /> <br />
    </div>
  );
};

export default UserDashboard;
