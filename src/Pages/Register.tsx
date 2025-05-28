import { Background } from '@/components/Background';
import { Card } from '@/components/ui/card';
import logo from '@/assets/logo.svg';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '@/services/users';
import { toast, Toaster } from 'sonner';
import { PacmanLoader } from 'react-spinners';
export function Resgister() {
   const [passwordShow, setPasswordShow] = useState(false);

   const navigator = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();

   const registerFormShcema = z
      .object({
         name: z
            .string()
            .nonempty({ message: 'O nome não pode ser vazio!' })
            .min(3, { message: 'O nome deve ter pelo menos 3 caracteres!' }),
         email: z
            .string()
            .email({ message: 'Endereço de e-mail mal formatado!' })
            .nonempty({ message: 'O endereço de e-mail não pode ser vazio!' }),
         password: z
            .string()
            .nonempty({ message: 'A senha não pode ser vazia!' })
            .min(6, { message: 'A senha deve ter pelo menos 6 caracteres!' }),
         comfirmePassword: z.string().nonempty({
            message: 'A senha não pode ser vazia!',
         }),
      })
      .refine((data) => data.password === data.comfirmePassword, {
         message: 'As senhas precisam ser iguais',
         path: ['comfirmePassword'],
      });

   const form = useForm<z.infer<typeof registerFormShcema>>({
      resolver: zodResolver(registerFormShcema),
      defaultValues: {
         email: '',
         password: '',
         comfirmePassword: '',
         name: '',
      },
   });
   const mutate = useMutation({
      mutationFn: ({
         name,
         email,
         password,
      }: {
         name: string;
         email: string;
         password: string;
      }) => register(name, email, password),
      onError: () => {
         toast(
            <div className="w-full flex gap-1 justify-between items-center">
               <div className="p-1">
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
      },
   });
   async function handleSubmit({
      name,
      email,
      password,
   }: z.infer<typeof registerFormShcema>) {
      setIsLoading(true);
      await mutate.mutateAsync({ name, email, password });
      setIsLoading(false);
      navigator('/register/email-sent', {
         state: {
            formRegister: true,
         },
      });
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
               className="h-10 w-10 absolute top-4 left-4 sm:top-6 hover:bg-grey-900 bg-transparent sm:left-6 text-grey-300 hover:text-grey-100"
               onClick={() => navigator(-1)}
            >
               <ArrowLeft className="" />
            </Button>
            <h1 className="sm:text-[2rem] text-2xl text-center text-grey-100 w-full font-bold">
               Criar Conta
            </h1>
            <Form {...form}>
               <form
                  className="w-full flex flex-col gap-2 mp-3"
                  onSubmit={form.handleSubmit(handleSubmit)}
               >
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 className="rounded-sm bg-grey-900 h-11 border-0 text-white text-base focus-visible:border-2 focus-visible:border-green-300 focus-visible:ring-0"
                                 placeholder="Nome*"
                                 {...field}
                              />
                           </FormControl>
                           <div className="h3 ">
                              <FormMessage className="text-my-red-300" />
                           </div>
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 className="rounded-sm bg-grey-900 h-11 border-0 text-white text-base focus-visible:border-2 focus-visible:border-green-300 focus-visible:ring-0"
                                 placeholder="E-mail*"
                                 {...field}
                              />
                           </FormControl>
                           <div className="h3 ">
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
                           <div className="h3 ">
                              <FormMessage className="text-my-red-300" />
                           </div>
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="comfirmePassword"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 type={passwordShow ? 'text' : 'password'}
                                 className="rounded-sm bg-grey-900 h-11 border-0 text-white text-base focus-visible:border-2 focus-visible:border-green-300 focus-visible:ring-0"
                                 placeholder="Confirmar Senha*"
                                 {...field}
                              />
                           </FormControl>
                           <div className="h3 ">
                              <FormMessage className="text-my-red-300" />
                           </div>
                        </FormItem>
                     )}
                  />
                  <Button
                     className="relative bg-green-500 p-0 h-12 text-base font-bold hover:bg-green-300"
                     type="submit"
                     disabled={isLoading}
                  >
                     {isLoading ? (
                        <PacmanLoader color="#fff" size={10} />
                     ) : (
                        'Cadastrar'
                     )}
                  </Button>
               </form>
            </Form>
            <div className="flex justify-between flex-wrap w-full mt-4">
               <p className="text-grey-400 font-bold text-xs sm:text-sm">
                  Já possui conta?{' '}
                  <a href="/auth" className="text-green-300 underline">
                     Entrar
                  </a>
               </p>
               <a
                  href="/auth/forgot-password/"
                  className="text-green-300 underline font-bold text-xs sm:text-sm"
               >
                  Esqueci minha senha
               </a>
            </div>
         </Card>
         <Toaster className="bg-grey-800" />
      </Background>
   );
}
