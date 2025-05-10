import React from 'react';
import './styles.css';

const Button = ({ text, onClick, blue, disabled }) => {
  return (
    <button
      className={blue ? "btn btn-blue" : "btn"}
      onClick={onClick}
      disabled={disabled}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {text}
    </button>
  );
};

export default Button;
