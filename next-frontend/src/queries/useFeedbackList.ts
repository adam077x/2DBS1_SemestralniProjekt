import { api } from '@/utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';

type FeedbackT = {
  id_zpetna_vazba: number;
  zpetna_vazba: string;
};

export const useFeedbackList = (id_zpravy: number) =>
  useQuery({
    queryKey: ['contacts', 'contact', id_zpravy],
    queryFn: async () => {
      const response = await api.get<ContactT[]>('/feedback/zpetne_vazby', {
        data: { id_zpravy },
      });

      return response.data;
    },
  });
