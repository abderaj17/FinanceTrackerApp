import React from 'react'
import './styles.css';

const Button = ({text, onClick, blue, disabled}) => {
  return (
    <div className={blue ? "btn btn-blue" : "btn"} onClick={onClick}
    disabled={disabled} style={{cursor: disabled ? 'not-allowed' : 'pointer'}}> 
        {text}
    </div>
  )
}

export default Button;