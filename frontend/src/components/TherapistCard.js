// TherapistCard.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
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
  const { name } = therapist;
  const specialization = getRandomSpecialization();

  const handleChatNow = () => {
    // Implement the logic to initiate a chat
    // You can redirect the user to the chat page or show a modal for chat initiation
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
        <Link to="/chat" onClick={handleChatNow}>
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
