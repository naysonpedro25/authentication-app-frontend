import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Background } from '@/components/Background';
import { Card } from '@/components/ui/card';
import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { validate } from '@/services/users';

export function EmailValidated() {
   const [searchParams] = useSearchParams();

   const navigate = useNavigate();

   const token = searchParams.get('token');
   const sendedRequest = useRef(false);

   const [isValidateStatus, setIsValidateStatus] = useState<
      'error' | 'success' | 'loading'
   >('loading');
   useEffect(() => {
      (async () => {
         try {
            if (!sendedRequest.current) {
               sendedRequest.current = true;
               await validate(token || '');
               setIsValidateStatus('success');
            }
         } catch (error) {
            console.error(error);
            setIsValidateStatus('error');
         }
      })();
   }, [token]);

   return (
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
               {isValidateStatus === 'error' && 'Token inválido ou expirado'}
               {isValidateStatus === 'success' &&
                  'E-mail validado com sucesso!'}
               {isValidateStatus === 'loading' && 'Validando e-mail...'}
            </h1>

            {isValidateStatus !== 'loading' && (
               <Button
                  className="bg-transparent w-full border-2 border-green-300 text-green-300 hover:text-white p-0 h-12 text-base font-bold hover:bg-green-300 mt-4"
                  onClick={() => navigate('/')}
               >
                  Ir para o início
               </Button>
            )}
         </Card>
      </Background>
   );
}
