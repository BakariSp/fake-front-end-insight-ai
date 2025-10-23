'use client';

import React from 'react';
import Input from './Input';
import Select from './Select';
import Card from './Card';

/**
 * InputExamples - A showcase component demonstrating all Input and Select features
 * This component is for development/testing purposes to visualize the improvements
 */
export default function InputExamples() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const validateEmail = (value: string) => {
    if (!value) return '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? '' : 'Please enter a valid email address';
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>
        Form Components Showcase
      </h1>
      <p style={{ color: 'var(--gray-600)', marginBottom: '32px' }}>
        Demonstrating the improved Input and Select components with various states and features
      </p>

      {/* Basic Inputs */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
            Basic Inputs
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <Input
              label="Full Name"
              placeholder="John Doe"
              fullWidth
            />
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              fullWidth
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 000-0000"
              fullWidth
            />
            <Input
              label="Website"
              placeholder="https://www.example.com"
              helperText="Include the full URL"
              fullWidth
            />
          </div>
        </div>
      </Card>

      {/* Required Fields */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
            Required Fields (with asterisk indicator)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <Input
              label="Username"
              placeholder="Enter username"
              required
              fullWidth
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              required
              fullWidth
            />
          </div>
        </div>
      </Card>

      {/* Inputs with Errors */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
            Error States
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <Input
              label="Email"
              type="email"
              defaultValue="invalid-email"
              error="Please enter a valid email address"
              fullWidth
            />
            <Input
              label="Age"
              type="number"
              defaultValue="-5"
              error="Age must be a positive number"
              fullWidth
            />
          </div>
        </div>
      </Card>

      {/* Size Variants */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
            Size Variants
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input
              label="Small Input"
              inputSize="small"
              placeholder="Small size (36px)"
              fullWidth
            />
            <Input
              label="Medium Input (Default)"
              inputSize="medium"
              placeholder="Medium size (44px)"
              fullWidth
            />
            <Input
              label="Large Input"
              inputSize="large"
              placeholder="Large size (52px)"
              fullWidth
            />
          </div>
        </div>
      </Card>

      {/* Date Inputs */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
            Date & Time Inputs
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <Input
              label="Start Date"
              type="date"
              defaultValue="2025-09-01"
              required
              fullWidth
            />
            <Input
              label="End Date"
              type="date"
              defaultValue="2026-06-30"
              required
              fullWidth
            />
            <Input
              label="Meeting Time"
              type="time"
              defaultValue="14:30"
              fullWidth
            />
            <Input
              label="Event DateTime"
              type="datetime-local"
              fullWidth
            />
          </div>
        </div>
      </Card>

      {/* Textarea */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
            Textarea Variant
          </h2>
          <Input
            label="Description"
            isTextarea
            placeholder="Enter a detailed description..."
            helperText="Maximum 500 characters"
            fullWidth
          />
        </div>
      </Card>

      {/* Disabled State */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
            Disabled State
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <Input
              label="Disabled Input"
              defaultValue="This field is disabled"
              disabled
              fullWidth
            />
            <Input
              label="Read-only Input"
              defaultValue="Read-only value"
              readOnly
              fullWidth
            />
          </div>
        </div>
      </Card>

      {/* Select Components */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
            Select Dropdowns
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <Select
              label="Grade Level"
              options={[
                { value: '', label: 'Select grade...' },
                { value: '1', label: 'Grade 1' },
                { value: '2', label: 'Grade 2' },
                { value: '3', label: 'Grade 3' },
                { value: '4', label: 'Grade 4' },
                { value: '5', label: 'Grade 5' },
              ]}
              required
              fullWidth
            />
            <Select
              label="Country"
              options={[
                { value: '', label: 'Select country...' },
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'ca', label: 'Canada' },
                { value: 'au', label: 'Australia' },
              ]}
              fullWidth
            />
            <Select
              label="Status"
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'pending', label: 'Pending' },
              ]}
              defaultValue="active"
              helperText="Current account status"
              fullWidth
            />
            <Select
              label="Disabled Select"
              options={[
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
              ]}
              disabled
              fullWidth
            />
          </div>
        </div>
      </Card>

      {/* Interactive Example */}
      <Card>
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
            Interactive Example (with validation)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={validateEmail(email)}
              required
              fullWidth
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={password && password.length < 8 ? 'Password must be at least 8 characters' : ''}
              helperText={!password ? 'Minimum 8 characters' : ''}
              required
              fullWidth
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

