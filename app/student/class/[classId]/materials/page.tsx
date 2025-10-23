'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@layout/MainLayout';
import { Card, Button, SearchBar, Badge, Select } from '@ui';
import { mockMaterials, mockClasses } from '@data/mockData';
import type { Material } from '@data/mockData';
import styles from './materials.module.css';

const ClassMaterialsPage = () => {
  const params = useParams();
  const classId = params.classId as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState(classId);
  const [selectedType, setSelectedType] = useState('all');

  // Filter materials by class
  const classMaterials = mockMaterials.filter(m => m.classId === selectedClass);
  
  // Filter by search and type
  const filteredMaterials = classMaterials.filter(material => {
    const matchesSearch = 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'all' || material.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Get current class info
  const currentClass = mockClasses.find(c => c.id === selectedClass);

  // Get file type icon
  const getFileIcon = (type: Material['type']) => {
    switch (type) {
      case 'pdf':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#EF4444" fill="#FEE2E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2v6h6M10 13h4M10 17h4M10 9h1" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'video':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="16" rx="2" stroke="#8B5CF6" fill="#EDE9FE" strokeWidth="2"/>
            <path d="M10 8l6 4-6 4V8z" fill="#8B5CF6"/>
          </svg>
        );
      case 'ppt':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#F59E0B" fill="#FEF3C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2v6h6M10 12h4v4h-4z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'doc':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#3B82F6" fill="#DBEAFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2v6h6M10 13h4M10 17h4M10 9h1" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'link':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#10B981" fill="#D1FAE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  const getTypeBadgeColor = (type: Material['type']) => {
    switch (type) {
      case 'pdf': return 'error';
      case 'video': return 'default';
      case 'ppt': return 'warning';
      case 'doc': return 'info';
      case 'link': return 'success';
      default: return 'default';
    }
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.headerTitle}>Class Materials</h1>
            <p className={styles.headerDescription}>
              Access all learning resources shared by {currentClass?.teacher}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <Card className={styles.filterCard}>
        <div className={styles.filterContent}>
          <div className={styles.searchWrapper}>
            <SearchBar
              placeholder="Search materials by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              fullWidth
            />
          </div>
          <div className={styles.filterGroup}>
            <div className={styles.classFilters}>
              {mockClasses.map((cls) => (
                <Button
                  key={cls.id}
                  variant={selectedClass === cls.id ? 'primary' : 'ghost'}
                  size="medium"
                  onClick={() => setSelectedClass(cls.id)}
                >
                  {cls.name}
                </Button>
              ))}
            </div>
            <Select
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'pdf', label: 'PDF' },
                { value: 'video', label: 'Video' },
                { value: 'ppt', label: 'Presentation' },
                { value: 'doc', label: 'Document' },
                { value: 'link', label: 'Link' },
              ]}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.primary}`}>
            {classMaterials.length}
          </div>
          <div className={styles.statLabel}>Total Materials</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.blue}`}>
            {classMaterials.filter(m => m.type === 'pdf' || m.type === 'doc').length}
          </div>
          <div className={styles.statLabel}>Documents</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.purple}`}>
            {classMaterials.filter(m => m.type === 'video').length}
          </div>
          <div className={styles.statLabel}>Videos</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.green}`}>
            {classMaterials.reduce((acc, m) => acc + (m.downloads || 0), 0)}
          </div>
          <div className={styles.statLabel}>Total Downloads</div>
        </div>
      </div>

      {/* Materials List */}
      <div className={styles.materialsGrid}>
        {filteredMaterials.map((material) => (
          <Card key={material.id} className={styles.materialCard}>
            <div className={styles.materialHeader}>
              <div className={styles.materialIcon}>
                {getFileIcon(material.type)}
              </div>
              <div className={styles.materialMeta}>
                <Badge variant={getTypeBadgeColor(material.type) as any}>
                  {material.type.toUpperCase()}
                </Badge>
                <span className={styles.materialDate}>
                  {new Date(material.uploadDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
            
            <div className={styles.materialBody}>
              <h3 className={styles.materialTitle}>{material.title}</h3>
              <p className={styles.materialDescription}>{material.description}</p>
              
              {material.tags && material.tags.length > 0 && (
                <div className={styles.materialTags}>
                  {material.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.materialFooter}>
              <div className={styles.materialInfo}>
                <span className={styles.infoItem}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 11c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  {material.uploadedBy}
                </span>
                {material.fileSize && (
                  <span className={styles.infoItem}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M8 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M8 2v4h4" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    {material.fileSize}
                  </span>
                )}
                {material.downloads !== undefined && (
                  <span className={styles.infoItem}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2v8M4 7l3 3 3-3M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {material.downloads} downloads
                  </span>
                )}
              </div>
              
              <div className={styles.materialActions}>
                <Button 
                  variant="ghost" 
                  size="small"
                  onClick={() => alert(`Preview ${material.title}`)}
                >
                  Preview
                </Button>
                <Button 
                  variant="primary" 
                  size="small"
                  onClick={() => alert(`Download ${material.title}`)}
                >
                  {material.type === 'link' ? 'Open' : 'Download'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredMaterials.length === 0 && (
        <Card>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path d="M28 8H12a4 4 0 0 0-4 4v40a4 4 0 0 0 4 4h40a4 4 0 0 0 4-4V24z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M28 8v16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 32h24M20 42h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className={styles.emptyTitle}>No materials found</h3>
            <p className={styles.emptyDescription}>
              Try adjusting your search or filter criteria, or check back later for new materials.
            </p>
          </div>
        </Card>
      )}
    </MainLayout>
  );
};

export default ClassMaterialsPage;

