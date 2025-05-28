import { User } from '@/Model/User';
import { fetchUser } from '@/services/users';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
   return useQuery<{ user: User }>({
      queryKey: ['user'],
      queryFn: fetchUser,
      retry: false,
      // refetchOnWindowFocus: false,
      // refetchOnReconnect: false,
      // refetchOnMount: false,
   });
}
