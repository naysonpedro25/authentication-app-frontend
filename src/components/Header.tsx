import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.svg';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';

function getUserNameInitals(name: string): string {
   if (!name) return 'SN';
   const splitedName = name.split(' ');
   return splitedName.length === 1
      ? splitedName[0][0].toUpperCase()
      : splitedName[0][0].concat(splitedName[1][0]).toUpperCase();
}

export function Header() {
   const { user, logout } = useAuth();
   const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
   const [isLoadingLogout, setIsLoadingLogout] = useState(false);
   const navigator = useNavigate();
   const userNameInitials = getUserNameInitals(user?.name || '');
   return (
      <Sheet>
         <header
            className="w-full relative bg-grey-800 top-0 flex items-center justify-center py-4 lg:max-w-[80%] rounded-b-lg
          lg:border-grey-600 lg:border-[3px]"
         >
            <img src={logo} alt="Logo" className="max-h-20" />
            <Avatar className="rounded-[50%] absolute right-6 ">
               <SheetTrigger className="flex flex-col items-center gap-2">
                  <AvatarFallback
                     className="rounded-[50%] flex justify-center items-center line sm:h-13 h-11 w-13 transition-all
                   outline-3 bg-grey-100 outline-grey-300 hover:outline-3 hover:outline-green-300"
                  >
                     <p className="font-bold text-xl text-gray-700 hover:text-green-300">
                        {userNameInitials}
                     </p>
                  </AvatarFallback>
                  <p className="text-grey-100 text-sm font-semibold hover:text-green-300">
                     {user?.name}
                  </p>
               </SheetTrigger>
            </Avatar>
         </header>
         <SheetContent className="bg-grey-800 ">
            <SheetHeader>
               <SheetTitle className="text-grey-100 text-2xl">
                  {showChangePasswordForm ? 'Alterar Senha' : 'Seu Perfil'}
               </SheetTitle>
               <SheetDescription className="text-grey-300">
                  {showChangePasswordForm
                     ? 'Insira sua nova senha:'
                     : 'Informações do seu perfil:'}
               </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-6 py-6 px-4">
               {!showChangePasswordForm ? (
                  <>
                     <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-grey-300">
                           Nome completo
                        </Label>
                        <p className="text-grey-100 font-semibold">
                           {user?.name}
                        </p>
                     </div>

                     <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-grey-300">
                           Email
                        </Label>
                        <p className="text-grey-100 font-semibold">
                           {user?.email}
                        </p>
                     </div>

                     <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-grey-300">
                           Cargo da conta
                        </Label>
                        <p className="text-grey-100 font-semibold capitalize">
                           {user?.role?.toLowerCase()}
                        </p>
                     </div>
                     <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-grey-300">
                           Cargo da conta
                        </Label>
                        <p className="text-grey-100 font-semibold capitalize">
                           {new Date(
                              user?.created_at || '',
                           ).toLocaleDateString()}
                        </p>
                     </div>
                     <Button
                        className="bg-green-500 p-0 h-12 text-base font-bold hover:bg-green-300"
                        onClick={() => setShowChangePasswordForm(true)}
                     >
                        Mudar Senha
                     </Button>
                  </>
               ) : (
                  <form
                     className="flex flex-col gap-6"
                     onSubmit={(e) => e.preventDefault()}
                  >
                     <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-grey-300">
                           Senha atual
                        </Label>
                        <input
                           type="password"
                           className="bg-grey-900 rounded-lg p-3 text-grey-100 border border-grey-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                           placeholder="Digite sua senha atual"
                        />
                     </div>

                     <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-grey-300">
                           Nova senha
                        </Label>
                        <input
                           type="password"
                           className="bg-grey-900 rounded-lg p-3 text-grey-100 border border-grey-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                           placeholder="Digite sua nova senha"
                        />
                     </div>

                     <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-grey-300">
                           Confirme a nova senha
                        </Label>
                        <input
                           type="password"
                           className="bg-grey-900 rounded-lg p-3 text-grey-100 border border-grey-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                           placeholder="Confirme sua nova senha"
                        />
                     </div>

                     <div className="flex gap-4 mt-4">
                        <Button
                           className="flex-1 bg-green-500 p-0 h-12 text-base font-bold hover:bg-green-300"
                           type="submit"
                        >
                           Salvar
                        </Button>
                        <Button
                           className="flex-1 bg-my-red-300 p-0 h-12 text-base font-bold hover:bg-red-500"
                           type="button"
                           onClick={() => setShowChangePasswordForm(false)}
                        >
                           Cancelar
                        </Button>
                     </div>
                  </form>
               )}
            </div>

            <SheetFooter>
               <Button
                  className="bg-yellow-500 p-0 h-12 text-base font-bold hover:bg-my-red-300"
                  onClick={async () => {
                     try {
                        setIsLoadingLogout(true);
                        await logout();
                        navigator('/login');
                     } catch (error) {
                        console.error('Erro ao fazer logout:', error);
                     } finally {
                        setIsLoadingLogout(false);
                     }
                  }}
               >
                  {isLoadingLogout ? (
                     <PacmanLoader color="#fff" size={10} />
                  ) : (
                     'Sair da conta'
                  )}
               </Button>
            </SheetFooter>
         </SheetContent>
      </Sheet>
   );
}
