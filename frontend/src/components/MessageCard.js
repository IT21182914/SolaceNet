// frontend/src/components/MessageCard.js
import React from "react";
import styles from "./MessageCard.module.css";

const MessageCard = ({ message }) => {
  const { sender, content } = message; // Destructure message properties

  const handleAccept = () => {
    // Implement logic for accepting the message
    // For now, let's assume the message is accepted
    console.log(`Message from ${sender} accepted`);
  };

  return (
    <div className={styles.messageCard}>
      <p>
        <strong>Sender:</strong> {sender}
      </p>
      <p>
        <strong>Content:</strong> {content}
      </p>
      <button className={styles.acceptButton} onClick={handleAccept}>
        Accept
      </button>
    </div>
  );
};

export default MessageCard;
