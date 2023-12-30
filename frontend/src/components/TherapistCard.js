// TherapistCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TherapistCard.module.css';

const getRandomSpecialization = () => {
  const specializations = [
    'Mindfulness-Based Therapy',
    'Cognitive Behavioral Therapy (CBT)',
    'Family Therapy',
    // Add more specializations as needed
  ];

  const randomIndex = Math.floor(Math.random() * specializations.length);
  return specializations[randomIndex];
};

const TherapistCard = ({ therapist }) => {
  const { _id, name } = therapist; // Include _id in destructuring
  const specialization = getRandomSpecialization();

  const handleChatNow = () => {
    // You can implement logic to initiate a chat here
    // For now, let's assume the user is redirected to the chat page
  };

  return (
    <div className={styles.therapistCard}>
      <div className={styles.cardHeader}>
        <h3>{`Dr. ${name}`}</h3>
        <p>Specialization: {specialization}</p>
      </div>
      <div className={styles.cardBody}>
        <p>⭐⭐⭐⭐⭐</p>
        {/* Use Link to navigate to the chat route */}
        <Link to={`/chat/${_id}`} onClick={handleChatNow}>
          <button className={styles.chatNowButton}>
            <span>Chat Now</span>
            <i className="fas fa-phone-alt"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TherapistCard;
