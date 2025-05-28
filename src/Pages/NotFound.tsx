import { Background } from '@/components/Background';
import { Card } from '@/components/ui/card';

export function NotFound() {
   return (
      <Background className="justify-center items-center">
         <Card className="bg-grey-800 sm:h-fit  sm:p-6 p-4 rounded-lg sm:max-w-xl border-grey-600 border-[3px] flex flex-col items-center justify-center sm:m-2">
            <h1 className="text-my-red-300 font-bold">
               404 - Página nao encontrada
            </h1>
         </Card>
      </Background>
   );
}
