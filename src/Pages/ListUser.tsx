import { Background } from '@/components/Background';
// import { useAuth } from '@/contexts/AuthContext';

import { Card } from '@/components/ui/card';
import { useUsers } from '@/hooks/useUsers';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { TableListUsers } from '@/components/TableListUsers';
import { PaginationUser } from '@/components/PaginationUser';

import { Header } from '@/components/Header';
export function ListUser() {
   const [searchParams, setSearchParams] = useSearchParams();
   useEffect(() => {
      if (!searchParams.get('page')) {
         setSearchParams({ page: '1' });
      }
   }, [searchParams, setSearchParams]);

   const page = Number(searchParams.get('page')) || 1;
   const { data, isError, isLoading } = useUsers(page);
   const totalPages = data?.length ? Math.ceil(data.length / 15) : 1;
   function handlePageChange(newPage: number) {
      if (newPage >= 1 && newPage <= totalPages) {
         setSearchParams({ page: newPage.toString() });
      }
   }

   return (
      <Background className="flex-col justify-self-auto items-center">
         {/* Header com logo */}

         <Header />
         <Card
            className="bg-grey-800 h-dvh px-4 overflow-auto w-full rounded-none lg:rounded-lg lg:max-w-[80%] border-0
          lg:border-grey-600 lg:border-[3px] flex flex-col items-center justify-between lg:m-4"
         >
            {isLoading ? (
               <p className="text-white text-center">Carregando usuários...</p>
            ) : isError ? (
               <p className="text-red-500 text-center">
                  Erro ao carregar dados.
               </p>
            ) : (
               <TableListUsers page={page} users={data?.users ?? []} />
            )}
            <PaginationUser
               handlePageChange={handlePageChange}
               page={page}
               totalPages={totalPages}
            />
         </Card>
      </Background>
   );
}
