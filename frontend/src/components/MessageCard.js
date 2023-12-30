import React from "react";
import styles from "./MessageCard.module.css";

const MessageCard = ({ message }) => {
  const { username, message: messageContent } = message; // Destructure message properties

  const handleAccept = () => {
    // Implement logic for accepting the message
    // For now, let's assume the message is accepted
    console.log(`Message from ${username} accepted`);
  };

  return (
    <div className={styles.messageCard}>
      <p>
        <strong>Username (Anonymous name):</strong> {username}
      </p>
      <p>
        <strong>Message:</strong> {messageContent}
      </p>
      <button className={styles.acceptButton} onClick={handleAccept}>
        Accept
      </button>
    </div>
  );
};

export default MessageCard;
