import rectangles from '@/assets/rectangles.svg';
interface BackgroundProps {
   children?: React.ReactNode;
   className?: string;
}
export function Background({ children, className }: BackgroundProps) {
   return (
      <div
         className={'h-dvh inset-0 bg-grey-900 flex ' + className}
         style={{
            backgroundImage: `url("${rectangles}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
         }}
      >
         {children}
      </div>
   );
}
