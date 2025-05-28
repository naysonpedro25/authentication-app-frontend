import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
   page: number;
   totalPages: number;
   handlePageChange: (page: number) => void;
}

export function PaginationUser({
   handlePageChange,
   page,
   totalPages,
}: PaginationProps) {
   const pagesToShow = [page - 1, page, page + 1].filter(
      (pg) => pg >= 1 && pg <= totalPages,
   );

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  onClick={() => handlePageChange(page - 1)}
                  className={
                     page === 1
                        ? 'pointer-events-none bg-grey-400 sm:min-w-26'
                        : 'cursor-pointer bg-grey-100 sm:min-w-26'
                  }
               />
            </PaginationItem>

            {page > 2 && (
               <PaginationItem key="ellipsis-start">
                  <PaginationEllipsis />
               </PaginationItem>
            )}

            {pagesToShow.map((pg) => (
               <PaginationItem key={pg}>
                  <PaginationLink
                     onClick={() => handlePageChange(pg)}
                     isActive={pg === page}
                     className={
                        pg === page
                           ? 'bg-grey-300 sm:min-w-14 border-grey-100 border-[3px] cursor-pointer'
                           : 'bg-grey-100 sm:min-w-14 cursor-pointer'
                     }
                  >
                     {pg}
                  </PaginationLink>
               </PaginationItem>
            ))}

            {/* Ellipsis à direbraita */}
            {page < totalPages - 1 && (
               <PaginationItem key="ellipsis-end">
                  <PaginationEllipsis className="text-white" />
               </PaginationItem>
            )}

            {/* Botão próximo */}
            <PaginationItem>
               <PaginationNext
                  onClick={() => handlePageChange(page + 1)}
                  className={
                     page === totalPages
                        ? 'pointer-events-none bg-grey-300 sm:min-w-26 '
                        : 'cursor-pointer bg-grey-100 sm:min-w-26'
                  }
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
}
