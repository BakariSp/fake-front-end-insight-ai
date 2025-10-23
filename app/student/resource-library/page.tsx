'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import MainLayout from '@layout/MainLayout';
import { Card, Button, Badge, SearchBar, Select } from '@ui';
import { mockMaterials, mockAIRecommendedResources, mockFavoriteResources, Material, Resource } from '@data/mockData';
import styles from './resourceLibrary.module.css';

const ResourceLibraryPage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('class');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Get unique subjects from materials
  const subjects = Array.from(new Set(mockMaterials.map(m => m.subject)));
  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    ...subjects.map(s => ({ value: s, label: s }))
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'pdf', label: 'PDF' },
    { value: 'video', label: 'Video' },
    { value: 'ppt', label: 'Presentation' },
    { value: 'doc', label: 'Document' },
    { value: 'link', label: 'Link' },
  ];

  // Filter resources
  const filterResources = (resources: (Material | Resource)[]) => {
    return resources.filter(resource => {
      const matchesSearch = !searchQuery || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      
      return matchesSearch && matchesSubject && matchesType;
    });
  };

  const filteredClassResources = filterResources(mockMaterials);
  const filteredAIResources = filterResources(mockAIRecommendedResources);
  const filteredFavorites = filterResources(mockFavoriteResources);

  // Get icon for file type
  const getFileIcon = (type: string) => {
    const icons: Record<string, React.ReactElement> = {
      pdf: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 2h7l4 4v11a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#E53E3E" strokeWidth="1.5" fill="none"/>
          <path d="M12 2v4h4" stroke="#E53E3E" strokeWidth="1.5" fill="none"/>
          <text x="6" y="14" fontSize="5" fill="#E53E3E" fontWeight="600">PDF</text>
        </svg>
      ),
      video: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="4" width="16" height="12" rx="1" stroke="#9B51E0" strokeWidth="1.5" fill="none"/>
          <path d="M8 7l5 3-5 3V7z" fill="#9B51E0"/>
        </svg>
      ),
      ppt: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 2h7l4 4v11a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#D97706" strokeWidth="1.5" fill="none"/>
          <path d="M12 2v4h4" stroke="#D97706" strokeWidth="1.5" fill="none"/>
          <text x="6" y="14" fontSize="5" fill="#D97706" fontWeight="600">PPT</text>
        </svg>
      ),
      doc: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 2h7l4 4v11a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
          <path d="M12 2v4h4M6 10h8M6 13h5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      link: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M9 6H5a3 3 0 000 6h4M11 14h4a3 3 0 000-6h-4M7 10h6" stroke="#059669" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    };
    return icons[type] || icons.pdf;
  };

  // Render resource card
  const renderResourceCard = (resource: Material | Resource, showRecommendation = false) => {
    const isResource = 'isFavorite' in resource;
    const res = resource as Resource;
    
    return (
      <Card key={resource.id} className={styles.resourceCard}>
        <div className={styles.resourceHeader}>
          <div className={styles.resourceIcon}>
            {getFileIcon(resource.type)}
          </div>
          <div className={styles.resourceMeta}>
            <Badge variant="secondary">{resource.subject}</Badge>
            <Badge variant="info">{resource.type.toUpperCase()}</Badge>
          </div>
        </div>

        <div className={styles.resourceContent}>
          <h3 className={styles.resourceTitle}>{resource.title}</h3>
          <p className={styles.resourceDescription}>{resource.description}</p>
          
          {showRecommendation && res.isAIRecommended && res.recommendationReason && (
            <div className={styles.aiRecommendation}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1l2 5h5l-4 3.5 2 5.5L8 11.5 3 15l2-5.5L1 6h5l2-5z" fill="var(--primary-500)"/>
              </svg>
              <span>{res.recommendationReason}</span>
            </div>
          )}

          {resource.tags && resource.tags.length > 0 && (
            <div className={styles.resourceTags}>
              {resource.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div className={styles.resourceFooter}>
          <div className={styles.resourceInfo}>
            <span className={styles.infoItem}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 12c0-2.2 2.2-4 5-4s5 1.8 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {resource.uploadedBy}
            </span>
            <span className={styles.infoItem}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="2" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 5h10M5 1v2M9 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {resource.uploadDate}
            </span>
            {resource.fileSize && (
              <span className={styles.infoItem}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4 2h4l3 3v6a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                {resource.fileSize}
              </span>
            )}
            {resource.downloads !== undefined && (
              <span className={styles.infoItem}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 3v6M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {resource.downloads} downloads
              </span>
            )}
          </div>
          <div className={styles.resourceActions}>
            <Button variant="secondary" size="small">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3.5C4 3.5 1.5 8 1.5 8s2.5 4.5 6.5 4.5 6.5-4.5 6.5-4.5-2.5-4.5-6.5-4.5z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Preview
            </Button>
            <Button variant="primary" size="small">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v6M5 6l3 3 3-3M2 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Download
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  const tabs = [
    { id: 'class', label: t('resourceLibrary.tabs.classResources') || 'Class Resources' },
    { id: 'ai', label: t('resourceLibrary.tabs.aiSuggested') || 'AI Suggested' },
    { id: 'favorites', label: t('resourceLibrary.tabs.myFavorites') || 'My Favorites' },
  ];

  return (
    <MainLayout>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>
            {t('resourceLibrary.title') || 'Resource Library'}
          </h1>
          <p className={styles.pageSubtitle}>
            Access all learning materials, AI recommendations, and saved resources
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterSearch}>
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources by title, description, or tags..."
          />
        </div>
        <div className={styles.filterSelects}>
          <Select
            options={subjectOptions}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          />
          <Select
            options={typeOptions}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {activeTab === 'class' && (
          <div className={styles.resourcesGrid}>
            {filteredClassResources.length > 0 ? (
              filteredClassResources.map(resource => renderResourceCard(resource))
            ) : (
              <div className={styles.emptyState}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <rect x="16" y="20" width="32" height="28" rx="2" stroke="var(--gray-300)" strokeWidth="2"/>
                  <path d="M24 28h16M24 36h12" stroke="var(--gray-300)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h3>No resources found</h3>
                <p>Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ai' && (
          <div>
            <div className={styles.aiHeader}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3 7h7l-6 5 3 8-7-5-7 5 3-8-6-5h7l3-7z" fill="var(--primary-500)"/>
              </svg>
              <div>
                <h2 className={styles.sectionTitle}>AI Recommended for You</h2>
                <p className={styles.sectionDescription}>
                  Personalized learning materials based on your performance and learning goals
                </p>
              </div>
            </div>
            <div className={styles.resourcesGrid}>
              {filteredAIResources.length > 0 ? (
                filteredAIResources.map(resource => renderResourceCard(resource, true))
              ) : (
                <div className={styles.emptyState}>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <path d="M32 8l8 18h18l-14 12 8 20-16-12-16 12 8-20-14-12h18l8-18z" stroke="var(--gray-300)" strokeWidth="2" fill="none"/>
                  </svg>
                  <h3>No AI recommendations available</h3>
                  <p>Complete more assignments to get personalized recommendations</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className={styles.resourcesGrid}>
            {filteredFavorites.length > 0 ? (
              filteredFavorites.map(resource => renderResourceCard(resource))
            ) : (
              <div className={styles.emptyState}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <path d="M32 12l8 16 18 2-13 13 3 18-16-9-16 9 3-18-13-13 18-2 8-16z" stroke="var(--gray-300)" strokeWidth="2" fill="none"/>
                </svg>
                <h3>No favorite resources yet</h3>
                <p>Start adding resources to your favorites to access them quickly</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className={styles.statistics}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 3h9l6 6v11a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="var(--primary-500)" strokeWidth="2"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{mockMaterials.length}</div>
            <div className={styles.statLabel}>Total Resources</div>
          </div>
        </Card>
        
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="6" width="16" height="12" rx="1" stroke="var(--success-500)" strokeWidth="2"/>
              <path d="M10 10l3 2-3 2v-4z" fill="var(--success-500)"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {mockMaterials.filter(m => m.type === 'video').length}
            </div>
            <div className={styles.statLabel}>Video Tutorials</div>
          </div>
        </Card>
        
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 4l6 12 6 2-11 11-11-11 6-2 4-12z" stroke="var(--warning-500)" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{mockAIRecommendedResources.length}</div>
            <div className={styles.statLabel}>AI Recommendations</div>
          </div>
        </Card>
        
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v2M5 8h2M5 16h2M8 19v2M16 5v2M19 8h2M19 16h2M16 19v2" stroke="var(--info-500)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {mockMaterials.reduce((sum, m) => sum + (m.downloads || 0), 0)}
            </div>
            <div className={styles.statLabel}>Total Downloads</div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ResourceLibraryPage;

