"use client"
import { TableContainer, Table, Thead,Link, Tr, Th, Tbody, Td, Button,Text, Flex, Box,Image, useToast } from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import { start } from 'repl';
import Pagination from './Pagination';
import { AiOutlineCheck } from 'react-icons/ai';
import Paginate from './Paginate';
import { useRouter, useSearchParams } from 'next/navigation';




const BookBought  = () => {
  let data = JSON.parse(localStorage.getItem("data") || '[]')
  let val = (localStorage.getItem("username") )
  let role = (sessionStorage.getItem("role"))
  const searchParams = useSearchParams()
  const [returnImg,setReturnImg] = useState <String>("")
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  
  const toast = useToast()  
  const router = useRouter()

 let result = searchParams.get("page")
  console.log(result)

  let tab = searchParams.get("tab")
  console.log(tab?.includes("cart"))
  
  useEffect(() => {
   if(result==null) return
  if(tab?.includes("cart") && result !== null){
    setCurrentPage(Number(result))
  }
   
  }, []);
 
  console.log(data,val)

  


 useEffect(() => {
  let data = JSON.parse(localStorage.getItem("data") || '[]')
  let books = data.filter((data:any)=>data.email==val)
  let book=books[0].book
});

 let book = data.filter((data:any)=>data.email==val)
   
 console.log(book[0].book)
 let retBook = book[0].book
 console.log("hiii");
 console.log(retBook);
 book=book[0].book


   //  pagination code
   const booksPerPage = 2;
  
   const lastPage = Math.ceil(book.length / booksPerPage);
  
   const entries = book.slice(
     (currentPage - 1) * booksPerPage,
     currentPage * booksPerPage
   );
  
   // 

 const returnBook = (bookData:any) => {
  for(let i=0;i<=book.length-1;i++){
   if(book[i]==bookData){
     const bookIndex= i
     console.log(bookIndex)
     const final = book.splice(bookIndex,1)
     console.log(book)
   }
   }
  for(let i=0;i<=data.length-1;i++) { 
   if(val==data[i].email) {
     data[i].book = book 
     localStorage.setItem("data",JSON.stringify(data))
     toast({
       position: 'top',
       isClosable: true,
       render: () => (
         <Box color='white'  borderRadius={"25px"} p={3} bg='green'>
         <Flex >
         <AiOutlineCheck  fontSize={"25px"}/>
           <Text mx={"10px"}>Removed book</Text>
           </Flex>
         </Box> 
       ),
     })
     setReturnImg(data)
   }
  }
 }

 const handlePageChange =(page:number) =>{
    setCurrentPage(page)
    router.push(`/Books/?tab=cart&page=${Number(page)}`);
   
  }
  return (
    <div>
      <Box px={["20px","20px","80px","80px"]} py={"30px"} bg={"#dde5b6"}>   
                {entries.length>0?     
                    <TableContainer  bg={"#fff"}  w={["75%","75%","80%","100%"]} borderRadius={"25px"} p={"10px"}>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>
                              Image
                            </Th>
                            <Th>
                              Name
                            </Th>
                            <Th>
                              Options
                            </Th>
                          </Tr>
                        </Thead>
                      
                        {entries.map((bookData: { bookImage: string ; bookName: string ; bookLink: string ; },index:number)=>{
                          return(
                            <Tbody key={index}>
                              <Tr>
                                <Td>
                                <Image 
                                h={["50px","50px","100px","100px"]}
                                w={["50px","50px","100px","100px"]} 
                                src={bookData.bookImage}/>
                                </Td>
                                <Td>
                                {bookData.bookName}
                                </Td>
                              <Td>
                                <Button colorScheme='blue' mx={"20px"}><Link href={bookData.bookLink}>Read</Link></Button>
                                <Button colorScheme='red' onClick={() => {returnBook(bookData)}}>Remove</Button>
                                </Td>
                              </Tr>
                            </Tbody>    
                          )
                          })
                        }

                        </Table>
                          <Flex  alignItems={"center"} justifyContent={"center"} >
                          <Paginate
                             currentPage={currentPage}
                             totalPages={lastPage}
                             onPageChange={handlePageChange}
                            />
                          </Flex>
                           
                      </TableContainer>:
                      <Box bg={"#fff"} p={"20px"} borderRadius={"25px"}>
                        <Text>
                          No books in your account
                        </Text>
                      </Box>
                  }
             </Box>  
    </div>
  );
}

export default BookBought;


  //  const page = searchParamsObject.get("page") ?? "1";
  //  const per_Page = searchParamsObject.get("per_Page") ?? "3";
  //  const start = (Number(page) - 1) * Number(per_Page) 
  //  const end = start + Number(per_Page)
  //  const entries =book.slice (start, end)
  //  console.log(entries.length)

   {/* <Flex alignItems={"center"} justifyContent={"center"} >
                              <Pagination link={"/home/Books/?tab=cart?page="} hasNextPage= {end < book.length} hasPrevPage= {start > 0} />
                            </Flex> */}


