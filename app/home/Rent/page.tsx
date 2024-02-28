"use client"
import React from 'react'

import Navbar from '@/components/navbar';
import { FaInfoCircle } from "react-icons/fa";
import {Box, Button, Flex, Tab, Table, TableContainer, Tbody, Td, Th, Thead, Tr,Text, Image, Link, useToast} from '@chakra-ui/react';
import Pagination from '@/components/Pagination';
import { MdOutlineDangerous } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { redirect } from 'next/dist/server/api-utils';

const page = ({searchParams} : {searchParams : {[key:string]:string | string[] | undefined}}) => {

  const bookData = JSON.parse(localStorage.getItem("books") || "{}")

  const userData = JSON.parse(localStorage.getItem("data") || "{}")
  const toast = useToast()
  const router =useRouter()
  const name = localStorage.getItem("username")
    console.log(name);
    console.log(userData)
  console.log(bookData);

  const page = searchParams['page'] ?? '1'
const per_Page = searchParams['per_Page'] ?? '3' 

const start = (Number(page) - 1) * Number(per_Page) 
const end = start + Number(per_Page)

const entries =bookData.slice (start, end)

  const validate = (data:any) =>{
    for(let i=0;i<=userData.length-1;i++) { 
      if(name==userData[i].email) {
        console.log(data)
        const a= userData[i].book
        console.log(a)
        for(let j=0;j<=a.length-1;j++){
          if(a[j].bookName==data.bookName){
            console.log("success")
            toast({
              position: 'top',
              isClosable: true,
              render: () => (
                <Box color='white'  borderRadius={"25px"} p={3} bg='red'>
                <Flex >
                  <MdOutlineDangerous fontSize={"25px"}/>
                  <Text mx={"10px"}>Book is already Rented</Text>
                  </Flex>
                </Box> 
              ),
            })
            return true
          }
        }
      }
  }
}

  const Rent = (data:any) => {
    // if(validate(data) == true) return;
    console.log(data)
    sessionStorage.setItem("book",data.bookName)
     router.push("/home/Rent/Payment")
//     for(let i=0;i<=userData.length-1;i++) { 
//       if(name==userData[i].email) {
//         userData[i].book.push(data)
//        localStorage.setItem("data",JSON.stringify(userData))
   
      
// }      
//        console.log(userData)
//     }
  }
  
  
  return (
    <>
   <Flex overflowY={"scroll"}>
    <Navbar />
    <Box w={"100vw"} h={"100vh"} bg="#dde5b6">
      <Text fontSize={"2xl"} p={"20px"}> Rent</Text>
      <TableContainer bg={"#fff"} m={"20px"} w={["75%","75%","80%","100%"]} borderRadius={"25px"} px={"20px"}>
        <Table>
          <Thead>
            <Tr>
              <Th>
                Book Image
              </Th>
              <Th>
                Name
              </Th>
              <Th>
                Buy
              </Th>
              <Th>
                Rent
              </Th>
            </Tr>
          </Thead>
          {entries.length!=0?
            entries.map((data: { bookImage: string 
              ; bookName: string | number | boolean | 
                React.ReactElement<any, string | React.JSXElementConstructor<any>> |
                 Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode |
                  null | undefined;bookLink:string },index:number) => {
              return(
                <Tbody key={index}>
                <Tr>
                  <Td>
                  <Image  h={"100px"} w={"100px"} src={data.bookImage}/>
                </Td>
                <Td>
                  {data.bookName}
                </Td>
                <Td>
                  <Button colorScheme='green' >
                    <Link href={data.bookLink}>Buy</Link>
                  </Button>
                </Td>
                <Td>
                  <Button colorScheme='blue' onClick={() =>{Rent(data)}}>
                   {/* <Link href='/home/Rent/Payment' >Rent</Link>  */}
                   Rent
                  </Button>
                </Td>
                </Tr>
              </Tbody>
              )
            }):"no books"
          }
        </Table>
        <Flex p={"20px"} alignItems={"center"} justifyContent={"center"} >
     <Pagination link={"/home/Rent/?page="} hasNextPage= {end < bookData.length} hasPrevPage= {start > 0} />
     </Flex>
      </TableContainer>
    </Box>
    </Flex>
  </>
  )
}

export default page