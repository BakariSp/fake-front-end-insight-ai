'use client';

import { use, Suspense } from 'react';
import AssignmentBuilder from '../../components/AssignmentBuilder';
import { MOCK_ASSIGNMENT_DRAFT, MOCK_TASKS } from '../../mockData';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

function AssignmentBuilderWrapper({ id }: { id: string }) {
  // 在实际应用中，这里应该根据ID从API获取数据
  // 现在使用Mock数据
  const assignment = MOCK_ASSIGNMENT_DRAFT;
  const tasks = MOCK_TASKS;

  return (
    <AssignmentBuilder
      mode="edit"
      initialAssignment={assignment}
      initialTasks={tasks}
    />
  );
}

export default function EditAssignmentPage({ params }: PageProps) {
  const { id } = use(params);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AssignmentBuilderWrapper id={id} />
    </Suspense>
  );
}

