import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  inputSize?: 'small' | 'medium' | 'large';
  isTextarea?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText,
    fullWidth = false, 
    icon, 
    inputSize = 'medium',
    isTextarea = false,
    className = '', 
    required,
    ...props 
  }, ref) => {
    const inputClasses = [
      styles.input,
      fullWidth && styles.fullWidth,
      icon && styles.hasIcon,
      error && styles.hasError,
      inputSize !== 'medium' && styles[inputSize],
      isTextarea && styles.textarea,
      className
    ].filter(Boolean).join(' ');

    const wrapperClasses = [
      styles.inputWrapper,
      fullWidth && styles.fullWidth
    ].filter(Boolean).join(' ');

    const labelClasses = [
      styles.label,
      required && styles.labelRequired
    ].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className={labelClasses}>
            {label}
          </label>
        )}
        <div className={styles.inputContainer}>
          {isTextarea ? (
            <textarea
              ref={ref as any}
              className={inputClasses}
              {...(props as any)}
            />
          ) : (
            <input
              ref={ref}
              className={inputClasses}
              {...props}
            />
          )}
          {icon && (
            <div className={styles.iconWrapper}>
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className={styles.errorMessage}>{error}</p>
        )}
        {helperText && !error && (
          <p className={styles.helperText}>{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

