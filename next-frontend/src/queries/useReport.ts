import { api } from '@/utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';

export const useReport = (reportId: number) =>
  useQuery({
    queryKey: ['report', reportId],
    queryFn: async () => {
      const response = await api.get(`/reports/zprava/${reportId}`).catch((error) => {
        throw error;
      });

      return response.data;
    },
  });
