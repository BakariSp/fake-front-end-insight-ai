import React from 'react';
import styles from './Select.module.css';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  prefixIcon?: React.ReactNode;
  selectSize?: 'small' | 'medium' | 'large';
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    error, 
    helperText,
    fullWidth = false, 
    options, 
    prefixIcon,
    selectSize = 'medium',
    className = '', 
    ...props 
  }, ref) => {
    const selectClasses = [
      styles.select,
      selectSize === 'small' && styles.small,
      selectSize === 'large' && styles.large,
      error && styles.error,
      prefixIcon && styles.selectWithPrefix,
      className
    ].filter(Boolean).join(' ');

    const wrapperClasses = [
      styles.selectWrapper,
      fullWidth && styles.fullWidth
    ].filter(Boolean).join(' ');

    const containerClasses = [
      styles.selectContainer,
      fullWidth && styles.fullWidth
    ].filter(Boolean).join(' ');
    
    return (
      <div className={wrapperClasses}>
        {label && (
          <label className={styles.selectLabel}>
            {label}
          </label>
        )}
        <div className={containerClasses}>
          {prefixIcon && (
            <div className={styles.prefixIcon}>
              {prefixIcon}
            </div>
          )}
          <select
            ref={ref}
            className={selectClasses}
            {...props}
          >
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className={styles.selectIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path 
                d="M4 6l4 4 4-4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {error && (
          <div className={styles.errorMessage}>
            <svg 
              className={styles.errorIcon}
              viewBox="0 0 14 14" 
              fill="none"
            >
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 4v3M7 10v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}
        {helperText && !error && (
          <p className={styles.helperText}>{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;

