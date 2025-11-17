'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import MainLayout from '@layout/MainLayout';
import { Card, Button, Badge } from '@ui';
import styles from './resourceLibrary.module.css';

// ==================== Data Types ====================

interface ClassResource {
  resourceId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileSizeText: string;
  fileUrl: string;
  classId: string;
  className: string;
  subject: string;
  folderId?: string;
  folderPath: string;
  uploadedBy: string;
  uploaderName: string;
  uploadTime: Date;
  description?: string;
  tags?: string[];
  isStarred: boolean;
  downloadCount: number;
}

interface PersonalResource {
  resourceId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileSizeText: string;
  fileUrl: string;
  studentId: string;
  groupId?: string;
  groupPath: string;
  uploadTime: Date;
  lastModified: Date;
  isStarred: boolean;
  viewCount: number;
  sourceType: 'upload' | 'assignment' | 'import';
  relatedAssignmentId?: string;
}

interface ResourceFolder {
  folderId: string;
  folderName: string;
  parentFolderId?: string;
  classId: string;
  resourceCount: number;
  subfolderCount: number;
}

interface ResourceGroup {
  groupId: string;
  groupName: string;
  groupIcon: string;
  groupColor: string;
  parentGroupId?: string;
  studentId: string;
  resourceCount: number;
  subgroupCount: number;
  sortOrder: number;
}

// ==================== Mock Data ====================

const mockClassFolders: ResourceFolder[] = [
  { folderId: 'F001', folderName: 'Lecture Notes', classId: 'C001', resourceCount: 5, subfolderCount: 0 },
  { folderId: 'F002', folderName: 'Practice Papers', classId: 'C001', resourceCount: 8, subfolderCount: 1 },
  { folderId: 'F003', folderName: 'Past Papers', parentFolderId: 'F002', classId: 'C001', resourceCount: 4, subfolderCount: 0 },
];

const mockClassResources: ClassResource[] = [
  {
    resourceId: 'CR001',
    fileName: 'Chapter3_Introduction.pdf',
    fileType: 'pdf',
    fileSize: 2621440,
    fileSizeText: '2.5 MB',
    fileUrl: '/mock-files/chapter3_intro.pdf',
    classId: 'C001',
    className: 'Form 5A Mathematics',
    subject: 'Mathematics',
    folderId: 'F001',
    folderPath: '/Unit 3 - Functions/Lecture Notes',
    uploadedBy: 'T001',
    uploaderName: 'Mr. Wong',
    uploadTime: new Date('2024-11-10T14:30:00'),
    description: 'Chapter 3 Functions basic concepts',
    tags: ['Important', 'Exam Related'],
    isStarred: true,
    downloadCount: 5,
  },
  {
    resourceId: 'CR002',
    fileName: 'DSE2023_Math_Paper1.pdf',
    fileType: 'pdf',
    fileSize: 5242880,
    fileSizeText: '5 MB',
    fileUrl: '/mock-files/dse2023_math.pdf',
    classId: 'C001',
    className: 'Form 5A Mathematics',
    subject: 'Mathematics',
    folderId: 'F003',
    folderPath: '/Unit 3 - Functions/Practice Papers/Past Papers',
    uploadedBy: 'T001',
    uploaderName: 'Mr. Wong',
    uploadTime: new Date('2024-11-08T09:15:00'),
    description: '2023 DSE Math Paper 1',
    tags: ['Past Paper', 'DSE'],
    isStarred: false,
    downloadCount: 12,
  },
  {
    resourceId: 'CR003',
    fileName: 'Unit3_Practice_Set_1.pdf',
    fileType: 'pdf',
    fileSize: 1572864,
    fileSizeText: '1.5 MB',
    fileUrl: '/mock-files/practice1.pdf',
    classId: 'C001',
    className: 'Form 5A Mathematics',
    subject: 'Mathematics',
    folderId: 'F002',
    folderPath: '/Unit 3 - Functions/Practice Papers',
    uploadedBy: 'T001',
    uploaderName: 'Mr. Wong',
    uploadTime: new Date('2024-11-05T10:00:00'),
    tags: ['Practice'],
    isStarred: true,
    downloadCount: 8,
  },
];

const mockPersonalGroups: ResourceGroup[] = [
  { groupId: 'G001', groupName: 'Math Notes', groupIcon: '📚', groupColor: '#4A90E2', studentId: 'S001', resourceCount: 15, subgroupCount: 3, sortOrder: 1 },
  { groupId: 'G001-1', groupName: 'Chapter 3', groupIcon: '📖', groupColor: '#4A90E2', parentGroupId: 'G001', studentId: 'S001', resourceCount: 5, subgroupCount: 0, sortOrder: 3 },
  { groupId: 'G002', groupName: 'English Materials', groupIcon: '📝', groupColor: '#7ED321', studentId: 'S001', resourceCount: 12, subgroupCount: 0, sortOrder: 2 },
  { groupId: 'G003', groupName: 'Assignment Backups', groupIcon: '📥', groupColor: '#F5A623', studentId: 'S001', resourceCount: 8, subgroupCount: 0, sortOrder: 3 },
];

const mockPersonalResources: PersonalResource[] = [
  {
    resourceId: 'PR001',
    fileName: 'My_Chapter3_Notes.pdf',
    fileType: 'pdf',
    fileSize: 1572864,
    fileSizeText: '1.5 MB',
    fileUrl: '/mock-files/my_notes.pdf',
    studentId: 'S001',
    groupId: 'G001-1',
    groupPath: '/Math Notes/Chapter 3',
    uploadTime: new Date('2024-11-12T18:30:00'),
    lastModified: new Date('2024-11-13T20:15:00'),
    isStarred: true,
    viewCount: 8,
    sourceType: 'upload',
  },
  {
    resourceId: 'PR002',
    fileName: 'Assignment3_Submission.pdf',
    fileType: 'pdf',
    fileSize: 3145728,
    fileSizeText: '3 MB',
    fileUrl: '/mock-files/assignment3.pdf',
    studentId: 'S001',
    groupId: 'G003',
    groupPath: '/Assignment Backups',
    uploadTime: new Date('2024-11-10T23:45:00'),
    lastModified: new Date('2024-11-10T23:45:00'),
    isStarred: false,
    viewCount: 2,
    sourceType: 'assignment',
    relatedAssignmentId: 'A001',
  },
  {
    resourceId: 'PR003',
    fileName: 'Grammar_Summary.docx',
    fileType: 'doc',
    fileSize: 524288,
    fileSizeText: '512 KB',
    fileUrl: '/mock-files/grammar.docx',
    studentId: 'S001',
    groupId: 'G002',
    groupPath: '/English Materials',
    uploadTime: new Date('2024-11-08T15:20:00'),
    lastModified: new Date('2024-11-08T15:20:00'),
    isStarred: true,
    viewCount: 15,
    sourceType: 'upload',
  },
];

const ResourceLibraryPage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'class' | 'personal' | 'starred'>('class');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('name');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['F001', 'F002']);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['G001']);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [currentGroup, setCurrentGroup] = useState<string | null>(null);
  const [previewResource, setPreviewResource] = useState<ClassResource | PersonalResource | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  // Storage calculation (500MB total)
  const totalStorageMB = 500;
  const usedStorageMB = mockPersonalResources.reduce((sum, r) => sum + (r.fileSize / 1024 / 1024), 0);
  const usedPercentage = Math.round((usedStorageMB / totalStorageMB) * 100);

  // Toggle folder/group expansion
  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev =>
      prev.includes(folderId) ? prev.filter(id => id !== folderId) : [...prev, folderId]
    );
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  // Toggle star
  const toggleStar = (resourceId: string, type: 'class' | 'personal') => {
    if (type === 'class') {
      const resource = mockClassResources.find(r => r.resourceId === resourceId);
      if (resource) {
        resource.isStarred = !resource.isStarred;
        // Force re-render
        setSearchQuery(searchQuery + ' ');
        setTimeout(() => setSearchQuery(searchQuery.trim()), 0);
      }
    } else {
      const resource = mockPersonalResources.find(r => r.resourceId === resourceId);
      if (resource) {
        resource.isStarred = !resource.isStarred;
        setSearchQuery(searchQuery + ' ');
        setTimeout(() => setSearchQuery(searchQuery.trim()), 0);
      }
    }
  };

  // Handle preview
  const handlePreview = (resource: ClassResource | PersonalResource) => {
    setPreviewResource(resource);
  };

  // Handle download
  const handleDownload = (resource: ClassResource | PersonalResource) => {
    alert(`Downloading: ${resource.fileName}`);
    // In real app: window.open(resource.fileUrl, '_blank');
  };

  // Handle delete
  const handleDelete = (resourceId: string, type: 'class' | 'personal') => {
    if (confirm('Are you sure you want to delete this file?')) {
      alert(`Deleted: ${resourceId}`);
      // In real app: call delete API
    }
  };

  // Get breadcrumb path
  const getBreadcrumb = () => {
    if (activeTab === 'class') {
      if (currentFolder) {
        const folder = mockClassFolders.find(f => f.folderId === currentFolder);
        // Build path with parent folders
        const path = ['Class Resources'];
        if (folder) {
          if (folder.parentFolderId) {
            const parent = mockClassFolders.find(f => f.folderId === folder.parentFolderId);
            if (parent) path.push(parent.folderName);
          }
          path.push(folder.folderName);
        }
        return path;
      }
      return ['Class Resources', 'All Files'];
    }
    if (activeTab === 'personal') {
      if (currentGroup) {
        const group = mockPersonalGroups.find(g => g.groupId === currentGroup);
        const path = ['Personal Library'];
        if (group) {
          if (group.parentGroupId) {
            const parent = mockPersonalGroups.find(g => g.groupId === group.parentGroupId);
            if (parent) path.push(parent.groupName);
          }
          path.push(group.groupName);
        }
        return path;
      }
      return ['Personal Library', 'All Files'];
    }
    return ['Starred'];
  };

  // Get icon for file type
  const getFileIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      pdf: '📄',
      doc: '📝',
      ppt: '📊',
      image: '🖼️',
      video: '🎬',
      audio: '🎵',
      zip: '📦',
    };
    return iconMap[type] || '📄';
  };

  // Filter and sort resources
  const filterAndSortResources = <T extends ClassResource | PersonalResource>(
    resources: T[], 
    filterByFolder?: boolean,
    filterByGroup?: boolean
  ): T[] => {
    const filtered = resources.filter(resource => {
      const isClassResource = 'tags' in resource;
      
      // Filter by folder (for class resources)
      if (filterByFolder && currentFolder) {
        const classRes = resource as ClassResource;
        if (classRes.folderId !== currentFolder) return false;
      }
      
      // Filter by group (for personal resources)
      if (filterByGroup && currentGroup) {
        const personalRes = resource as PersonalResource;
        if (personalRes.groupId !== currentGroup) return false;
      }
      
      // Search filter
      const matchesSearch = !searchQuery || 
        resource.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (isClassResource && (resource as ClassResource).description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (isClassResource && (resource as ClassResource).tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      
      // Type filter
      const matchesType = selectedType === 'all' || resource.fileType === selectedType;
      
      return matchesSearch && matchesType;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.fileName.localeCompare(b.fileName);
      if (sortBy === 'date') return b.uploadTime.getTime() - a.uploadTime.getTime();
      if (sortBy === 'size') return b.fileSize - a.fileSize;
      return 0;
    });

    return filtered;
  };

  const filteredClassResources = filterAndSortResources(mockClassResources, true, false);
  const filteredPersonalResources = filterAndSortResources(mockPersonalResources, false, true);
  const starredResources = [
    ...mockClassResources.filter(r => r.isStarred),
    ...mockPersonalResources.filter(r => r.isStarred)
  ];

  // Get resource count for a folder
  const getFolderResourceCount = (folderId: string): number => {
    return mockClassResources.filter(r => r.folderId === folderId).length;
  };

  // Get resource count for a group
  const getGroupResourceCount = (groupId: string): number => {
    return mockPersonalResources.filter(r => r.groupId === groupId).length;
  };

  // Render sidebar folder tree
  const renderFolderTree = () => {
    const topLevelFolders = mockClassFolders.filter(f => !f.parentFolderId);
    
    const renderFolder = (folder: ResourceFolder, level = 0) => {
      const isExpanded = expandedFolders.includes(folder.folderId);
      const hasChildren = folder.subfolderCount > 0;
      const children = mockClassFolders.filter(f => f.parentFolderId === folder.folderId);
      const isSelected = currentFolder === folder.folderId;
      const resourceCount = getFolderResourceCount(folder.folderId);
      
      return (
        <div key={folder.folderId}>
          <button 
            className={`${styles.sidebarItem} ${isSelected ? styles.sidebarItemActive : ''}`}
            style={{ paddingLeft: `${level * 16 + 12}px` }}
            onClick={() => {
              if (hasChildren) toggleFolder(folder.folderId);
              setCurrentFolder(folder.folderId);
            }}
          >
            <span className={styles.sidebarIcon}>
              {hasChildren ? (isExpanded ? '📂' : '📁') : '📄'}
            </span>
            <span className={styles.sidebarLabel}>{folder.folderName}</span>
            <span className={styles.sidebarCount}>({resourceCount})</span>
          </button>
          {isExpanded && children.map(child => renderFolder(child, level + 1))}
        </div>
      );
    };
    
    return topLevelFolders.map(folder => renderFolder(folder));
  };

  // Render sidebar group tree
  const renderGroupTree = () => {
    const topLevelGroups = mockPersonalGroups.filter(g => !g.parentGroupId);
    
    const renderGroup = (group: ResourceGroup, level = 0) => {
      const isExpanded = expandedGroups.includes(group.groupId);
      const hasChildren = group.subgroupCount > 0;
      const children = mockPersonalGroups.filter(g => g.parentGroupId === group.groupId);
      const isSelected = currentGroup === group.groupId;
      const resourceCount = getGroupResourceCount(group.groupId);
      
      return (
        <div key={group.groupId}>
          <button 
            className={`${styles.sidebarItem} ${isSelected ? styles.sidebarItemActive : ''}`}
            style={{ 
              paddingLeft: `${level * 16 + 12}px`,
              borderLeft: `3px solid ${group.groupColor}`
            }}
            onClick={() => {
              if (hasChildren) toggleGroup(group.groupId);
              setCurrentGroup(group.groupId);
            }}
          >
            <span className={styles.sidebarIcon}>{group.groupIcon}</span>
            <span className={styles.sidebarLabel}>{group.groupName}</span>
            <span className={styles.sidebarCount}>({resourceCount})</span>
          </button>
          {isExpanded && children.map(child => renderGroup(child, level + 1))}
        </div>
      );
    };
    
    return topLevelGroups.map(group => renderGroup(group));
  };

  // Render resource row
  const renderResourceRow = (resource: ClassResource | PersonalResource, type: 'class' | 'personal') => {
    const isClass = 'className' in resource;
    const classResource = isClass ? (resource as ClassResource) : null;
    
    return (
      <div key={resource.resourceId} className={styles.resourceRow}>
        <div className={styles.resourceRowLeft}>
          <span className={styles.resourceRowIcon}>{getFileIcon(resource.fileType)}</span>
          <div className={styles.resourceRowInfo}>
            <div className={styles.resourceRowName}>{resource.fileName}</div>
            <div className={styles.resourceRowMeta}>
              {classResource && <span>{classResource.uploaderName}</span>}
              <span>{resource.uploadTime.toLocaleDateString()}</span>
              <span>{resource.fileSizeText}</span>
              {classResource && <span>{classResource.downloadCount} downloads</span>}
            </div>
          </div>
        </div>
        <div className={styles.resourceRowActions}>
          {classResource && classResource.tags && classResource.tags.length > 0 && (
            <div className={styles.resourceTags}>
              {classResource.tags.slice(0, 2).map((tag, idx) => (
                <Badge key={idx} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
          <button 
            className={`${styles.iconButton} ${resource.isStarred ? styles.starred : ''}`}
            onClick={() => toggleStar(resource.resourceId, type)}
            title={resource.isStarred ? 'Remove from starred' : 'Add to starred'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 2l2.5 5.5L18 8.5l-4.5 4 1.5 6.5-5-3-5 3 1.5-6.5L2 8.5l5.5-1L10 2z" 
                    fill={resource.isStarred ? 'currentColor' : 'none'} />
            </svg>
          </button>
          <button 
            className={styles.iconButton}
            onClick={() => handlePreview(resource)}
            title="Preview"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 4C6 4 2.5 10 2.5 10s3.5 6 7.5 6 7.5-6 7.5-6-3.5-6-7.5-6z" />
              <circle cx="10" cy="10" r="2" />
            </svg>
          </button>
          <button 
            className={styles.iconButton}
            onClick={() => handleDownload(resource)}
            title="Download"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 3v10M6 10l4 4 4-4M3 17h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {type === 'personal' && (
            <button 
              className={styles.iconButton}
              onClick={() => handleDelete(resource.resourceId, type)}
              title="Delete"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 5h14M8 5V3h4v2M16 5v11a1 1 0 01-1 1H5a1 1 0 01-1-1V5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  };

  // Render grid view
  const renderResourceGrid = (resource: ClassResource | PersonalResource, type: 'class' | 'personal') => {
    const isClass = 'className' in resource;
    
    return (
      <div key={resource.resourceId} className={styles.resourceCard}>
        <div className={styles.cardThumbnail}>
          <span className={styles.cardIcon}>{getFileIcon(resource.fileType)}</span>
          <button 
            className={`${styles.cardStarButton} ${resource.isStarred ? styles.starred : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleStar(resource.resourceId, type);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 1.5l2 4.5L15 6.5l-3.5 3 1 5-4.5-2.5-4.5 2.5 1-5L1 6.5l5-0.5 2-4.5z" 
                    fill={resource.isStarred ? 'currentColor' : 'none'} />
            </svg>
          </button>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardName}>{resource.fileName}</div>
          <div className={styles.cardMeta}>
            <span>{resource.fileSizeText}</span>
            <span>•</span>
            <span>{resource.uploadTime.toLocaleDateString()}</span>
          </div>
        </div>
        <div className={styles.cardActions}>
          <button className={styles.iconButton} onClick={() => handlePreview(resource)} title="Preview">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 3.5C5.5 3.5 2.5 9 2.5 9s3 5.5 6.5 5.5 6.5-5.5 6.5-5.5-3-5.5-6.5-5.5z" />
              <circle cx="9" cy="9" r="2" />
            </svg>
          </button>
          <button className={styles.iconButton} onClick={() => handleDownload(resource)} title="Download">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 3v9M6 9l3 3 3-3M3 15h12" strokeLinecap="round" />
            </svg>
          </button>
          {type === 'personal' && (
            <button className={styles.iconButton} onClick={() => handleDelete(resource.resourceId, type)} title="Delete">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 5h12M7 5V3h4v2M14 5v10H4V5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'class' as const, label: 'Class Resources', icon: '📚' },
    { id: 'personal' as const, label: 'Personal Library', icon: '📁' },
    { id: 'starred' as const, label: 'Starred', icon: '⭐' },
  ];

  return (
    <MainLayout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>
            <span className={styles.titleIcon}>📖</span>
            Resource Library
          </h1>
          <p className={styles.pageSubtitle}>
            Access class materials and manage your personal learning resources
          </p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                setCurrentFolder(null);
                setCurrentGroup(null);
              }}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            {activeTab === 'class' && (
              <>
                <div className={styles.sidebarSection}>
                  <h3 className={styles.sidebarTitle}>Classes</h3>
                  <button 
                    className={`${styles.sidebarItem} ${!currentFolder ? styles.sidebarItemActive : ''}`}
                    onClick={() => setCurrentFolder(null)}
                  >
                    <span className={styles.sidebarIcon}>📚</span>
                    <span className={styles.sidebarLabel}>All Classes</span>
                    <span className={styles.sidebarCount}>({mockClassResources.length})</span>
                  </button>
                </div>

                <div className={styles.sidebarSection}>
                  <h3 className={styles.sidebarTitle}>Folders</h3>
                  {renderFolderTree()}
                </div>
              </>
            )}

            {activeTab === 'personal' && (
              <>
                <div className={styles.sidebarSection}>
                  <div className={styles.sidebarHeader}>
                    <h3 className={styles.sidebarTitle}>My Groups</h3>
                    <button 
                      className={styles.addButton} 
                      title="New Group"
                      onClick={() => alert('Create new group')}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    className={`${styles.sidebarItem} ${!currentGroup ? styles.sidebarItemActive : ''}`}
                    onClick={() => setCurrentGroup(null)}
                  >
                    <span className={styles.sidebarIcon}>📂</span>
                    <span className={styles.sidebarLabel}>All Files</span>
                    <span className={styles.sidebarCount}>({mockPersonalResources.length})</span>
                  </button>
                  {renderGroupTree()}
                </div>

                <div className={styles.sidebarSection}>
                  <h3 className={styles.sidebarTitle}>Quick Access</h3>
                  <button className={styles.sidebarItem} onClick={() => setActiveTab('starred')}>
                    <span className={styles.sidebarIcon}>⭐</span>
                    <span className={styles.sidebarLabel}>Starred</span>
                    <span className={styles.sidebarCount}>({mockPersonalResources.filter(r => r.isStarred).length})</span>
                  </button>
                </div>

                <div className={styles.sidebarSection}>
                  <h3 className={styles.sidebarTitle}>Storage</h3>
                  <div className={styles.storageInfo}>
                    <div className={styles.storageBar}>
                      <div 
                        className={styles.storageBarFill} 
                        style={{ width: `${usedPercentage}%` }}
                      />
                    </div>
                    <div className={styles.storageText}>
                      {usedStorageMB.toFixed(1)} MB / {totalStorageMB} MB
                    </div>
                    <div className={styles.storagePercentage}>
                      {usedPercentage}% used
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'starred' && (
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Starred Items</h3>
                <div className={styles.sidebarItem}>
                  <span className={styles.sidebarIcon}>📚</span>
                  <span className={styles.sidebarLabel}>Class</span>
                  <span className={styles.sidebarCount}>({mockClassResources.filter(r => r.isStarred).length})</span>
                </div>
                <div className={styles.sidebarItem}>
                  <span className={styles.sidebarIcon}>📁</span>
                  <span className={styles.sidebarLabel}>Personal</span>
                  <span className={styles.sidebarCount}>({mockPersonalResources.filter(r => r.isStarred).length})</span>
                </div>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className={styles.contentArea}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
              {getBreadcrumb().map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className={styles.breadcrumbSeparator}>/</span>}
                  <span className={styles.breadcrumbItem}>{crumb}</span>
                </React.Fragment>
              ))}
            </div>

            {/* Toolbar */}
            <div className={styles.toolbar}>
              <div className={styles.toolbarLeft}>
                <input 
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className={styles.toolbarRight}>
                <select 
                  className={styles.filterSelect}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'date' | 'size')}
                  title="Sort by"
                >
                  <option value="name">Name</option>
                  <option value="date">Date</option>
                  <option value="size">Size</option>
                </select>
                
                <select 
                  className={styles.filterSelect}
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  title="File type"
                >
                  <option value="all">All Types</option>
                  <option value="pdf">PDF</option>
                  <option value="doc">Document</option>
                  <option value="ppt">Presentation</option>
                </select>

                <div className={styles.viewToggle}>
                  <button 
                    className={`${styles.viewButton} ${viewMode === 'list' ? styles.viewButtonActive : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List view"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button 
                    className={`${styles.viewButton} ${viewMode === 'grid' ? styles.viewButtonActive : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid view"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="5" height="5" />
                      <rect x="12" y="3" width="5" height="5" />
                      <rect x="3" y="12" width="5" height="5" />
                      <rect x="12" y="12" width="5" height="5" />
                    </svg>
                  </button>
                </div>

                {activeTab === 'personal' && (
                  <button 
                    className={styles.uploadButton}
                    onClick={() => setShowUploadDialog(true)}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 3v10M6 10l4-4 4 4M3 17h14" strokeLinecap="round" />
                    </svg>
                    Upload
                  </button>
                )}
              </div>
            </div>

            {/* Resource List/Grid */}
            <div className={viewMode === 'list' ? styles.resourceList : styles.resourceGrid}>
              {activeTab === 'class' && (
                <>
                  {filteredClassResources.length > 0 ? (
                    filteredClassResources.map(resource => 
                      viewMode === 'list' 
                        ? renderResourceRow(resource, 'class')
                        : renderResourceGrid(resource, 'class')
                    )
                  ) : (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>📂</div>
                      <h3>
                        {currentFolder 
                          ? 'This folder is empty'
                          : searchQuery 
                            ? 'No resources found' 
                            : 'No class resources yet'}
                      </h3>
                      <p>
                        {currentFolder 
                          ? 'Select another folder or clear filters'
                          : searchQuery
                            ? 'Try adjusting your search or filters'
                            : 'Resources shared by teachers will appear here'}
                      </p>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'personal' && (
                <>
                  {filteredPersonalResources.length > 0 ? (
                    filteredPersonalResources.map(resource => 
                      viewMode === 'list'
                        ? renderResourceRow(resource, 'personal')
                        : renderResourceGrid(resource, 'personal')
                    )
                  ) : (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>📁</div>
                      <h3>
                        {currentGroup 
                          ? 'This group is empty'
                          : searchQuery 
                            ? 'No files found' 
                            : 'No personal files yet'}
                      </h3>
                      <p>
                        {currentGroup 
                          ? 'Upload files to this group or select another one'
                          : searchQuery
                            ? 'Try adjusting your search or filters'
                            : 'Upload your first file to get started'}
                      </p>
                      <button 
                        className={styles.uploadButton}
                        onClick={() => setShowUploadDialog(true)}
                      >
                        Upload File
                      </button>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'starred' && (
                <>
                  {starredResources.length > 0 ? (
                    <>
                      {mockClassResources.filter(r => r.isStarred).length > 0 && (
                        <>
                          <h3 className={styles.sectionHeading}>Class Resources</h3>
                          {mockClassResources.filter(r => r.isStarred).map(resource => 
                            viewMode === 'list'
                              ? renderResourceRow(resource, 'class')
                              : renderResourceGrid(resource, 'class')
                          )}
                        </>
                      )}
                      
                      {mockPersonalResources.filter(r => r.isStarred).length > 0 && (
                        <>
                          <h3 className={styles.sectionHeading}>Personal Files</h3>
                          {mockPersonalResources.filter(r => r.isStarred).map(resource => 
                            viewMode === 'list'
                              ? renderResourceRow(resource, 'personal')
                              : renderResourceGrid(resource, 'personal')
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>⭐</div>
                      <h3>No starred resources yet</h3>
                      <p>Star resources to access them quickly</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewResource && (
        <div className={styles.modal} onClick={() => setPreviewResource(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{previewResource.fileName}</h2>
              <button 
                className={styles.modalClose}
                onClick={() => setPreviewResource(null)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.previewPlaceholder}>
                <div className={styles.previewIcon}>{getFileIcon(previewResource.fileType)}</div>
                <p>File preview: {previewResource.fileName}</p>
                <p className={styles.previewMeta}>
                  {previewResource.fileSizeText} • {previewResource.uploadTime.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={styles.modalButton}
                onClick={() => handleDownload(previewResource)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 3v10M6 10l4 4 4-4M3 17h14" strokeLinecap="round" />
                </svg>
                Download
              </button>
              <button 
                className={styles.modalButton}
                onClick={() => setPreviewResource(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Dialog */}
      {showUploadDialog && (
        <div className={styles.modal} onClick={() => setShowUploadDialog(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Upload Files</h2>
              <button 
                className={styles.modalClose}
                onClick={() => setShowUploadDialog(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.uploadArea}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M32 16v24M20 28l12-12 12 12M16 48h32" strokeLinecap="round" />
                </svg>
                <p>Drag files here or click to browse</p>
                <input 
                  type="file" 
                  multiple 
                  style={{ display: 'none' }} 
                  id="fileInput"
                  onChange={(e) => {
                    alert(`Selected ${e.target.files?.length} files`);
                    setShowUploadDialog(false);
                  }}
                />
                <label htmlFor="fileInput" className={styles.uploadButton}>
                  Choose Files
                </label>
              </div>
              <div className={styles.uploadInfo}>
                <p>Max file size: 50 MB</p>
                <p>Storage available: {(totalStorageMB - usedStorageMB).toFixed(1)} MB</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ResourceLibraryPage;
