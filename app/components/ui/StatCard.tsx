import React from 'react';
import Card from './Card';
import styles from './StatCard.module.css';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = 'var(--primary-blue)',
  className = '',
}) => {
  return (
    <Card className={`${styles.statCard} ${className}`} padding="medium">
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <div className={styles.valueContainer}>
            <h3 className={styles.value}>{value}</h3>
            {trend && (
              <span className={`${styles.trend} ${trend.isPositive ? styles.positive : styles.negative}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div
            className={styles.iconContainer}
            style={{ backgroundColor: `${color}15`, color }}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;

