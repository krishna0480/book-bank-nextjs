"use client"
// import { Box, Table, Tbody, Td, Th, Thead, Tr,Image } from "@chakra-ui/react";
// import Pagination from "./Pagination";
// import React, { useEffect, useState } from "react";
// import Paginate from "./Paginate";
// import { useRouter } from "next/navigation";

// interface Book {
//   id: number;
//   bookName: string;
//   author: string;
//   description: string;
//   coverImage: string;
// }

// interface BookListProps {
//   books: Book[];
// }

// interface Item {

//   bookName: string;
//   bookLink:string;
//   bookImage:string;
// }

// const BookL: React.FC<BookListProps> = ({ books }) => {
//   const router = useRouter()
//   const [currentPage, setCurrentPage] = React.useState(1);
//   const booksPerPage = 2;

//   const lastPage = Math.ceil(books.length / booksPerPage);

//   const entries = books.slice(
//     (currentPage - 1) * booksPerPage,
//     currentPage * booksPerPage
//   );
  
// useEffect(() => {
//   const lastPage = Math.ceil(books.length / booksPerPage);
//   const entries = books.slice(
//     (currentPage - 1) * booksPerPage,
//     currentPage * booksPerPage
//   );
// }, [currentPage]);
//   const page = searchParams['page'] ?? '1'
//   const per_Page = searchParams['per_Page'] ?? '3' 
//   const start = (Number(page) - 1) * Number(per_Page) 
//   const end = start + Number(per_Page)
//   const entries =bookData.slice (start, end)
//   console.log(entries.length)
//  // 

// const [currentPage, setCurrentPage] = useState(1);
// const itemsPerPage = 3;

// const totalItems = books; // This value should come from an API or database.

// const startIndex = (currentPage - 1) * itemsPerPage;
// const endIndex = startIndex + itemsPerPage;

// const displayedItems = totalItems.slice(startIndex, endIndex);

// const totalPages = Math.ceil(totalItems.length / itemsPerPage);

// console.log(displayedItems)

// const handlePageChange = (page: number) => {
//   setCurrentPage(page);
// };


  // return (
  //   <Box>
  //     <Table>
  //       <Thead>
  //         <Tr>
  //           <Th>Title</Th>
  //          <Th>Author</Th>
  //           <Th>Description</Th>
  //           <Th>Cover Image</Th>
  //         </Tr>
  //       </Thead>
  //       <Tbody>
  //         {entries.map((book) => (
  //           <Tr key={book.id}>
  //             <Td>{book.bookName}</Td>
  //             <Td>{book.author}</Td>
  //             <Td>{book.description}</Td>
  //             <Td>
  //               <Image
  //                 src={book.coverImage}
  //                 alt={book.bookName}
  //                 w="100px"
  //                 h="100px"
  //                 objectFit="cover"
  //               />
  //             </Td>
  //           </Tr>
  //         ))}
  //       </Tbody>
  //     </Table>
      {/* <Paginate
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      /> */}
//         <Paginate
//                 currentPage={currentPage}
//                 totalPages={lastPage}
//                 onPageChange={(page:number) => {router.push(`/home/Books?page=${Number(currentPage)}?tab=2`);setCurrentPage(page)}}
//                 />
//     </Box>
//   );
// };

// export default BookL;


// import { Box, Flex, Text } from "@chakra-ui/react";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
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
//     <Flex mt={4} justifyContent="space-between" alignItems="center">
//       <Box>
//         <Text fontSize="sm" color="gray.500">
//           Showing {currentPage * 10 - 9} - {currentPage * 10} of {totalPages * 10} results
//         </Text>
//       </Box>
//       <Flex>
//         <Box>
//           <Button
//             size="sm"
//             variant="outline"
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </Button>
//         </Box>
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//           <Box key={page} mx={1}>
//             <Button
//               size="sm"
//               variant={currentPage === page ? "solid" : "outline"}
//               onClick={() => handlePageChange(page)}
//             >
//               {page}
//             </Button>
//           </Box>
//         ))}
//         <Box>
//           <Button
//             size="sm"
//             variant="outline"
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

// export default Pagination;


import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: JSX.Element;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  const handleTabClick = (id: string) => {
    setSelectedTabId(id);
  };

  return (
    <div>
      <div>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{
              backgroundColor: selectedTabId === tab.id ? 'gray' : 'white',
              color: selectedTabId === tab.id ? 'black' : 'gray',
              border: 'none',
              padding: '10px',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{ display: selectedTabId === tab.id ? 'block' : 'none' }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;