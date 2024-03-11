"use client"
import React, { useEffect } from 'react'
import Navbar from '@/components/navbar';
import { FaInfoCircle } from "react-icons/fa";
import {Box, Button, Flex, Tab, Table, TableContainer, Tbody, Td, Th, Thead, Tr,Text, Image, Link, useToast} from '@chakra-ui/react';
import Paginate from '@/components/Paginate';
import { MdOutlineDangerous } from "react-icons/md";
import { useRouter, useSearchParams } from 'next/navigation';
import { redirect } from 'next/dist/server/api-utils';


interface BookListProps {
  books:any[];
}

const BookSells:React.FC<BookListProps>  = ({books}) => {
  const bookData = JSON.parse(localStorage.getItem("books") || "{}")
  const userData = JSON.parse(localStorage.getItem("data") || "{}")
  const toast = useToast()
  const router =useRouter()
  const searchParams = useSearchParams()
  const name = localStorage.getItem("username")
  console.log(name);
  console.log(userData)
  console.log(bookData);
 

  let result = searchParams.get("page")
  console.log(result)
  let tab = searchParams.get("tab")
  console.log(tab?.includes("sell"))
  useEffect(() => {
    if(result==null) return
  if( tab?.includes("sell") &&  result !== null){
    setCurrentPage(Number(result))
  }
   
  }, []);

 //  pagination code

 const [currentPage, setCurrentPage] = React.useState(1);
 const booksPerPage = 2;

 const lastPage = Math.ceil(books.length / booksPerPage);

 const entries = books.slice(
   (currentPage - 1) * booksPerPage,
   currentPage * booksPerPage
 );

 // 


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
    router.push("/home/Buy/Payment")
  }
  return (
    <>
  
      <Box bg="#dde5b6" px={["20px","20px","40px","80px"]}>
        <Text fontSize={"2xl"} p={"20px"}> Buy</Text>
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
                  View
                </Th>
                <Th>
                  Buy
                </Th>
              </Tr>
            </Thead>
            {entries.length!=0?
              entries.map((data: { bookImage: string; 
              bookName: string | number | boolean | 
              React.ReactElement<any, string | React.JSXElementConstructor<any>> |
              Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode |
              null | undefined;bookLink:string },index:number) => {
              return(
              <Tbody key={index}>
                  <Tr>
                    <Td>
                      <Image 
                      h={["50px","50px","100px","100px"]}
                      w={["50px","50px","100px","100px"]}
                      src={data.bookImage}/>
                    </Td>
                    <Td>
                    {data.bookName}
                    </Td>
                    <Td>
                      <Button colorScheme='green' >
                      <Link href={data.bookLink}>view</Link>
                      </Button>
                    </Td>
                  <Td>
                      <Button colorScheme='blue' onClick={() =>{Rent(data)}}>
                      {/* <Link href='/home/Rent/Payment' >Rent</Link>  */}
                      buy
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              )
              }):"no books"
            }
          </Table>
          <Flex p={"20px"} alignItems={"center"} justifyContent={"center"} >
            <Paginate
                  currentPage={currentPage}
                  totalPages={lastPage}
                  onPageChange={(page:number) => {router.replace(`/Books?tab=sell&page=${Number(page)}`);setCurrentPage(page);console.log(currentPage)}}
             />
          </Flex>
        </TableContainer>
      </Box>

  </>
  );
}

export default BookSells;
