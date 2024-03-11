// import { Box, Button, Flex, Text } from "@chakra-ui/react";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange:(page:number) => void
// }

// const Paginate: React.FC<PaginationProps> = ({ currentPage, totalPages,onPageChange }) => {
//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       onPageChange(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       onPageChange(currentPage + 1);
//     } 
//   };

//   const handlePageChange = (page: number) => {
//     onPageChange(page);
//   };

//   return (
//     <Flex mt={4} justifyContent="center" alignItems="center">
//       <Flex>
//         <Box>
//           <Button
//             size="sm"
//             colorScheme="blue"
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </Button>
//         </Box>    

//           <Box mx={1}>
//           <Button
//             size="sm"
//             onClick={handlePrevPage}
//             display={currentPage!==1?"":"none"}
//           >
//              {currentPage!==1?currentPage -1:""}
//           </Button>
//         </Box>
    
//         <Box mx={1}>
//           <Button
//             size="sm"
//             colorScheme="blue"
//             onClick={()=>{handlePageChange()}}
//           >
//              {currentPage}
//           </Button>
//         </Box>

//         <Box mx={1}>
//           <Button
//             size="sm"
//             display={currentPage===totalPages?"none":""}
//             onClick={handleNextPage}
//           >
//              {currentPage==totalPages?"":currentPage +1}
//           </Button>
//         </Box>

   
//         <Box>
//           <Button
//             size="sm"
//             colorScheme="blue"
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </Button>
//         </Box> 
//       </Flex>
//     </Flex>
//   );
// };

// export default Paginate;

// import React, { useState } from 'react';

// interface PaginationProps {
//   totalItems: any;
//   itemsPerPage: number;
//   currentPage: number;
//   totalPages:number
//   onPageChange: (page: number) => void;
// }

// const Paginate: React.FC<PaginationProps> = ({
//   totalItems,
  
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
  

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       onPageChange(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       onPageChange(currentPage + 1);
//     }
//   };

//   const handlePageChange = (page: number) => {
//     onPageChange(page);
//   };

//   const paginationItems = [];
//   for (let i = 1; i <= totalPages; i++) {
//     paginationItems.push(i);
//   }

//   return (
//     <div>
//       <button onClick={handlePrevPage} disabled={currentPage === 1}>
//         Previous
//       </button>
//       {paginationItems.map((page) => (
//         <button
//           key={page}
//           onClick={() => handlePageChange(page)}
//           disabled={currentPage === page}
//         >
//           {page}
//         </button>
//       ))}
//       <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//         Next
//       </button>
//     </div>
//   );
// };

// export default Paginate;


import page from "@/app/home/page";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginate: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

 

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <Flex mt={4} justifyContent="space-between" alignItems="center">
      <Box>
        
      </Box>
      <Flex>
        <Box>
          <Button
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            colorScheme="blue"
          >
            Previous
          </Button>
        </Box>
        {Array.from({ length: totalPages }, (_, i) => i + 1 ).filter(
          (page) =>
              page === currentPage ||
             page === currentPage - 1 ||
             page === currentPage + 1 
             
           ).map((page) => (
          <Box key={page} mx={1}>
            <Button
              size="sm"
              variant={currentPage === page ? "solid" : "outline"}
              colorScheme={currentPage === page ? "blue" : "outline"}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          </Box>
        ))}
        <Box>
          <Button
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            colorScheme="blue"
          >
            Next
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Paginate;