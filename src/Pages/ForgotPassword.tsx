import { Background } from '@/components/Background';
import { Card } from '@/components/ui/card';
import logo from '@/assets/logo.svg';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { forgotPassword } from '@/services/users';
import { PacmanLoader } from 'react-spinners';
import { useState } from 'react';

export function ForgotPassword() {
   const navigator = useNavigate();

   const loginFormSchema = z.object({
      email: z
         .string()
         .email({ message: 'Endereço de e-mail mal formatado!' })
         .nonempty({ message: 'O endereço de e-mail não pode ser vazio!' }),
   });

   const form = useForm<z.infer<typeof loginFormSchema>>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: {
         email: '',
      },
   });
   const [isLoading, setIsLoading] = useState(false);
   async function handleSubmit({ email }: z.infer<typeof loginFormSchema>) {
      try {
         setIsLoading(true);
         await forgotPassword(email);
         navigator('/auth/forgot-password/email-sent', {
            state: {
               formForgotPassword: true,
            },
         });
      } catch (error) {
         console.error(error);
      } finally {
         setIsLoading(false);
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
               className="max-w-[35%] md:max-w-[25%]"
            />
            <Button
               className="h-10 w-10 absolute top-4 left-4 sm:top-6 hover:bg-grey-900 bg-transparent sm:left-6 text-grey-300 hover:text-grey-100"
               onClick={() => navigator(-1)}
            >
               <ArrowLeft className="" />
            </Button>
            <h1 className="md:text-[2rem] text-2xl text-center text-grey-100 w-full font-bold">
               Recuperar senha
            </h1>
            <p className="text-grey-300 text-center">
               Para recuperar sua senha, insira o endereço de e-mail usado ao
               registrar a conta. Você receberá um link para redefinir sua
               senha.
            </p>
            <Form {...form}>
               <form
                  className="w-full flex flex-col gap-2 mp-4"
                  onSubmit={form.handleSubmit(handleSubmit)}
               >
                  {/* Email */}
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

                  <Button
                     className="bg-green-500 p-0 h-12 text-base font-bold hover:bg-green-300"
                     disabled={isLoading}
                  >
                     {isLoading ? (
                        <PacmanLoader color="#fff" size={10} />
                     ) : (
                        'Enviar'
                     )}
                  </Button>
               </form>
            </Form>
            <div className="flex justify-between w-full mt-4">
               <p className="text-grey-400 font-bold text-xs sm:text-sm">
                  Já possui conta?{' '}
                  <a href="/auth" className="text-green-300 underline">
                     Entrar
                  </a>
               </p>
            </div>
         </Card>
      </Background>
   );
}
