import { User } from '@/Model/User';
import { fetchUsers } from '@/services/users';
import { useQuery } from '@tanstack/react-query';

export function useUsers(page: number) {
   return useQuery<{ users: User[]; page: number; length: number }>({
      queryKey: ['users', page],
      queryFn: async () => fetchUsers(page),
   });
}
