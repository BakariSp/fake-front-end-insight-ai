'use client';

import React from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import TabNav from '../../components/ui/TabNav';
import styles from './permissions.module.css';

export default function PermissionsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState('roles');

  // Roles Data
  const roles = [
    {
      id: 1,
      nameKey: 'admin.permissions.roles.superAdmin',
      permissionsKey: 'admin.permissions.allPermissions',
      users: 2,
      editable: false,
      color: '#FF4D4F',
    },
    {
      id: 2,
      nameKey: 'admin.permissions.roles.schoolAdmin',
      permissionsKey: 'admin.permissions.schoolManagement',
      users: 5,
      editable: true,
      color: '#4F7FFF',
    },
    {
      id: 3,
      nameKey: 'admin.permissions.roles.gradeCoordinator',
      permissionsKey: 'admin.permissions.gradeLevel',
      users: 8,
      editable: true,
      color: '#9254DE',
    },
    {
      id: 4,
      nameKey: 'admin.permissions.roles.teacher',
      permissionsKey: 'admin.permissions.classManagement',
      users: 82,
      editable: true,
      color: '#52C41A',
    },
    {
      id: 5,
      nameKey: 'admin.permissions.roles.parent',
      permissionsKey: 'admin.permissions.childInfoView',
      users: 1890,
      editable: false,
      color: '#13C2C2',
    },
    {
      id: 6,
      nameKey: 'admin.permissions.roles.student',
      permissionsKey: 'admin.permissions.selfInfoView',
      users: 1245,
      editable: false,
      color: '#FAAD14',
    },
  ];

  // User Permissions Data
  const userPermissions = [
    {
      id: 1,
      name: '张校长',
      email: 'zhang@school.edu',
      roleKey: 'admin.permissions.roles.schoolAdmin',
      extra: t('admin.permissions.userTable.none'),
      lastLogin: '2025/10/18 09:23',
    },
    {
      id: 2,
      name: '李主任',
      email: 'li@school.edu',
      roleKey: 'admin.permissions.roles.gradeCoordinator',
      extra: '9-12年级',
      lastLogin: '2025/10/18 08:45',
    },
    {
      id: 3,
      name: '王老师',
      email: 'wang@school.edu',
      roleKey: 'admin.permissions.roles.teacher',
      extra: '6A, 6B班',
      lastLogin: '2025/10/17 16:30',
    },
  ];

  // Audit Logs Data
  const auditLogs = [
    {
      id: 1,
      time: '2025/10/18 10:15',
      operator: '张校长',
      actionKey: 'admin.permissions.audit.roleChange',
      target: '王老师',
      change: '教师 → 年级协调员',
      ip: '192.168.1.100',
      type: 'role_change',
    },
    {
      id: 2,
      time: '2025/10/17 14:30',
      operator: '张校长',
      actionKey: 'admin.permissions.audit.permissionGrant',
      target: '李主任',
      change: '添加9年级访问权',
      ip: '192.168.1.100',
      type: 'permission_grant',
    },
    {
      id: 3,
      time: '2025/10/16 09:20',
      operator: t('admin.permissions.audit.system'),
      actionKey: 'admin.permissions.audit.permissionExpired',
      target: '陈老师',
      change: '临时权限到期',
      ip: t('admin.permissions.audit.systemAuto'),
      type: 'permission_expired',
    },
  ];

  // Permission Matrix
  const permissionMatrix = [
    { moduleKey: 'admin.permissions.modules.dashboard', superAdmin: true, schoolAdmin: true, coordinator: true, teacher: true, parent: true, student: true },
    { moduleKey: 'admin.permissions.modules.notifications', superAdmin: true, schoolAdmin: true, coordinator: true, teacher: false, parent: false, student: false },
    { moduleKey: 'admin.permissions.modules.permissions', superAdmin: true, schoolAdmin: true, coordinator: false, teacher: false, parent: false, student: false },
    { moduleKey: 'admin.permissions.modules.users', superAdmin: true, schoolAdmin: true, coordinator: 'limited', teacher: false, parent: false, student: false },
    { moduleKey: 'admin.permissions.modules.classes', superAdmin: true, schoolAdmin: true, coordinator: true, teacher: 'limited', parent: 'read', student: 'read' },
    { moduleKey: 'admin.permissions.modules.reports', superAdmin: true, schoolAdmin: true, coordinator: true, teacher: 'limited', parent: 'read', student: false },
    { moduleKey: 'admin.permissions.modules.settings', superAdmin: true, schoolAdmin: true, coordinator: false, teacher: false, parent: false, student: false },
  ];

  const getPermissionIcon = (value: boolean | string) => {
    if (value === true) return '✓';
    if (value === 'limited') return '~';
    if (value === 'read') return 'R';
    return '✗';
  };

  const getPermissionColor = (value: boolean | string) => {
    if (value === true) return 'var(--success-green)';
    if (value === 'limited') return 'var(--warning-orange)';
    if (value === 'read') return 'var(--primary-blue)';
    return 'var(--gray-400)';
  };

  return (
    <div className={styles.permissionsPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{t('admin.permissions.title')}</h1>
          <p className={styles.subtitle}>{t('admin.permissions.subtitle')}</p>
        </div>
        <Button variant="primary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <path d="M8 3v10M3 8h10" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>{t('admin.permissions.createRole')}</span>
        </Button>
      </div>

      <TabNav
        tabs={[
          { 
            id: 'roles', 
            label: t('admin.permissions.roleManagement'),
            icon: (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor">
                <path d="M9 2l2 4 4 .5-3 3 .5 4-3.5-2-3.5 2 .5-4-3-3 4-.5 2-4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )
          },
          { 
            id: 'users', 
            label: t('admin.permissions.userPermissions'),
            icon: (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor">
                <circle cx="9" cy="6" r="2.5" strokeWidth="1.5"/>
                <path d="M3 15c0-2.5 2-4.5 6-4.5s6 2 6 4.5" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="14" cy="6" r="2" strokeWidth="1.5"/>
              </svg>
            )
          },
          { 
            id: 'audit', 
            label: t('admin.permissions.auditLog'),
            icon: (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="12" height="12" rx="1" strokeWidth="1.5"/>
                <path d="M6 7h6M6 10h4" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )
          },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'roles' && (
        <section className={styles.section}>
          <div className={styles.rolesGrid}>
            {roles.map((role) => (
              <Card key={role.id} className={styles.roleCard} hover>
                <div
                  className={styles.roleHeader}
                  style={{ background: `${role.color}20`, borderLeft: `4px solid ${role.color}` }}
                >
                  <div className={styles.roleInfo}>
                    <h3 className={styles.roleName}>{t(role.nameKey)}</h3>
                  </div>
                  <div className={styles.roleCount} style={{ color: role.color }}>
                    {role.users} {t('admin.permissions.people')}
                  </div>
                </div>
                <div className={styles.roleContent}>
                  <div className={styles.rolePermissions}>
                    <span className={styles.permissionLabel}>{t('admin.permissions.permissionScope')}：</span>
                    <span className={styles.permissionValue}>{t(role.permissionsKey)}</span>
                  </div>
                  <div className={styles.roleActions}>
                    <Button variant="ghost" size="small" fullWidth>
                      {t('admin.permissions.viewDetails')}
                    </Button>
                    {role.editable && (
                      <>
                        <Button variant="ghost" size="small" fullWidth>
                          {t('admin.permissions.editPermissions')}
                        </Button>
                        <Button variant="ghost" size="small" fullWidth>
                          {t('admin.permissions.assignUsers')}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className={styles.matrixCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{t('admin.permissions.permissionMatrix')}</h2>
              <p className={styles.cardSubtitle}>
                {t('admin.permissions.legendText')}
              </p>
            </div>
            <div className={styles.matrixTable}>
              <table>
                <thead>
                  <tr>
                    <th>{t('admin.permissions.modules.dashboard')}</th>
                    <th>{t('admin.permissions.roles.superAdmin')}</th>
                    <th>{t('admin.permissions.roles.schoolAdmin')}</th>
                    <th>{t('admin.permissions.roles.gradeCoordinator')}</th>
                    <th>{t('admin.permissions.roles.teacher')}</th>
                    <th>{t('admin.permissions.roles.parent')}</th>
                    <th>{t('admin.permissions.roles.student')}</th>
                  </tr>
                </thead>
                <tbody>
                  {permissionMatrix.map((row, index) => (
                    <tr key={index}>
                      <td className={styles.moduleCell}>{t(row.moduleKey)}</td>
                      <td style={{ color: getPermissionColor(row.superAdmin) }}>
                        {getPermissionIcon(row.superAdmin)}
                      </td>
                      <td style={{ color: getPermissionColor(row.schoolAdmin) }}>
                        {getPermissionIcon(row.schoolAdmin)}
                      </td>
                      <td style={{ color: getPermissionColor(row.coordinator) }}>
                        {getPermissionIcon(row.coordinator)}
                      </td>
                      <td style={{ color: getPermissionColor(row.teacher) }}>
                        {getPermissionIcon(row.teacher)}
                      </td>
                      <td style={{ color: getPermissionColor(row.parent) }}>
                        {getPermissionIcon(row.parent)}
                      </td>
                      <td style={{ color: getPermissionColor(row.student) }}>
                        {getPermissionIcon(row.student)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      )}

      {activeTab === 'users' && (
        <section className={styles.section}>
          <div className={styles.filters}>
            <input
              type="text"
              placeholder={t('admin.permissions.userTable.searchPlaceholder')}
              className={styles.searchInput}
            />
            <select className={styles.filterSelect}>
              <option>{t('admin.permissions.userTable.allRoles')}</option>
              <option>{t('admin.permissions.roles.superAdmin')}</option>
              <option>{t('admin.permissions.roles.schoolAdmin')}</option>
              <option>{t('admin.permissions.roles.gradeCoordinator')}</option>
              <option>{t('admin.permissions.roles.teacher')}</option>
            </select>
            <Button variant="secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                <path d="M8 2v12M2 8h12M11 5l3 3-3 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{t('admin.permissions.userTable.exportReport')}</span>
            </Button>
          </div>

          <Card>
            <div className={styles.userTable}>
              <table>
                <thead>
                  <tr>
                    <th>{t('admin.permissions.userTable.userName')}</th>
                    <th>{t('admin.permissions.userTable.email')}</th>
                    <th>{t('admin.permissions.userTable.currentRole')}</th>
                    <th>{t('admin.permissions.userTable.extraPermissions')}</th>
                    <th>{t('admin.permissions.userTable.lastLogin')}</th>
                    <th>{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {userPermissions.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className={styles.userCell}>
                          <div className={styles.userAvatar}>
                            {user.name.charAt(0)}
                          </div>
                          <span className={styles.userName}>{user.name}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={styles.roleTag}>{t(user.roleKey)}</span>
                      </td>
                      <td>{user.extra}</td>
                      <td className={styles.dateCell}>{user.lastLogin}</td>
                      <td>
                        <div className={styles.actionButtons}>
                          <Button variant="ghost" size="small">
                            {t('common.edit')}
                          </Button>
                          <Button variant="ghost" size="small">
                            {t('common.view')}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      )}

      {activeTab === 'audit' && (
        <section className={styles.section}>
          <div className={styles.filters}>
            <select className={styles.filterSelect}>
              <option>{t('admin.permissions.audit.allTime')}</option>
              <option>{t('admin.permissions.audit.today')}</option>
              <option>{t('admin.permissions.audit.last7Days')}</option>
              <option>{t('admin.permissions.audit.last30Days')}</option>
            </select>
            <select className={styles.filterSelect}>
              <option>{t('admin.permissions.audit.allActions')}</option>
              <option>{t('admin.permissions.audit.roleChange')}</option>
              <option>{t('admin.permissions.audit.permissionGrant')}</option>
              <option>{t('admin.permissions.audit.permissionRevoke')}</option>
            </select>
            <Button variant="secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                <path d="M8 2v12M2 8h12M11 5l3 3-3 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{t('admin.permissions.audit.exportAuditLog')}</span>
            </Button>
          </div>

          {/* Security Alerts */}
          <div className={styles.alertsGrid}>
            <Card className={styles.alertCard} style={{ borderLeft: '4px solid #FF4D4F' }}>
              <div className={styles.alertIcon} style={{ background: '#FF4D4F20', color: '#FF4D4F' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className={styles.alertContent}>
                <h3 className={styles.alertTitle}>{t('admin.permissions.alerts.loginFailures')}</h3>
                <p className={styles.alertDescription}>{t('admin.permissions.alerts.loginFailuresDesc')}</p>
              </div>
            </Card>

            <Card className={styles.alertCard} style={{ borderLeft: '4px solid #FAAD14' }}>
              <div className={styles.alertIcon} style={{ background: '#FAAD1420', color: '#FAAD14' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className={styles.alertContent}>
                <h3 className={styles.alertTitle}>{t('admin.permissions.alerts.abnormalAccess')}</h3>
                <p className={styles.alertDescription}>{t('admin.permissions.alerts.abnormalAccessDesc')}</p>
              </div>
            </Card>

            <Card className={styles.alertCard} style={{ borderLeft: '4px solid #52C41A' }}>
              <div className={styles.alertIcon} style={{ background: '#52C41A20', color: '#52C41A' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <div className={styles.alertContent}>
                <h3 className={styles.alertTitle}>{t('admin.permissions.alerts.securityNormal')}</h3>
                <p className={styles.alertDescription}>{t('admin.permissions.alerts.securityNormalDesc')}</p>
              </div>
            </Card>
          </div>

          <Card>
            <div className={styles.auditTable}>
              <table>
                <thead>
                  <tr>
                    <th>{t('admin.permissions.audit.time')}</th>
                    <th>{t('admin.permissions.audit.operator')}</th>
                    <th>{t('admin.permissions.audit.actionType')}</th>
                    <th>{t('admin.permissions.audit.targetUser')}</th>
                    <th>{t('admin.permissions.audit.changes')}</th>
                    <th>{t('admin.permissions.audit.ipAddress')}</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td className={styles.dateCell}>{log.time}</td>
                      <td>{log.operator}</td>
                      <td>
                        <span
                          className={styles.actionTag}
                          style={{
                            background:
                              log.type === 'role_change'
                                ? '#4F7FFF20'
                                : log.type === 'permission_grant'
                                ? '#52C41A20'
                                : '#FAAD1420',
                            color:
                              log.type === 'role_change'
                                ? '#4F7FFF'
                                : log.type === 'permission_grant'
                                ? '#52C41A'
                                : '#FAAD14',
                          }}
                        >
                          {t(log.actionKey)}
                        </span>
                      </td>
                      <td>{log.target}</td>
                      <td className={styles.changeCell}>{log.change}</td>
                      <td className={styles.ipCell}>{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      )}
    </div>
  );
}
