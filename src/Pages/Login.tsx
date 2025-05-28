import { Background } from '@/components/Background';
import { Card } from '@/components/ui/card';
import logo from '@/assets/logo.svg';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PacmanLoader } from 'react-spinners';

export function Login() {
   const [passwordShow, setPasswordShow] = useState(false);

   const { login } = useAuth();
   const navigator = useNavigate();
   const [isLoading, setIsLoading] = useState(false);

   const loginFormSchema = z.object({
      email: z
         .string()
         .email({ message: 'Endereço de e-mail mal formatado!' })
         .nonempty({ message: 'O endereço de e-mail não pode ser vazio!' }),
      password: z
         .string()
         .nonempty({ message: 'A senha não pode ser vazia!' })
         .min(6, { message: 'A senha deve ter pelo menos 6 caracteres!' }),
   });

   const form = useForm<z.infer<typeof loginFormSchema>>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   async function handleSubmit(dataForm: z.infer<typeof loginFormSchema>) {
      setIsLoading(true);
      try {
         await login(dataForm.email, dataForm.password);
         navigator('/users');
      } catch (error) {
         console.error(error);
         form.setError('email', {
            type: 'manual',
            message: 'Credenciais inválidas!',
         });
         setIsLoading(false);
         navigator('/auth');
      }
   }

   return (
      <Background className="justify-center items-center">
         <Card
            className="bg-grey-800 md:h-fit h-full relative sm:p-6 p-4 w-full rounded-none md:rounded-lg md:max-w-xl border-0 md:border-grey-600 
         md:border-[3px] flex flex-col items-center justify-center md:m-2"
         >
            <img
               src={logo}
               alt="app-logo"
               className="max-w-[35%] sm:max-w-[25%]"
            />
            <Button
               className="h-10 w-10 absolute top-10 left-4 sm:top-6 hover:bg-grey-900 bg-transparent sm:left-6 text-grey-300 hover:text-grey-100"
               onClick={() => navigator(-1)}
            >
               <ArrowLeft />
            </Button>
            <h1 className="sm:text-[2rem] text-2xl text-center text-grey-100 w-full font-bold ">
               Entrar no sistema
            </h1>
            <Form {...form}>
               <form
                  className="w-full flex flex-col gap-2 mp-3"
                  onSubmit={form.handleSubmit(handleSubmit)}
               >
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 className="rounded-sm bg-grey-900 h-11  border-0 text-white text-base focus-visible:border-2 focus-visible:border-green-300 focus-visible:ring-0"
                                 placeholder="E-mail*"
                                 {...field}
                              />
                           </FormControl>
                           <div className="h3">
                              <FormMessage className="text-my-red-300" />
                           </div>
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <div className="relative">
                                 <Input
                                    type={passwordShow ? 'text' : 'password'}
                                    className="rounded-sm bg-grey-900 h-11 border-0 text-white text-base focus-visible:border-2 focus-visible:border-green-300 focus-visible:ring-0"
                                    placeholder="Senha*"
                                    {...field}
                                 />
                                 <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-grey-600"
                                    onClick={() =>
                                       setPasswordShow((prev) => !prev)
                                    }
                                 >
                                    {passwordShow ? (
                                       <EyeOff className="w-5 h-5 text-grey-300" />
                                    ) : (
                                       <Eye className="w-5 h-5 text-grey-300" />
                                    )}
                                 </Button>
                              </div>
                           </FormControl>
                           <div className="h3">
                              <FormMessage className="text-my-red-300" />
                           </div>
                        </FormItem>
                     )}
                  />
                  <Button
                     className="bg-green-500 p-0 h-12 text-base font-bold hover:bg-green-300"
                     type="submit"
                  >
                     {isLoading ? (
                        <PacmanLoader color="#fff" size={10} />
                     ) : (
                        'Entrar'
                     )}
                  </Button>
               </form>
            </Form>
            <div className="flex justify-between flex-wrap w-full mt-4">
               <p className="text-grey-400 font-bold text-xs sm:text-sm mr-2">
                  Não possui conta?{' '}
                  <a href="/register" className="text-green-300 underline">
                     Cadastre-se
                  </a>
               </p>
               <a
                  href="/auth/forgot-password"
                  className="text-green-300 underline block font-bold text-xs sm:text-sm mr-2"
               >
                  Esqueci minha senha
               </a>
            </div>
         </Card>
      </Background>
   );
}
