import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { api } from '../utils/axiosConfig';

export type LoginResponseT = {
  jwt: string;
  user: {
    id_uzivatel: number;
    jmeno: string;
    stredni_jmeno: null;
    prijmeni: string;
    email: string;
    telefonni_cislo: string;
    id_prava: number;
    prava: string;
  };
};

export const useLogin = (options?: UseMutationOptions<LoginResponseT, Error, { email: string; password: string }>) =>
  useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await api
        .post<LoginResponseT>('/users/prihlasit', {
          email,
          heslo: password,
        })
        .catch((error) => {
          throw error;
        });

      return response.data;
    },
    ...options,
  });
