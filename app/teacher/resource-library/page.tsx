'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Card, Button, Badge, SearchBar, Select } from '@ui';
import {
  type TeacherResource,
  mockTeacherUploads,
  mockSchoolResources,
  mockTeacherAIResources,
  mockTeacherFavorites,
} from '@data/mockData';
import styles from './resourceLibrary.module.css';

const ResourceLibraryPage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('uploads');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'English', label: 'English' },
    { value: 'Science', label: 'Science' },
    { value: 'General', label: 'General' },
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
  const filterResources = (resources: TeacherResource[]) => {
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

  // Get icon for file type
  const getFileIcon = (type: string) => {
    const icons: Record<string, React.ReactElement> = {
      folder: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2 5c0-1.1.9-2 2-2h4l2 2h6c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V5z" stroke="#FAAD14" strokeWidth="1.5" fill="none"/>
          <path d="M2 8h16" stroke="#FAAD14" strokeWidth="1.5"/>
        </svg>
      ),
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
    return icons[type] || icons.doc;
  };

  // Render resource card
  const renderResourceCard = (resource: TeacherResource) => {
    const isFolder = resource.type === 'folder';
    
    const handleClick = () => {
      if (isFolder) {
        setCurrentFolder(resource.title);
      }
    };

    return (
      <Card 
        key={resource.id} 
        className={`${styles.resourceCard} ${isFolder ? styles.folderCard : ''}`}
        onClick={handleClick}
        style={{ cursor: isFolder ? 'pointer' : 'default' }}
      >
        <div className={styles.resourceHeader}>
          <div className={`${styles.resourceIcon} ${isFolder ? styles.folderIcon : ''}`}>
            {getFileIcon(resource.type)}
          </div>
          <div className={styles.resourceMeta}>
            {!isFolder && <Badge variant="secondary">{resource.subject}</Badge>}
            {!isFolder && <Badge variant="info">{resource.type.toUpperCase()}</Badge>}
            {resource.scope && !isFolder && (
              <Badge variant={resource.scope === 'personal' ? 'warning' : 'success'}>
                {resource.scope}
              </Badge>
            )}
            {isFolder && resource.itemCount && (
              <Badge variant="secondary">{resource.itemCount} items</Badge>
            )}
          </div>
        </div>

        <div className={styles.resourceContent}>
          <h3 className={styles.resourceTitle}>{resource.title}</h3>
          <p className={styles.resourceDescription}>{resource.description}</p>
          
          {resource.isAIRecommended && resource.recommendationReason && (
            <div className={styles.aiRecommendation}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1l2 5h5l-4 3.5 2 5.5L8 11.5 3 15l2-5.5L1 6h5l2-5z" fill="var(--primary-500)"/>
              </svg>
              <span>{resource.recommendationReason}</span>
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

        {!isFolder && (
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
                View
              </Button>
              <Button variant="primary" size="small">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v6M5 6l3 3 3-3M2 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Download
              </Button>
              <Button variant="ghost" size="small">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2l2 5 5 1-4 3.5 1 5.5-4-2.5-4 2.5 1-5.5-4-3.5 5-1 2-5z" stroke="currentColor" strokeWidth="1.5" fill={resource.isFavorite ? 'currentColor' : 'none'}/>
                </svg>
              </Button>
            </div>
          </div>
        )}
      </Card>
    );
  };

  const tabs = [
    { id: 'uploads', label: 'My Uploads', icon: '📁', count: mockTeacherUploads.length },
    { id: 'school', label: 'School Resources', icon: '🏫', count: mockSchoolResources.length },
    { id: 'ai', label: 'AI Recommended', icon: '✨', count: mockTeacherAIResources.length },
    { id: 'favorites', label: 'Favorites', icon: '⭐', count: mockTeacherFavorites.length },
  ];

  const getActiveResources = () => {
    let resources: TeacherResource[] = [];
    
    switch (activeTab) {
      case 'uploads':
        resources = mockTeacherUploads;
        break;
      case 'school':
        resources = mockSchoolResources;
        break;
      case 'ai':
        resources = mockTeacherAIResources;
        break;
      case 'favorites':
        resources = mockTeacherFavorites;
        break;
      default:
        return [];
    }

    // Filter by folder if inside a folder
    if (currentFolder) {
      resources = resources.filter(r => r.folder === currentFolder);
    } else if (activeTab === 'school') {
      // At root level of school resources, show only folders and files without folders
      resources = resources.filter(r => r.type === 'folder' || !r.folder);
    }

    return filterResources(resources);
  };

  const activeResources = getActiveResources();

  return (
    <div className={styles.pageContainer}>
      {/* Top Action Bar */}
      <div className={styles.actionBar}>
        <div className={styles.actionBarLeft}>
          {/* Folder Breadcrumb Navigation */}
          {currentFolder && activeTab === 'school' ? (
            <div className={styles.breadcrumbWrapper}>
              <button 
                className={styles.backButton}
                onClick={() => setCurrentFolder(null)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
              </button>
              <div className={styles.breadcrumbDivider}>/</div>
              <div className={styles.folderBreadcrumb}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 5c0-1.1.9-2 2-2h4l2 2h6c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V5z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                <span>{currentFolder}</span>
              </div>
            </div>
          ) : (
            <h1 className={styles.pageTitle}>Resource Library</h1>
          )}
        </div>
        <div className={styles.actionBarRight}>
          <Button variant="secondary" size="medium">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v6M5 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Import from Library
          </Button>
          <Button variant="primary" size="medium">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Upload New File
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                setCurrentFolder(null);
              }}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
              <span className={styles.tabCount}>({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <div className={styles.filtersBar}>
        <div className={styles.searchContainer}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search resources by title, description, or tags..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Content */}
      <div className={styles.content}>
        {/* Quick Stats - Only show on main views, not inside folders */}
        {!currentFolder && (
          <div className={styles.quickStats}>
            <div className={styles.quickStatItem}>
              <div className={styles.quickStatValue}>{mockTeacherUploads.length + mockSchoolResources.length}</div>
              <div className={styles.quickStatLabel}>Total Resources</div>
            </div>
            <div className={styles.quickStatItem}>
              <div className={styles.quickStatValue}>{mockTeacherAIResources.length}</div>
              <div className={styles.quickStatLabel}>AI Recommendations</div>
            </div>
            <div className={styles.quickStatItem}>
              <div className={styles.quickStatValue}>
                {(mockTeacherUploads.reduce((sum, m) => sum + (m.downloads || 0), 0))}
              </div>
              <div className={styles.quickStatLabel}>Total Downloads</div>
            </div>
            <div className={styles.quickStatItem}>
              <div className={styles.quickStatValue}>{mockTeacherFavorites.length}</div>
              <div className={styles.quickStatLabel}>Favorites</div>
            </div>
          </div>
        )}

        {activeTab === 'ai' && !currentFolder && (
          <div className={styles.aiHeader}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3 7h7l-6 5 3 8-7-5-7 5 3-8-6-5h7l3-7z" fill="var(--primary-500)"/>
            </svg>
            <div>
              <h2 className={styles.sectionTitle}>AI Recommended for You</h2>
              <p className={styles.sectionDescription}>
                Personalized teaching materials based on your class performance and teaching patterns
              </p>
            </div>
          </div>
        )}

        <div className={styles.resourcesGrid}>
          {activeResources.length > 0 ? (
            activeResources.map(resource => renderResourceCard(resource))
          ) : (
            <div className={styles.emptyState}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect x="16" y="20" width="32" height="28" rx="2" stroke="var(--gray-300)" strokeWidth="2"/>
                <path d="M24 28h16M24 36h12" stroke="var(--gray-300)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <h3>No resources found</h3>
              <p>Try adjusting your filters or upload new resources</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceLibraryPage;

