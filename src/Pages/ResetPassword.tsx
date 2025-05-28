import { useSearchParams, useNavigate } from 'react-router-dom';
import { Background } from '@/components/Background';
import { Card } from '@/components/ui/card';
import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import { resetPassword } from '@/services/users'; // Crie essa função

const schema = z
   .object({
      password: z
         .string()
         .min(6, { message: 'A senha deve ter pelo menos 6 caracteres!' }),
      confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: 'As senhas não coincidem!',
      path: ['confirmPassword'],
   });

export function ResetPassword() {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   const token = searchParams.get('token') || '';
   // if (!token) {
   //    navigate('/');
   // }

   const [passwordVisible, setPasswordVisible] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [apiError, setApiError] = useState<string>('');
   const [apiSuccess, setApiSuccess] = useState<string>('');

   const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
         password: '',
         confirmPassword: '',
      },
   });

   async function handleSubmit(values: z.infer<typeof schema>) {
      setIsLoading(true);
      setApiError('');
      setApiSuccess('');
      try {
         const { status } = await resetPassword(token, values.password);
         if (status === 200) {
            setApiSuccess('Senha atualizada com sucesso!');
         } else {
            setApiError('Token inválido ou expirado.');
         }
         console.log(status);
      } catch (error) {
         console.error(error);
         setApiError('Token inválido ou expirado.');
         setIsLoading(false);
      }
   }

   return (
      <Background className="justify-center items-center">
         <Card className="bg-grey-800 md:h-fit h-full relative sm:p-6 p-4 w-full rounded-none md:rounded-lg md:max-w-xl border-0 md:border-grey-600 md:border-[3px] flex flex-col items-center justify-center md:m-2">
            <img src={logo} alt="logo" className="max-w-[35%] sm:max-w-[25%]" />
            <Button
               className="h-10 w-10 absolute top-10 left-4 sm:top-6 bg-transparent hover:bg-grey-900 text-grey-300 hover:text-grey-100"
               onClick={() => navigate(-1)}
            >
               <ArrowLeft />
            </Button>
            <h1 className="sm:text-2xl text-xl text-center text-grey-100 font-bold w-full">
               Redefinir senha
            </h1>

            {apiError && (
               <p className="text-my-red-300 text-sm text-center mt-2">
                  {apiError}
               </p>
            )}
            {apiSuccess ? (
               <div className="text-center mt-6">
                  <p className="text-green-400 text-lg font-semibold">
                     {apiSuccess}
                  </p>
                  <Button
                     className="bg-green-500 mt-6 px-6 py-2 font-bold text-base hover:bg-green-300"
                     onClick={() => navigate('/auth')}
                  >
                     Voltar para o login
                  </Button>
               </div>
            ) : (
               <Form {...form}>
                  <form
                     className="w-full flex flex-col gap-3 mt-4"
                     onSubmit={form.handleSubmit(handleSubmit)}
                  >
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <div className="relative">
                                    <Input
                                       type={
                                          passwordVisible ? 'text' : 'password'
                                       }
                                       placeholder="Nova senha*"
                                       className="rounded-sm bg-grey-900 h-11 border-0 text-white text-base focus-visible:border-2 focus-visible:border-green-300 focus-visible:ring-0"
                                       {...field}
                                    />
                                    <Button
                                       type="button"
                                       variant="ghost"
                                       size="icon"
                                       className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-grey-600"
                                       onClick={() =>
                                          setPasswordVisible((prev) => !prev)
                                       }
                                    >
                                       {passwordVisible ? (
                                          <EyeOff className="w-5 h-5 text-grey-300" />
                                       ) : (
                                          <Eye className="w-5 h-5 text-grey-300" />
                                       )}
                                    </Button>
                                 </div>
                              </FormControl>
                              <FormMessage className="text-my-red-300" />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Input
                                    type="password"
                                    placeholder="Confirmar nova senha*"
                                    className="rounded-sm bg-grey-900 h-11 border-0 text-white text-base focus-visible:border-2 focus-visible:border-green-300 focus-visible:ring-0"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage className="text-my-red-300" />
                           </FormItem>
                        )}
                     />

                     <Button
                        type="submit"
                        className="bg-green-500 p-0 h-12 text-base font-bold hover:bg-green-300 mt-2"
                        disabled={isLoading}
                     >
                        {isLoading ? (
                           <PacmanLoader color="#fff" size={10} />
                        ) : (
                           'Redefinir senha'
                        )}
                     </Button>
                  </form>
               </Form>
            )}
         </Card>
      </Background>
   );
}
