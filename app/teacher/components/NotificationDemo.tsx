'use client';

import React, { useState } from 'react';
import { NotificationBanner, NotificationBadge, useNotifications } from './notifications';
import type { BannerType, BadgeType } from './notifications';

/**
 * NotificationDemo Component
 * 
 * This component demonstrates how to use the notification system in your pages.
 * You can use this as a reference when implementing notifications in other parts of the app.
 */
const NotificationDemo: React.FC = () => {
  const { showToast, addNotification } = useNotifications();
  const [showBanner, setShowBanner] = useState(true);

  // Example: Show a toast notification
  const handleShowToast = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    showToast(type, message);
  };

  // Example: Add a new notification to the notification center
  const handleAddNotification = () => {
    addNotification({
      title: 'New Test Notification',
      description: 'This is a test notification created by the demo.',
      scope: 'personal',
      module: 'system',
      urgency: 'normal',
      action: {
        type: 'view',
        label: 'View',
      },
    });
    showToast('success', 'New notification added to Notification Center');
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>Notification System Demo</h2>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        This page demonstrates all notification components. Use these examples in your pages.
      </p>

      {/* Banner Examples */}
      <section style={{ marginBottom: '40px' }}>
        <h3>1. Notification Banners (Blocking/Important Messages)</h3>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
          Use banners for critical or important messages that need immediate attention.
        </p>
        
        {showBanner && (
          <NotificationBanner
            type="critical"
            title="Assignment Deadline Tonight!"
            message="Math homework 'Algebra Chapter 5' is due tonight at 23:59. 8 students haven't submitted yet."
            action={{
              label: 'View Assignment',
              onClick: () => {
                handleShowToast('info', 'Navigating to assignment...');
              },
            }}
            onClose={() => setShowBanner(false)}
          />
        )}

        <NotificationBanner
          type="important"
          title="Grade Submission Reminder"
          message="Final grades for Grade 11-B need to be submitted by this Friday."
          action={{
            label: 'Submit Grades',
            onClick: () => {
              handleShowToast('info', 'Opening grade submission...');
            },
          }}
        />

        <NotificationBanner
          type="info"
          title="System Maintenance Scheduled"
          message="The platform will undergo maintenance this Sunday from 2 AM to 6 AM."
        />

        <NotificationBanner
          type="success"
          title="All Assignments Graded"
          message="You have successfully graded all pending assignments for Grade 10-A."
        />
      </section>

      {/* Toast Examples */}
      <section style={{ marginBottom: '40px' }}>
        <h3>2. Toast Notifications (3-5 seconds, Auto-dismiss)</h3>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
          Use toasts for quick feedback messages (saved, loaded, error, etc.).
        </p>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleShowToast('success', 'Assignment saved successfully!')}
            style={{
              padding: '8px 16px',
              background: '#52C41A',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Show Success Toast
          </button>

          <button
            onClick={() => handleShowToast('error', 'Failed to upload file. Please try again.')}
            style={{
              padding: '8px 16px',
              background: '#FF4D4F',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Show Error Toast
          </button>

          <button
            onClick={() => handleShowToast('info', 'AI task added to queue')}
            style={{
              padding: '8px 16px',
              background: '#4F7FFF',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Show Info Toast
          </button>

          <button
            onClick={() => handleShowToast('warning', 'Some students have not viewed the material yet')}
            style={{
              padding: '8px 16px',
              background: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Show Warning Toast
          </button>
        </div>
      </section>

      {/* Badge Examples */}
      <section style={{ marginBottom: '40px' }}>
        <h3>3. Notification Badges (Row-level indicators)</h3>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
          Use badges in lists to indicate new, updated, or urgent items.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <NotificationBadge type="new" />
          <NotificationBadge type="updated" />
          <NotificationBadge type="invited" />
          <NotificationBadge type="urgent" />
          <NotificationBadge type="count" count={5} />
          <NotificationBadge type="count" count={99} />
          <NotificationBadge type="count" count={150} />
        </div>

        <div style={{ marginTop: '24px' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '12px' }}>Example Usage in a List:</h4>
          <div style={{ background: 'white', border: '1px solid #E8E8E8', borderRadius: '8px', overflow: 'hidden' }}>
            {[
              { title: 'New Assignment Posted', badge: 'new' as BadgeType },
              { title: 'Grades Updated for Quiz 5', badge: 'updated' as BadgeType },
              { title: 'Meeting Invitation: Parent-Teacher Conference', badge: 'invited' as BadgeType },
              { title: 'Urgent: Student Discipline Issue', badge: 'urgent' as BadgeType },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  borderBottom: idx < 3 ? '1px solid #E8E8E8' : 'none',
                }}
              >
                <span style={{ fontSize: '14px' }}>{item.title}</span>
                <NotificationBadge type={item.badge} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notification Center Demo */}
      <section style={{ marginBottom: '40px' }}>
        <h3>4. Notification Center (Bell Icon in Top Nav)</h3>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
          The notification center is accessible via the bell icon in the top navigation bar.
          Click it to see all notifications with filtering and management options.
        </p>
        
        <button
          onClick={handleAddNotification}
          style={{
            padding: '10px 20px',
            background: '#4F7FFF',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Add Test Notification to Center
        </button>
      </section>

      {/* Usage Guide */}
      <section style={{ marginBottom: '40px' }}>
        <h3>5. How to Use in Your Code</h3>
        <div style={{ background: '#F5F7FA', padding: '20px', borderRadius: '8px', fontSize: '13px', fontFamily: 'monospace' }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
{`// Import the notification hook
import { useNotifications } from '@/app/teacher/components/notifications';

// In your component
const { showToast, addNotification } = useNotifications();

// Show a toast
showToast('success', 'Data saved successfully!');

// Add a notification
addNotification({
  title: 'New Message',
  description: 'You have a new message from a parent.',
  scope: 'personal',
  module: 'communication',
  urgency: 'normal',
  action: {
    type: 'view',
    label: 'View Message',
  },
});`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default NotificationDemo;

