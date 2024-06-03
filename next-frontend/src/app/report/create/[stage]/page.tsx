'use client';

import ReportCreationPage from '@/components/reports/ReportCreationPage';

const ReportCreatePage = ({ params }: { params: { stage: number } }) => {
  return <ReportCreationPage stage={Number(params.stage)} />;
};

export default ReportCreatePage;
