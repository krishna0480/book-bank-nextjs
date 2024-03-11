"use client"
import React, { useEffect } from 'react';
import Navbar from "@/components/navbar";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Link, Modal, ModalBody,
   ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, 
   Td, Text, Th, Thead, Tr, useToast,Image, useDisclosure } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { MdDelete } from 'react-icons/md';
import { start } from 'repl';
import Pagination from './Pagination';
import Paginate from './Paginate';

interface Book {
  bookName: string;
  bookImage: string;
  bookLink: string;
}

interface BookListProps {
  books: Book[];
}

const BookList = () => {
  
  const bookData = JSON.parse(localStorage.getItem("books") ?? '[]')
  console.log(bookData);
  const data =JSON.parse(localStorage.getItem("data") ?? '[]')
  const val = localStorage.getItem("username")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const[user,setUser]= useState<any>("") 
  const[alert,setalert]=useState<string>("Click Delete to confirm delete")
  const role =sessionStorage.getItem("role")
  const router =useRouter()
  const searchParams = useSearchParams()
  useEffect(() => {
    const bookData = JSON.parse(localStorage.getItem("books") ?? '[]')
    console.log(bookData);
  });
  let tab = searchParams.get("tab")
  console.log(tab?.includes("list"))
  
  let result = searchParams.get("page")
  console.log(result)
  
  useEffect(() => {
    if(result==null) return
  if(tab?.includes("list") && result !== null){
    setCurrentPage(Number(result))
  }
   
  }, []);
  

  //  pagination code
 
  const [currentPage, setCurrentPage] = React.useState(1);
  const booksPerPage = 2;

  const lastPage = Math.ceil(bookData.length / booksPerPage);   

  const entries = bookData.slice(
    (currentPage - 1) * booksPerPage,   
    currentPage * booksPerPage
  );

  // 
  // const searchParams = useSearchParams()
  // const page = searchParams.get("page") ?? '1'
  // const per_Page = searchParams.get("pre_Page") ?? '3' 
  // const start = (Number(page) - 1) * Number(per_Page) 
  // const end = start + Number(per_Page)
  // const entries =bookData.slice (start, end)
  // console.log(entries.length)

  const rentedUsers = (book: { bookImage: string ; 
    bookName: string ; 
    bookLink: string ; 
   }) => {

   for(let i=0;i<=data.length-1;i++){
     const a = data[i].book;
     for(let j=0;j<= a.length-1;j++){
      if(a[j].bookName==book.bookName){
       console.log("rented")
       setalert("This book has been brougth by a user")
       console.log(a[j])
       onOpen()
       setUser(a[j])
       return true
      } 
    }
   }
 }

  const deleteBook = (book:
    { bookImage: string ; 
    bookName: string ; 
    bookLink: string ; 
    }) => {
    if(rentedUsers(book)==true) return 
    setUser(book)
    onOpen()

  } 
        
  const confirmDelete = (
    user: { 
      bookImage: string ; 
      bookName: string ; 
      bookLink: string ; 
    }
  ) => {
    console.log(user)
    let deleted = bookData.filter((bookData:any) => bookData.bookName !== user.bookName)
    console.log(deleted)
    for(let i=0;i<=data.length-1;i++){
     if(data[i].email==val){
       console.log(data[i])
       let a = data[i]
       for(let j=0;j<=a.book.length-1;j++){
          console.log(a.book[j])
          if(a.book[j].bookName==user.bookName){
           console.log("cond works")
           const b = a.book
           const c = b.filter((user:any) => b[j].bookName !== user.bookName )
           console.log(c)
           a.book =c
           console.log(data)
           localStorage.setItem("data",JSON.stringify(data))
           break;
          }
         }
       }
    }
    localStorage.setItem("books",JSON.stringify(deleted))
    onClose()
    }

  return (
    <div>
         <Text fontSize={"2xl"}>Books List</Text>
         <Flex  justifyContent={"flex-end"}>
          <Button colorScheme="teal" my={"10px"} me={["60px","80px","80px","80px"]}><Link href="/home/Books/Addbooks">Add Book</Link></Button>
         </Flex>
         <Box  py={"30px"} bg={"#dde5b6"} px={["20px","20px","40px","80px"]}>
              {
                entries.length>0?<TableContainer w={["85%","85%","90%","100%"]} p={"10px"} borderRadius={"25px"} bg={"#fff"}  >
                  <Table >
                    <Thead>
                      <Tr>
                        <Th>book cover</Th>
                        <Th> book name</Th>
                        <Th>Added By</Th>
                        <Th> options </Th>
                      </Tr>
                    </Thead>
                    {
                      entries.map( (entries: { bookImage: string; bookName: string; bookLink: string;user:string } , index:number) => {
                        

                        return (

                      <Tbody key={index} >
                        <Tr>
                            <Td >
                              <Image
                                src={entries.bookImage}
                                h={["50px","50px","100px","100px"]}
                                w={["50px","50px","100px","100px"]}
                                />
                            </Td>

                            <Td>
                              <Text >{entries.bookName}</Text>
                            </Td>

                            <Td>
                              <Text>{entries.user}</Text>
                            </Td>

                            <Td >
                              <Flex>
                              <Button colorScheme='teal' mr={"5px"}>
                                <Link href={entries.bookLink}>Read</Link>
                              </Button>
                              <Button  colorScheme="red" onClick={() =>  deleteBook(entries)}>
                                <MdDelete  fontSize={"xl"}/>
                              </Button>
                              </Flex>
                            </Td>
                          </Tr>
                      </Tbody>
                        )})
                    }
                  </Table>
                  <Flex alignItems={"center"} justifyContent={"center"} >
                    <Paginate
                      currentPage={currentPage}
                      totalPages={lastPage}
                      onPageChange={(page:number) => {
                        router.push(`/Books?tab=list&page=${page}`, undefined,);
                        setCurrentPage(page)}}
                      />
                  </Flex>
                   {/* <Flex alignItems={"center"} justifyContent={"center"} >
               <Pagination link={"/home/Books/?tab=list?page="} hasNextPage= {end < bookData.length} hasPrevPage= {start > 0} />
              </Flex> */}
                </TableContainer> :
                <Box bg={"#fff"} p={"20px"} borderRadius={"25px"}>
                  <Text>
                    ther are no books in the site
                  </Text>
                </Box>
              }
          
           </Box>
            <Modal isOpen={isOpen}  onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Books!!!!</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {alert}
                  </ModalBody>
                  <ModalFooter>
                    <Button variant={'ghost'} mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button  colorScheme='red' onClick={() => confirmDelete(user) } >Delete</Button>
                  </ModalFooter>
                </ModalContent>
            </Modal>
          
    </div>
  );
}

export default BookList;


