import MainLayout from '@/app/components/layout/MainLayout';

export default function CommunicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}

