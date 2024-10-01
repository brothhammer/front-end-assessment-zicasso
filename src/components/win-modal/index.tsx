import React from 'react';
import './win-modal.css';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    onReset: () => void;
    currentScore: number;
    bestScore: number;
  }

  const WinModal: React.FC<ModalProps> = ({ show, onClose, onReset, currentScore, bestScore }) => {
    if (!show) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>You Win!</h2>
          <p>Score: {currentScore}</p>
          <p>Best Score: {bestScore}</p>
          <button onClick={onReset}>Play Again</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
};

export default WinModal;