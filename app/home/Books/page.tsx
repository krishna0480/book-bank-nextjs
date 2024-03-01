"use client"
import { Box, Button, Flex, 
Image,  Link,  Modal,  ModalBody,  ModalCloseButton,  ModalContent,  ModalFooter,  ModalHeader,  ModalOverlay,  Tab,  TabIndicator,  TabList,  TabPanel,  TabPanels,  Table, TableContainer, 
Tabs, 
Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import React, { useEffect, useReducer, useState } from 'react';
import Navbar from '@/components/navbar';
import Pagination from "@/components/Pagination";
import { MdDelete } from "react-icons/md";


const page = ({searchParams} : {searchParams : {[key:string]:string | string[] | undefined}}) => {

  const bookData = JSON.parse(localStorage.getItem("books") ?? '[]')
  console.log(bookData);
  const data =JSON.parse(localStorage.getItem("data") ?? '[]')
  const val = localStorage.getItem("username")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const[user,setUser]= useState<any>("") 
  const[alert,setalert]=useState<string>("Click Delete to confirm delete")
  const role =sessionStorage.getItem("role")
  
  useEffect(() => {
    const bookData = JSON.parse(localStorage.getItem("books") ?? '[]')
    console.log(bookData);
  });

 // pagination code

  const page = searchParams['page'] ?? '1'
  const per_Page = searchParams['per_Page'] ?? '3' 
  const start = (Number(page) - 1) * Number(per_Page) 
  const end = start + Number(per_Page)
  const entries =bookData.slice (start, end)
  console.log(entries.length)
 // 

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
        
  const confirmDelete = (user: 
    { bookImage: string ; 
    bookName: string ; 
    bookLink: string ; 
   }) => {
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
   
 <Flex overflowY={"scroll"} overflowX={"hidden"}>
   <Navbar /> 
    <Flex w={"100%"}>
      <Box p={"20px"} bg="#dde5b6"  h={"100vh"} w={"100%"}>
      <Tabs position="relative" variant="unstyled">
      <TabList>{
        role=="Super Admin"?<Tab>One</Tab>:<TabList><Tab>Two</Tab><Tab>Three</Tab></TabList>
       }
      
      </TabList>
     <TabIndicator
      mt="-1.5px"
      height="2px"
      bg="blue.500"
      borderRadius="1px"
      />
      <TabPanels>
        {
       role=="Super Admin"?
        <TabPanel>
          <p>one!</p>
        </TabPanel>:
       <TabPanels>
      <TabPanel>
        <p>two!</p>
      </TabPanel>
      <TabPanel>
        <p>three!</p>
      </TabPanel>
      </TabPanels>
      }
    </TabPanels>
  </Tabs>
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
                    <Th> options </Th>
                  </Tr>
                </Thead>
                {
                  entries.map( (entries: { bookImage: string ; 
                    bookName: string ; 
                    bookLink: string ; 
                  },index:number) => {
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
               <Pagination link={"/home/Books/?page="} hasNextPage= {end < bookData.length} hasPrevPage= {start > 0} />
              </Flex>
           </TableContainer> :
            <Box bg={"#fff"} p={"20px"} borderRadius={"25px"}>
              <Text>
                ther are no books in the site
              </Text>
            </Box>
          }
          
       </Box>
       <div>
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
     </Box>
   </Flex>
 </Flex>

  );
}

export default page;