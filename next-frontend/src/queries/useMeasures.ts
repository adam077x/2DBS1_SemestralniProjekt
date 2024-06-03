import { api } from '@/utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';

type MeasuresT = {
  id_zprava: number;
  popis: string;
  naklady: number;
};

export const useMeausres = ({ id_zprava }: { id_zprava: number }) =>
  useQuery({
    queryKey: ['measures', id_zprava],
    queryFn: async () => {
      const response = await api.get<MeasuresT[]>('/measures');

      return response.data;
    },
  });
