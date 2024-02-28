"use client"

import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation"
import { FC, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";

interface paginationProps {
   hasNextPage: boolean,
   hasPrevPage: boolean,
   link:string
}
 const Pagination: FC<paginationProps> = ({ hasNextPage,hasPrevPage,link}) => {
 
  const router = useRouter();
  const searchParams = useSearchParams()
 

  const page = searchParams.get('page') ?? '1'
  const per_Page = searchParams.get("per_Page") ?? '3'

console.log(hasNextPage,hasPrevPage)
  console.log("pagination")

  const next:any = hasNextPage

  const prev:any = hasPrevPage

  const Link:any = link
  return(
    <div>
      <Flex>

        {
          prev? <Button colorScheme="blue" onClick={() => { 
            router.push(`${Link}${Number(page) - 1}&per_Page=${per_Page}`)
          }}><BsChevronLeft /></Button>:<Button colorScheme="blue" isDisabled={true}><BsChevronLeft /></Button>
        }

     <Box mx={"5px"}>
      {
        prev?  <Button colorScheme="blue" variant='outline' mx={"10px"} onClick={() => { 
          if(!prev) return
         router.push(`${Link}${Number(page) - 1}&per_Page=${per_Page}`)
       }} isDisabled={!prev}>{prev?Number(page) -1:0}</Button>:""
      }
    
     </Box>
     
      <Box mx={"5px"}>
       <Button  colorScheme="blue"> {page} </Button>
      </Box>
       
      <Box mx={"5px"} display={next} >
        {
          next? <Button mx={"10px"} colorScheme="blue" variant='outline' onClick={()=> {
            if(!next) return
             router.push(`${Link}${Number(page) + 1}&per_Page=${per_Page}`)
           }} isDisabled={!next}>{Number(page)+1}</Button>:""
        }
     
     </Box>

       {
        next? <Button  colorScheme="blue" onClick={()=> {
          router.push(`${Link}${Number(page) + 1}&per_Page=${per_Page}`)
        }}><BsChevronRight /></Button>:<Button   colorScheme="blue"  isDisabled={true}><BsChevronRight /></Button>
       }
     
      
      </Flex>
    </div>
  )

  
}
export default Pagination