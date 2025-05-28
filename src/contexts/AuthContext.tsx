import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { User } from '@/Model/User';

import { Background } from '@/components/Background';
import { PacmanLoader } from 'react-spinners';
// import { useUser } from '@/hooks/useUser';

interface AuthContextData {
   user: User | null;
   isLoadingUser: boolean;
   login: (email: string, password: string) => Promise<void>;
   logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export function AuthProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<User | null>(null);
   const [isLoadingUser, setIsLoadingUser] = useState(true);

   async function login(email: string, password: string) {
      try {
         const response = await api.post<{ token: string }>('/auth', {
            email,
            password,
         });
         const { token } = response.data;
         if (response.status === 200 && token) {
            localStorage.setItem('token', token);
         }
         // console.log(response);

         const { data } = await api.get('/users/me');
         setUser(data.user);
      } catch (error) {
         console.log(error);
         throw new Error('Error in login');
      }
   }

   async function logout() {
      try {
         await api.patch('/auth/logout');
         setUser(null);
         localStorage.removeItem('token');
      } catch (error) {
         throw new Error('Error in logout' + error);
      }
   }

   // const { data, isLoading, error } = useUser();
   // useEffect(() => {
   //    if (data) {
   //       setUser(data.user);
   //    }
   //    if (error) {
   //       setUser(null);
   //    }
   //    // console.log(isLoading, error);
   // }, [data, error, isLoading]);

   useEffect(() => {
      api.get('/users/me')
         .then((response) => {
            const { data } = response;
            if (response.status !== 200) {
               setUser(null);
               return;
            }
            setUser(data.user);
         })
         .catch(() => {
            // console.error('Error fetching user:', error);
            setUser(null);
         })
         .finally(() => {
            setIsLoadingUser(false);
         });

      // const fetchUser = async () => {
      //    try {
      //       const { data, status } = await api.get('/users/me');

      //       if (status === 200) {
      //          setUser(data.user);
      //       } else {
      //          setUser(null);
      //       }
      //       console.log(data.user.name);

      //    } catch (error) {
      //       // Erros de rede, timeout, etc são tratados aqui
      //       console.error(error);

      //    } finally {
      //       setIsLoadingUser(false);
      //    }
      //    console.log(user);
      // };

      // fetchUser();
   }, []);
   return (
      <AuthContext.Provider value={{ user, login, logout, isLoadingUser }}>
         {!user && isLoadingUser ? (
            <Background className="justify-center items-center">
               <PacmanLoader color="#fff" size={20} />
            </Background>
         ) : (
            children
         )}
      </AuthContext.Provider>
   );
}
export function useAuth() {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
}
