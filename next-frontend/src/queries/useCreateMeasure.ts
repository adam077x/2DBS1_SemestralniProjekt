import { getQueryClient } from '@/components/QueryClientProvider';
import { api } from '@/utils/axiosConfig';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateMeasure = (
  options?: UseMutationOptions<
    {},
    Error,
    {
      popis: string;
      zpravaId: number;
      naklady: number | null;
    },
    unknown
  >,
) =>
  useMutation<{}, Error, { popis: string; zpravaId: number; naklady: number | null }>({
    mutationKey: ['measures', 'measure'],
    mutationFn: async (values) => {
      const response = await api.post('/measures/opatreni', values).catch((error) => {
        throw error;
      });

      if (response.status === 201) {
        getQueryClient().invalidateQueries({
          queryKey: ['measures'],
        });
      }

      return response.data;
    },
    ...options,
  });
