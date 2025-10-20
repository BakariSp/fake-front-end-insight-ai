import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth, icon, className = '', ...props }, ref) => {
    const baseStyles = 'h-10 px-3 text-sm border border-[var(--gray-300)] rounded bg-white text-[var(--gray-900)] placeholder:text-[var(--gray-500)] transition-all';
    const focusStyles = 'focus:outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)] focus:ring-opacity-20';
    const errorStyles = error ? 'border-[var(--error-red)] focus:border-[var(--error-red)] focus:ring-[var(--error-red)]' : '';
    const widthStyle = fullWidth ? 'w-full' : '';
    const iconPadding = icon ? 'pl-10' : '';
    
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-[var(--gray-900)] mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-500)]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`${baseStyles} ${focusStyles} ${errorStyles} ${widthStyle} ${iconPadding} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-xs text-[var(--error-red)]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

