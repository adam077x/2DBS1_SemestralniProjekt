import { api } from '@/utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';

type FeedbackT = {
  id_zpetna_vazba: number;
  zpetna_vazba: string;
  zprava_id_zprava: number;
  uzivatel_id_uzivatel: number;
  id_uzivatel: number;
  jmeno: string;
  stredni_jmeno: null | string;
  prijmeni: string;
  email: string;
  heslo: string;
  telefonni_cislo: string;
  pobocka_id_pobocka: number;
  prava_id_prava: number;
};

export const useFeedbackList = (id_zpravy: number) =>
  useQuery({
    queryKey: ['feedbacks', 'feedback', id_zpravy],
    queryFn: async () => {
      const response = await api.get<FeedbackT[]>(`/feedback/zpetnevazby/${id_zpravy}`);

      return response.data;
    },
  });
