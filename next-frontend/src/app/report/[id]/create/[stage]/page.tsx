'use client';

import ReportCreationPage from '@/components/reports/ReportCreationPage';

const ExistingReportCreatePage = ({ params }: { params: { stage: number; id: number } }) => {
  return <ReportCreationPage stage={Number(params.stage)} id={Number(params.id)} />;
};

export default ExistingReportCreatePage;
