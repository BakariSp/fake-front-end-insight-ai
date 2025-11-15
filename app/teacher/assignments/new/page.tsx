'use client';

import { Suspense } from 'react';
import AssignmentBuilder from '../components/AssignmentBuilder';

export const dynamic = 'force-dynamic';

function AssignmentBuilderWrapper() {
  return <AssignmentBuilder mode="new" />;
}

export default function NewAssignmentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AssignmentBuilderWrapper />
    </Suspense>
  );
}

