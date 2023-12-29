// TherapistCard.js
import React from 'react';
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

  return (
    <div className={styles.therapistCard}>
      <div className={styles.cardHeader}>
        <h3>{`Dr. ${name}`}</h3>
        <p>Specialization: {specialization}</p>
      </div>
      <div className={styles.cardBody}>
        <p>⭐⭐⭐⭐⭐</p>
        <button className={styles.chatNowButton}>
          <span>Chat Now</span>
          <i className="fas fa-phone-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default TherapistCard;
