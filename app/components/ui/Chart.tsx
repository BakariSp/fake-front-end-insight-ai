'use client';

import React from 'react';
import styles from './Chart.module.css';

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ChartProps {
  data: ChartDataPoint[];
  height?: number;
  color?: string;
  showTooltip?: boolean;
}

const Chart: React.FC<ChartProps> = ({
  data,
  height = 240,
  color = 'var(--primary-blue)',
  showTooltip = true,
}) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className={styles.emptyState}>
        No data available
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((point.value - minValue) / range) * 100;
    return { x, y, value: point.value, label: point.label };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className={styles.chartContainer} style={{ height }}>
      <div className={styles.chartWrapper}>
        {/* Background SVG for line and area */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className={styles.svg}
          style={{ display: 'block' }}
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="var(--gray-300)"
              strokeWidth="0.2"
            />
          ))}

          {/* Area fill */}
          <path
            d={`${pathData} L 100 100 L 0 100 Z`}
            fill={color}
            fillOpacity="0.1"
          />

          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Overlay circles as DOM elements */}
        {points.map((point, index) => (
          <div
            key={index}
            className={styles.dataPoint}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              backgroundColor: hoveredIndex === index ? color : 'white',
              borderColor: color,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}

        {/* Tooltip */}
        {showTooltip && hoveredIndex !== null && (
          <div
            className={styles.tooltip}
            style={{
              left: `${points[hoveredIndex].x}%`,
              top: `${points[hoveredIndex].y}%`,
            }}
          >
            <div className={styles.tooltipLabel}>{points[hoveredIndex].label}</div>
            <div className={styles.tooltipValue}>{points[hoveredIndex].value}%</div>
          </div>
        )}
      </div>

      {/* X-axis labels */}
      <div className={styles.labels}>
        {data.map((point, index) => (
          <span key={index} className={styles.label}>
            {point.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Chart;

