'use client';

import ReportFull from '@/components/reports/ReportFull';
import { useRouter } from 'next/navigation';

const ReportPage = ({ params }: { params: { id: number } }) => {
  return <ReportFull id={params.id} />;
};

export default ReportPage;
