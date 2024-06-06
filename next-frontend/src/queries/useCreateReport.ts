import { api } from '@/utils/axiosConfig';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

type ReportT = {
  id_zprava: number;
  titulek: string;
  popisek: string;
  uzavreno: null | Date;
  vytvoreno: Date;
  upraveno: Date;
  uzivatel_id_uzivatel: number;
  tema_id_tema: number;
};

export const useCreateReport = (
  options?: UseMutationOptions<ReportT, Error, { temaId: number; nazev: string; popis: string; uzivatelId: number }>,
) =>
  useMutation<ReportT, Error, { temaId: number; nazev: string; popis: string; uzivatelId: number }>({
    mutationKey: ['reports', 'report'],
    mutationFn: async (values) => {
      const response = await api.post('/reports/zprava', values).catch((error) => {
        throw error;
      });

      return response.data;
    },
    ...options,
  });
