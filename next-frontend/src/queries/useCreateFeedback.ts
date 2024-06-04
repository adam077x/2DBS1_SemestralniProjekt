import { getQueryClient } from '@/components/QueryClientProvider';
import { api } from '@/utils/axiosConfig';
import { useMutation } from '@tanstack/react-query';

type FeedbackBodyT = {
  zpravaId: number;
  uzivatelId: number;
  zpetnaVazba: string;
};

export const useCreateFeedback = () =>
  useMutation<{}, Error, FeedbackBodyT>({
    mutationKey: ['feedback', 'feedbacks'],
    mutationFn: async (values) => {
      const response = await api.post('/feedback/zpetnavazba', values).catch((error) => {
        throw error;
      });

      if (response.status === 201) {
        getQueryClient().invalidateQueries({
          queryKey: ['feedbacks', 'feedback', values.zpravaId],
        });
      }

      return response.data;
    },
  });
