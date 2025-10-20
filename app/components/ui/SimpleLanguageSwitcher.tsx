'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage, type Language } from '@/app/contexts/LanguageContext';
import styles from './LanguageSwitcher.module.css';

const languageOptions = [
  { value: 'en' as Language, label: 'English', flag: '🇺🇸' },
  { value: 'zh' as Language, label: '中文', flag: '🇨🇳' },
  { value: 'es' as Language, label: 'Español', flag: '🇪🇸' },
];

export default function SimpleLanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = languageOptions.find(opt => opt.value === language) || languageOptions[0];

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('language.select')}
      >
        <span className={styles.flag}>{currentOption.flag}</span>
        <span className={styles.localeName}>{currentOption.label}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            {t('language.select')}
          </div>
          {languageOptions.map((option) => (
            <button
              key={option.value}
              className={`${styles.option} ${
                option.value === language ? styles.optionActive : ''
              }`}
              onClick={() => handleLanguageChange(option.value)}
            >
              <span className={styles.flag}>{option.flag}</span>
              <span className={styles.optionName}>{option.label}</span>
              {option.value === language && (
                <svg
                  className={styles.checkIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 4L6 11.5L2.5 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

