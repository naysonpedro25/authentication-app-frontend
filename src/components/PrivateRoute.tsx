import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { PacmanLoader } from 'react-spinners';
import { Background } from './Background';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
   const { user, isLoadingUser } = useAuth();
   const [checkedAuth, setCheckedAuth] = useState(false);

   useEffect(() => {
      if (!isLoadingUser) {
         setCheckedAuth(true);
      }
   }, [isLoadingUser, user]);

   if (!checkedAuth) {
      return (
         <Background className="justify-center items-center">
            <PacmanLoader color="#fff" size={20} />
         </Background>
      );
   }

   return user ? <>{children}</> : <Navigate to="/" />;
}
