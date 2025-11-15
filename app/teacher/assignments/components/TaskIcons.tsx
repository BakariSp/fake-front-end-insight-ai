// Task Library Icons - SVG 图标组件
import React from 'react';
import { TaskType } from '../types';

interface TaskIconProps {
  type: TaskType;
  size?: number;
  color?: string;
}

export function TaskIcon({ type, size = 32, color = 'currentColor' }: TaskIconProps) {
  const icons: Record<TaskType, React.ReactElement> = {
    quiz: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect x="8" y="6" width="16" height="20" rx="2" stroke={color} strokeWidth="2"/>
        <circle cx="12" cy="11" r="1.5" fill={color}/>
        <circle cx="12" cy="16" r="1.5" fill={color}/>
        <circle cx="12" cy="21" r="1.5" fill={color}/>
        <path d="M16 11h6M16 16h6M16 21h6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'fill-blank': (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <path d="M6 8h20M6 16h20M6 24h20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="10" cy="8" r="2" fill={color}/>
        <circle cx="16" cy="16" r="2" fill={color}/>
        <circle cx="22" cy="24" r="2" fill={color}/>
      </svg>
    ),
    essay: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <path d="M8 4h12l4 4v20H8V4z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M20 4v4h4" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12 13h8M12 17h8M12 21h5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    scan: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect x="6" y="8" width="20" height="16" rx="2" stroke={color} strokeWidth="2"/>
        <circle cx="16" cy="16" r="4" stroke={color} strokeWidth="2"/>
        <circle cx="23" cy="12" r="1.5" fill={color}/>
      </svg>
    ),
    audio: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect x="13" y="6" width="6" height="12" rx="3" stroke={color} strokeWidth="2"/>
        <path d="M10 18c0 3.3 2.7 6 6 6s6-2.7 6-6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 24v4M12 28h8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    video: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect x="4" y="10" width="16" height="12" rx="2" stroke={color} strokeWidth="2"/>
        <path d="M20 14l8-4v12l-8-4z" fill={color}/>
      </svg>
    ),
    file: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <path d="M10 4h8l6 6v16H10V4z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M18 4v6h6" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M14 18h6M14 22h4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    group: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2"/>
        <circle cx="20" cy="10" r="3" stroke={color} strokeWidth="2"/>
        <path d="M6 24c0-3.3 2.7-6 6-6s6 2.7 6 6M14 24c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  };

  return icons[type] || icons.quiz;
}

// 获取图标颜色
export function getTaskColor(type: TaskType): string {
  const colors: Record<TaskType, string> = {
    quiz: '#4F7FFF',
    'fill-blank': '#6B8AFF',
    essay: '#3D6FE8',
    scan: '#5A7DFF',
    audio: '#7A9BFF',
    video: '#2E5FDB',
    file: '#6B7280',
    group: '#6B8AFF'
  };
  return colors[type] || '#6B7280';
}

