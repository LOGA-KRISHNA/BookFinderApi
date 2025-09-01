// src/components/Message/Message.jsx

import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import './Message.css';

const Message = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-hide after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const getIcon = () => {
    switch (message.type) {
      case 'success':
        return <CheckCircle className="message-icon" />;
      case 'error':
        return <AlertCircle className="message-icon" />;
      case 'info':
        return <Info className="message-icon" />;
      default:
        return <Info className="message-icon" />;
    }
  };

  const getMessageClass = () => {
    return `message message-${message.type}`;
  };

  return (
    <div className={getMessageClass()}>
      <div className="message-content">
        {getIcon()}
        <span className="message-text">{message.text}</span>
      </div>
      <button
        onClick={onClose}
        className="message-close"
        aria-label="Close message"
      >
        <X className="close-icon" />
      </button>
    </div>
  );
};

export default Message;