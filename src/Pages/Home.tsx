import { Background } from '@/components/Background';
import { Card } from '@/components/ui/card';
import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export function Home() {
   const { user } = useAuth();
   const navigate = useNavigate();
   const [toastShowing, setToastShowing] = useState(false);

   useEffect(() => {
      if (user) {
         if (!toastShowing) {
            setToastShowing(true);
            return;
         }
         toast(
            <div className="w-full flex gap-1 justify-between items-center">
               <div className="p-1 ">
                  <strong>Você já está logado!</strong>
                  <p>Deseja continu ar para sua conta?</p>
               </div>
               <div className="flex gap-1">
                  <Button
                     className="bg-green-500 text-sm font-bold hover:bg-green-300"
                     onClick={() => navigate('/users ')}
                  >
                     Sim
                  </Button>
                  <Button
                     className="bg-red-500 text-sm font-bold hover:bg-red-600"
                     onClick={() => toast.dismiss()}
                  >
                     Não
                  </Button>
               </div>
            </div>,
            {
               duration: Infinity,
               cancel: false,
               style: {
                  backgroundColor: '#323238',
                  color: '#fff',
               },
            },
         );
      }
   }, [navigate, user, toastShowing]);
   return (
      <Background className="justify-center items-center">
         <Card className="bg-grey-800 md:h-fit h-full md:p-6 p-4 w-full rounded-none md:rounded-lg md:max-w-xl border-0 md:border-grey-600 md:border-[3px] flex flex-col items-center justify-center md:m-2">
            <img
               src={logo}
               alt="app-logo"
               className="max-w-[35%] md:max-w-[25%]"
            />
            <h1 className="md:text-[2rem] text-2xl text-center text-grey-100 w-full font-bold">
               Bem-vindo ao UserManager
            </h1>
            <p className="text-grey-300 text-center mt-2">
               Gerencie contas de usuários com segurança e praticidade.
               Cadastre, edite, remova e visualize perfis de forma intuitiva.
            </p>

            <div className="flex flex-col gap-4 w-full mt-6">
               <Button
                  className="bg-green-500 h-12 text-base font-bold hover:bg-green-300"
                  onClick={() => navigate('/auth')}
               >
                  Entrar
               </Button>
               <Button
                  variant="outline"
                  className="bg-transparent w-full border-2 border-green-300 text-green-300 hover:text-white p-0 h-12 text-base font-bold hover:bg-green-300"
                  onClick={() => navigate('/register')}
               >
                  Criar Conta
               </Button>
            </div>
         </Card>
         <Toaster className="bg-grey-800" />
      </Background>
   );
}
