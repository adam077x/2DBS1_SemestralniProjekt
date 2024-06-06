import { getQueryClient } from '@/components/QueryClientProvider';
import { api } from '@/utils/axiosConfig';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

type ContactBodyT = {
  jmeno: string;
  stredni_jmeno: string;
  prijmeni: string;
  telefonni_cislo: string;
  email: string;
  popis: string;
  zpravaId: number;
};

export const useCreateContact = (options?: UseMutationOptions<{}, Error, ContactBodyT>) =>
  useMutation<{}, Error, ContactBodyT>({
    mutationKey: ['contacts', 'contact'],
    mutationFn: async (values) => {
      const response = await api.post('/contacts/kontakt', values).catch((error) => {
        throw error;
      });

      if (response.status === 201) {
        getQueryClient().invalidateQueries({
          queryKey: ['contacts'],
        });
      }

      return response.data;
    },
    ...options,
  });
