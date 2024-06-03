import { UseMutationOptions, useQuery } from '@tanstack/react-query';
import { api } from '../utils/axiosConfig';

export type ReportT = {
  id_zprava: number;
  titulek: string;
  popisek: string;
  uzavreno: null | Date;
  vytvoreno: Date;
  upraveno: Date;
  uzivatel_id_uzivatel: number;
  tema_id_tema: number;
};

export const useReports = (options?: UseMutationOptions<ReportT[], Error>) =>
  useQuery<ReportT[], Error>({
    queryKey: ['reports'],
    queryFn: async () => {
      const response = await api.get<ReportT[]>('/reports/zpravy').catch((error) => {
        throw error;
      });

      return response.data;
    },
    ...options,
  });
