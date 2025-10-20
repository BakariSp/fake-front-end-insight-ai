'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from './contexts/LanguageContext';

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();
  
  useEffect(() => {
    // Redirect to dashboard
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--gray-50)]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[var(--primary-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[var(--gray-700)]">{t('common.loading')}</p>
      </div>
    </div>
  );
}

