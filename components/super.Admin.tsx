"use client"
import { Alert, AlertIcon, AlertTitle, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Image, Input, Link, Spacer, Table, TableContainer, Tbody, Td, Text, Tr } from "@chakra-ui/react"
import data from "../data/data.json"
import React, { useState } from "react"
import { ChangeEvent } from "react"


const Sadmin = () => {


  const bookData = JSON.parse(localStorage.getItem("books") ?? '[]')
  console.log(bookData);


  const deleteBook = (book:any) => {
      console.log("delete")
  }

  return (
    <div>
    <Box py={"20px"} bg="#dde5b6" px={"20px"} h={"100vh"} w={"100vw"}>
      <Button colorScheme="teal" my={"10px"}><Link href="/home/Books/Addbooks">Add Book</Link></Button>
     {
     bookData.map( (book: { bookImage: string | undefined; 
      bookName: string | number | boolean | React.ReactElement<any, string |
       React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | 
       React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; 
      bookLink: string | undefined; 
     },index:number) => {
      return (
        <div key={index} >
          <TableContainer bg={"#fff"} w={"80%"} mx={"20px"} border={"0.5px solid #000"}>
          <Table size='sm' w={"80%"}>
            <Tbody>
          <Tr my={"5px"}>
           <Td w={["100px","100px","200px","200px"]}>
        <Image
          boxSize='100px'
          objectFit='cover'
          src={book.bookImage}
          alt='book image'
          mr={"10px"}
          w={["100px","100px","200px","200px"]}
         />
         </Td>

         <Td  w={["50px","50px","400px","400px"]}>
         <Text  my={"5px"} fontSize={["10px","10px","sm","sm"]}>{book.bookName}</Text>
         </Td>
         <Td >

         <Flex alignItems={"center"} >
         <Button colorScheme='teal'>
          <Link href={book.bookLink}>Read</Link>
          </Button>
          <Button mx={"10px"} onClick={() => deleteBook(book)}>
            Delete
          </Button>
          </Flex>
          </Td>

          </Tr>
          </Tbody>
          </Table>
          </TableContainer>
          </div>
      )
     })
   
     }
       </Box>
    </div>
  )
}

export default Sadmin