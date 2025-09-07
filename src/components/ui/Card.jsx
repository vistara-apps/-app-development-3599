import React from 'react';

const Card = ({ children, variant = 'default', onClick, className = '' }) => {
  const baseClasses = 'bg-white rounded-lg shadow-card p-4 sm:p-6 transition-all duration-200';
  
  const variantClasses = {
    default: '',
    interactive: 'cursor-pointer hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;