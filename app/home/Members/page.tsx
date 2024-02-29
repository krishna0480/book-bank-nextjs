"use client"
import React, { RefObject, useEffect, useState } from 'react'

import Navbar from '@/components/navbar';

import { Box, Button, Flex,
   Table, TableContainer, 
   Tbody, Td, Text, Th, Thead, 
   Tr, useDisclosure, useToast, 
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Image,} from '@chakra-ui/react';
   import { MdDelete } from "react-icons/md";

const page = () => {

  const[val,setVal]=useState<string>("")
  const[source,setSource]=useState<string | any>("")
  const[userReload,setUserReload] = useState<any>()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const data = JSON.parse(localStorage.getItem("data") || '{}')
  const name = localStorage.getItem("username")
  
 


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data") || '{}')
    console.log(data.img)
  });
  

  const validate =(member:any) => {
     if(member.book !== ''){
      console.log(member)
     setUserReload(member)
     onOpen()
     console.log("works condition")
      return true
    }
  }



  const adminAccess = (member:any) => {
     for(let i=0;i<=data.length-1;i++){
      if(member.email==data[i].email){
        data[i].role="Admin"
        console.log(data)
        setVal(data)
        localStorage.setItem("data",JSON.stringify(data))
      }
     }
  }

  const studentAccess = (member:any) => {
    for(let i=0;i<=data.length-1;i++){
     if(member.email==data[i].email){
       data[i].role="Student"
       console.log(data)
       setVal(data)
       localStorage.setItem("data",JSON.stringify(data))
     }
    }
 }

  const deleteMember = (member:any) => {
      if(validate(member) == true ) return;
      validate(member)
        const updated = data.filter((data: { email: any; }) => member.email!==data.email)
        console.log(updated)
       localStorage.setItem("data",JSON.stringify(updated))
       setVal(updated)
  }
  
  const confirmDelete = (userReload:any) => {
    console.log(userReload)
    const updated = data.filter((data: { email: any; }) => userReload.email!==data.email)
    console.log(updated)
    localStorage.setItem("data",JSON.stringify(updated))
    setVal(updated)
    onClose()
  }

  return (
    <>
   <Flex overflowY={"scroll"}>
    <Navbar />
     <Box w={"100vw"} h={"100vh"} bg="#dde5b6">
     <Text fontSize={"xl"}>Members</Text>
     <Box  py={"30px"} bg={"#dde5b6"} px={["20px","20px","40px","80px"]}>
     <TableContainer w={["75%","75%","90%","100%"]} p={"10px"} borderRadius={"25px"} bg={"#fff"}  >
     <Table>
       <Thead>
         <Tr>
           <Th>S.No</Th>
           <Th>Name</Th>
           <Th>Role</Th>
           <Th>No.of.Books</Th>
           <Th>Options</Th>
         </Tr>
       </Thead>
     {
        data.map((member:{email:String;role:String;book:any[];img:string},index:number) => {
          
          var role = member.role
          console.log(role)
          return(
                 
                <Tbody key={index}>
                  <Tr>
                    <Td>
                      {index+1}
                    </Td>
                    <Td>
                    {member.email} {`  (${role})`}
                    </Td>
                 
                    <Td>{
                      role=="Admin"?<Button colorScheme='green'
                       onClick={() => studentAccess(member)}>Student</Button>
                      :role=="Super Admin"?"Super Admin":<Button colorScheme='blue' 
                      onClick={() => adminAccess(member)} mr={"10px"}>Admin</Button>
                      }
                      
                    </Td>
                    <Td color={member.book.length>0?"red":"green"}>
                      {member.book.length}
                    </Td>
                    <Td>{
                      role=="Super Admin"?"Super Admin ":<Button colorScheme='red'
                      onClick={() => deleteMember(member)} ><MdDelete  fontSize={"xl"}/>
                      </Button>
                      }
                    </Td>
             
                  </Tr>
              </Tbody>
                   )
                  })
                }
              </Table>
            </TableContainer>
            </Box>
            <div>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Books!!!!</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                     click Delete to Confirm
                  </ModalBody>
                     
                  <ModalFooter>
                    <Button variant={'ghost'} mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button  colorScheme='red' onClick={() => confirmDelete(userReload)}>Delete</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              </div>
     </Box>
    </Flex>
  </>
  )
}

export default page