'use client';

import React from 'react';
import styles from './about.module.css';

const AboutPage = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutCard}>
        {/* Header with Logo */}
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={styles.logo}>
              <rect width="48" height="48" rx="12" fill="url(#gradient)" />
              <path 
                d="M24 14v20M24 14l-6 6M24 14l6 6M16 28l8 6 8-6" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className={styles.productName}>Insight AI</h1>
        </div>

        {/* Version Info */}
        <div className={styles.versionSection}>
          <div className={styles.versionInfo}>
            <span className={styles.versionBadge}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 11L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="8" cy="5" r="0.5" fill="currentColor"/>
              </svg>
              Up to date
            </span>
            <p className={styles.versionText}>Version 1.0.0 (Beta)</p>
          </div>
        </div>

        {/* Links Section */}
        <div className={styles.linksSection}>
          <a href="#" className={styles.linkItem}>
            <span>Get help with Insight AI</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          
          <a href="#" className={styles.linkItem}>
            <span>Report an issue</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          <a href="#" className={styles.linkItem}>
            <span>Send feedback</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          
          <a href="#" className={styles.linkItem}>
            <span>Privacy policy</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Footer Section */}
      <div className={styles.footer}>
        <div className={styles.footerCard}>
          <h2 className={styles.footerTitle}>Insight AI</h2>
          <p className={styles.copyright}>
            Copyright 2025 Insight AI Team. All rights reserved.
          </p>
          <p className={styles.openSource}>
            Insight AI is built with{' '}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
              Next.js
            </a>{' '}
            and other{' '}
            <a href="#" target="_blank" rel="noopener noreferrer">
              open source software
            </a>
            .
          </p>
          <a href="#" className={styles.termsLink}>
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

