import React from 'react';

const Card = ({ children, variant = 'default', className = '', onClick, ...props }) => {
  const baseClasses = 'rounded-lg shadow-card border border-white/20 transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white/90 backdrop-blur-sm',
    interactive: 'bg-white/90 backdrop-blur-sm hover:bg-white/95 hover:shadow-lg hover:-translate-y-1',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (onClick) {
    return (
      <button
        className={`${combinedClasses} p-6 text-left w-full`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={`${combinedClasses} p-6`} {...props}>
      {children}
    </div>
  );
};

export default Card;