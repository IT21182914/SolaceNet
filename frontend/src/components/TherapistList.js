// TherapistList.js
import React, { useState, useEffect } from 'react';
import styles from './TherapistList.module.css';
import TherapistCard from './TherapistCard';

const TherapistList = () => {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    fetchTherapists();
  }, []);

  const fetchTherapists = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/therapists'); // Update the URL

      if (!response.ok) {
        console.error(`Error fetching therapists: ${response.status} ${response.statusText}`);
        return;
      }

      const data = await response.json();
      setTherapists(data);
    } catch (error) {
      console.error('Error fetching therapists:', error.message);
    }
  };

  return (
    <div className={styles.therapistList}>
      <h2>Available Therapists</h2>
      {therapists.map((therapist) => (
        <TherapistCard key={therapist._id} therapist={therapist} />
      ))}
    </div>
  );
};

export default TherapistList;
