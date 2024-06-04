import { api } from '@/utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';

type ContactT = {
  id_kontakt: number;
  jmeno: string;
  prijmeni: string;
  stredni_jmeno: string;
  telefonni_cislo: string;
  email: string;
  popis: string;
};

export const useContacts = (id_zpravy: number) =>
  useQuery({
    queryKey: ['contacts', 'contact', id_zpravy],
    queryFn: async () => {
      const response = await api.get<ContactT[]>(`/contacts/kontakty/${id_zpravy}`);

      return response.data;
    },
  });
