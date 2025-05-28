import { Background } from '@/components/Background';
import { Card } from '@/components/ui/card';
import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

interface EmailSentprops {
   objective: 'forgot-password' | 'register';
}
export function EmailSent({ objective }: EmailSentprops) {
   const navigate = useNavigate();
   const location = useLocation();

   return !location.state?.formRegister &&
      !location.state?.formForgotPassword ? (
      <Navigate to={'/'} />
   ) : (
      <Background className="justify-center items-center">
         <Card
            className="bg-grey-800 md:h-fit h-full relative sm:p-6 p-4 w-full rounded-none md:rounded-lg md:max-w-xl border-0 md:border-grey-600 
         md:border-[3px] flex flex-col items-center justify-center md:m-2"
         >
            <img
               src={logo}
               alt="app-logo"
               className="max-w-[35%] md:max-w-[25%]"
            />
            <h1 className="md:text-2xl text-[1.2rem] text-center text-grey-100 w-full font-bold">
               {objective === 'forgot-password'
                  ? 'Enviamos um e-mail com um link para redefinir sua senha.'
                  : 'Enviamos um e-mail com um link para confirmar seu cadastro.'}
            </h1>
            <p className="text-grey-300 text-center">
               Verifique a pasta de spam e promoções se não recebê-lo.
            </p>

            <Button
               className="bg-transparent w-full border-2 border-green-300 text-green-300 hover:text-white p-0 h-12 text-base font-bold hover:bg-green-300"
               onClick={() => navigate('/auth')}
            >
               Voltar para o Login
            </Button>
         </Card>
      </Background>
   );
}
