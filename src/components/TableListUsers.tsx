import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { User } from '@/Model/User';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from './ui/dialog';
import { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
import { Button } from './ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from './ui/input';
interface TableListProps {
   users: User[];
   page: number;
}

export function TableListUsers({ users, page }: TableListProps) {
   const { user: userLogged } = useAuth();
   const [showPassword, setShowPassword] = useState(false);
   useEffect(() => console.log(userLogged));
   return (
      <>
         <div className="w-full overflow-x-auto overflow-y-auto ">
            <Table className="min-w-[800px] text-white">
               <TableHeader>
                  <TableRow>
                     <TableHead className="text-white whitespace-nowrap">
                        Nº
                     </TableHead>
                     <TableHead className="text-white whitespace-nowrap">
                        ID
                     </TableHead>
                     <TableHead className="text-white whitespace-nowrap">
                        Nome
                     </TableHead>
                     <TableHead className="text-white whitespace-nowrap">
                        E-mail
                     </TableHead>
                     <TableHead className="text-white whitespace-nowrap">
                        Cargo
                     </TableHead>
                     <TableHead className="text-white whitespace-nowrap">
                        Criado em
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {users.map((user, index) => (
                     <Dialog key={user.id}>
                        <DialogTrigger asChild>
                           <TableRow className="h-10 cursor-pointer">
                              <TableCell className="font-medium text-white whitespace-nowrap">
                                 {(page - 1) * 15 + index + 1}
                              </TableCell>
                              <TableCell
                                 className="font-medium text-white whitespace-nowrap"
                                 title={user.id}
                              >
                                 #{user.id.slice(0, 8)}...
                              </TableCell>
                              <TableCell className="text-white break-words">
                                 {user.name}
                              </TableCell>
                              <TableCell className="text-white break-all">
                                 {user.email}
                              </TableCell>
                              <TableCell className="text-right text-white whitespace-nowrap">
                                 {user.role}
                              </TableCell>
                              <TableCell className="text-right text-white whitespace-nowrap">
                                 {new Date(
                                    user.created_at,
                                 ).toLocaleDateString()}
                              </TableCell>
                           </TableRow>
                        </DialogTrigger>

                        <DialogContent className="bg-grey-800 border-grey-100">
                           <DialogClose asChild>
                              <Button className="bg-red-500 absolute p-1 h-5 w-5 rounded-[4px] right-3 top-3 text-sm font-bold hover:bg-red-600">
                                 <XIcon />
                                 <span className="sr-only">Close</span>
                              </Button>
                           </DialogClose>
                           <DialogHeader>
                              <DialogTitle className="text-grey-100">
                                 informações do usuário
                              </DialogTitle>
                              <DialogDescription className="text-grey-300">
                                 Veja os dados dos usuários abaixo
                              </DialogDescription>
                           </DialogHeader>

                           <div className="flex flex-col gap-4 py-4">
                              <div className="flex flex-col gap-2">
                                 <p className="text-sm text-grey-300">
                                    Nome completo
                                 </p>
                                 <p className=" text-grey-100 text-[.9rem] font-semibold">
                                    {user?.name}
                                 </p>
                              </div>

                              <div className="flex flex-col gap-2">
                                 <p className="text-sm text-grey-300">Email</p>
                                 <p className=" text-grey-100 text-[.9rem] font-semibold">
                                    {user?.email}
                                 </p>
                              </div>

                              <div className="flex flex-col gap-2">
                                 <p className="text-sm text-grey-300">Cargo</p>
                                 <p className=" text-grey-100 text-[.9rem] font-semibold">
                                    {user?.role}
                                 </p>
                              </div>

                              <form className="flex flex-col gap-2">
                                 <label className="text-sm text-grey-300">
                                    Alterar senha
                                 </label>
                                 <Input
                                    type={showPassword ? 'text' : 'password'}
                                    disabled={userLogged?.role !== 'ADM'}
                                    className="rounded-sm bg-grey-900 h-11 border-0 text-white text-base focus-visible:border-2 focus-visible:border-green-300 focus-visible:ring-0"
                                    placeholder="Senha*"
                                 />
                                 <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-grey-600"
                                    onClick={() =>
                                       setShowPassword((prev) => !prev)
                                    }
                                 ></Button>

                                 {user?.role === 'ADM' && (
                                    <div className="flex gap-4 mt-4">
                                       <Button className="flex-1 bg-green-500 hover:bg-green-400">
                                          Salvar Alterações
                                       </Button>

                                       <Button
                                          type="button"
                                          className="flex-1 bg-my-red-300 hover:bg-red-500"
                                       >
                                          Deletar
                                       </Button>
                                    </div>
                                 )}
                              </form>
                           </div>
                           {/* <Button
                              className="flex-1 bg-my-red-300 p-0 h-12 text-base font-bold hover:bg-red-500"
                              type="button"
                              onClick={() => setShowChangePasswordForm(false)}
                           ></Button> */}
                        </DialogContent>
                     </Dialog>
                  ))}
               </TableBody>
            </Table>
         </div>
      </>
   );
}
