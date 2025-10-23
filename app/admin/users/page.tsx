'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const router = useRouter();

  React.useEffect(() => {
    // Redirect to teachers by default
    router.push('/admin/users/teachers');
  }, [router]);

  return null;
}

