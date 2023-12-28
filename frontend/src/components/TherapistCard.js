// TherapistCard.js
import React from 'react';
import styles from './TherapistCard.module.css';

const TherapistCard = ({ therapist }) => {
  const { name, specialization } = therapist;

  return (
    <div className={styles.therapistCard}>
      <div className={styles.cardHeader}>
        <h3>{`Dr. ${name}`}</h3>
        <p>Specialization: {specialization}</p>
      </div>
      <div className={styles.cardBody}>
        <p>Feedbacks: ★★★★★</p>
        <button className={styles.chatNowButton}>
          <span>Chat Now</span>
          <i className="fas fa-phone-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default TherapistCard;
