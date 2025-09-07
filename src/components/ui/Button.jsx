import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', onClick, className = '', disabled = false, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-md hover:shadow-lg active:scale-[0.98]',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-600 shadow-md hover:shadow-lg active:scale-[0.98]',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 active:scale-[0.98]'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button 
      className={classes} 
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;