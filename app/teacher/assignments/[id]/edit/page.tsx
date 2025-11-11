'use client';

import { use } from 'react';
import AssignmentBuilder from '../../components/AssignmentBuilder';
import { MOCK_ASSIGNMENT, MOCK_TASKS } from '../../mockData';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditAssignmentPage({ params }: PageProps) {
  const { id } = use(params);
  
  // 在实际应用中，这里应该根据ID从API获取数据
  // 现在使用Mock数据
  const assignment = MOCK_ASSIGNMENT;
  const tasks = MOCK_TASKS;

  return (
    <AssignmentBuilder
      mode="edit"
      initialAssignment={assignment}
      initialTasks={tasks}
    />
  );
}

