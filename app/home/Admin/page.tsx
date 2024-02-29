"use client"
import React from 'react';
import {
  Flex,
  Text,
  Box,
  Image,
  Button,
  Progress,
  Alert,
  AlertIcon,
  Tooltip,
  Grid,
  GridItem,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Table,
  Link,
  useToast,
} from '@chakra-ui/react';
import Navbar from '@/components/navbar';
import { useRef,useState,useEffect } from 'react';
import axios, { AxiosProgressEvent } from 'axios'
import Pagination from '@/components/Pagination';
import { FaInfoCircle } from "react-icons/fa";

const page = ({searchParams} : {searchParams : {[key:string]:string | string[] | undefined}}) => {
  const inputRef = useRef<null | HTMLInputElement>(null)
  const [image,setImage] = useState <File>()
  const [file,setFile]=useState<any>()
  const[upload,setUpload]=useState<number >(0)
  const [error1, setError1] = useState<Boolean>(false);
  const [error2, setError2] = useState<Boolean>(false);
  const [returnImg,setReturnImg] = useState <String>("")
  const[info,setInfo]=useState<null | string>(null)
  let data = JSON.parse(localStorage.getItem("data") || '[]')
  let val = (localStorage.getItem("username") )
  let role = (sessionStorage.getItem("role"))
  const toast = useToast()
  console.log(data)

  let book = data.filter((data:any)=>data.email==val)
   
  console.log(book[0].book)
  let retBook = book[0].book
  console.log("hiii");
  
  console.log(retBook);

  book=book[0].book

  const page = searchParams['page'] ?? '1'
  const per_Page = searchParams['per_Page'] ?? '3' 

  const start = (Number(page) - 1) * Number(per_Page) 
  const end = start + Number(per_Page)

  const entries =book.slice (start, end)

   useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data") || '[]')
    let books = data.filter((data:any)=>data.email==val)
      let book=books[0].book
   });
   
  useEffect(() => {
  for(let i=0;i<=data.length-1;i++) { 
    console.log("hii")
    if(data[i].img){
      if(val==data[i].email) {
        let repo = data[i].img
        setInfo(repo)
    }
    }
    }
    }, []);


const handelUpload = async(event:React.MouseEvent<HTMLButtonElement>) => {
   console.log(event);
   
  if(!file) return;

    try{
        const formData = new FormData();
        formData.append("file",file);
  
        let startAt = Date.now(); 
        console.log(file.size)
   
      const res= axios.post("/api/upload",formData,{
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const { loaded, total } = progressEvent;
          console.log(progressEvent);
          const percentage = (loaded * 100) / total!;
          console.log(`loaded ${loaded},total ${total}, percentage ${percentage}`)
          setUpload(+percentage.toFixed(2));
        },
      }
      )
        .then(res =>{ console.log(res) ;
          const r:any=res.data
        for(let i=0;i<=data.length-1;i++) { 
          if(val==data[i].email) {
            let image =r.path.split("./public")
            image = image[1]
            data[i].img = image
           localStorage.setItem("data",JSON.stringify(data))
        }
      }
    }
    )

       } catch (error:any){
           console.error("upload error")
       }
           
       }
    

  const handleChange =() =>{
    inputRef.current?.click();
  }


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
            <FaInfoCircle  fontSize={"25px"}/>
            <Text mx={"10px"}>Unrented book</Text>
            </Flex>
          </Box> 
        ),
      })
       setReturnImg(data)
    }
   }
  }


  const handleImageChange =(event: React.ChangeEvent<HTMLInputElement >) =>{
    if(!event.target.files)return
    if(event.target.files[0].type==="image/jpeg" || event.target.files[0].type==="image/png" ){
      if(event.target.files[0].size<=3072000){
        let file =event.target.files[0]
         setError1(false)
         setError2(false)
         setUpload(0)
        setImage((file))
        setFile(file)
      }
      else {
           setError1(true)
      }
    } else {
          setError2(true)
    }
  }

  return (
    <>
    
      <Flex  overflowY={"scroll"}> 
        <Navbar />
        
        <Flex direction={"column"}  w="100%">
          <Box bg="#dde5b6" h={"100vh"} w={"100%"} >
            <Box p={"20px"}>
            <Box m={"20px"} bg={"#fff"}  w={["75%","75%","40%","40%"]} borderRadius="25px">
              <Grid ml={"20px"}>
                <GridItem rowSpan={2}>
                <input type="file" ref={inputRef} onChange={handleImageChange} style={{display:'none'}}/>
                
                {
                  image ?<>
              <Tooltip label="Click here to Update!" aria-label='A tooltip'>
              <Image className='img' onClick={handleChange} w={"140px"} mt={"25px"}
                   h={"150px"} borderRadius={"50%"}  src={URL.createObjectURL(image)}/>
              </Tooltip>
              </> :<>
                    <Tooltip label="Click here to Update!" aria-label='A tooltip'>
                      <Image className='img' onClick={handleChange} w={"140px"} mt={"25px"}
                    h={"150px"} borderRadius={"50%"} src={info==null?'/download.png':info} /></Tooltip>
                    </>
                }
                </GridItem>
                 
                <br />
                <GridItem rowSpan={4}>
                <Box>
                  <Text fontSize={['xl','xl','2xl',"2xl"]} >{val}</Text>
                  <Text my={"10px"}>{role}</Text>
                 
                 {error1?<>   
                   <Alert status='error' mb={"10px"} w={"200px"}>
                   <AlertIcon />
                     Image should be less than 3MB
                   </Alert>
                   </> : " "}
                   {error2?<>   
                   <Alert status='error' mb={"10px"} w={"200px"}>
                    <AlertIcon />
                    JPEG/PNG only supported
                   </Alert>
                   </> : " "}

                 {upload?
                  <>
                   <Progress borderRadius={"25px"} 
                   my={"5px"}
                  value={upload} 
                  w={"200px"}
                  /> 
                 
                   {upload==100? <Alert status='success'w={"200px"} mb={"5px"}>
                    <AlertIcon />image Uploaded </Alert>
                   :<Alert status='info' mb={"5px"}>
                   <AlertIcon />{upload}% uploading</Alert>} 
                   
                 </> : ""} 
                 {
                  file && !upload ? <Button
                  onClick={handelUpload}
                   bg={"#6a994e"}>
                    upload Image</Button>:""
                 }
                    
                </Box>
                </GridItem>
              </Grid>
            </Box>
            </Box>
           <Flex>
              <Box m={"20px"} p={"2%"} bg={"#fff"} w={"20vw"} borderRadius="25px">
                <Text fontSize={['xl','xl',"3xl","3xl"]}>profit</Text>
                <Text>20%</Text>
              </Box>

              <Box m={"20px"} p={"2%"} bg={"#fff"} w={"20vw"} borderRadius="25px">
                <Text fontSize={['xl','xl',"3xl","3xl"]}>Sells</Text>
                <Text>40%</Text>
              </Box>

              <Box m={"20px"} p={"2%"} bg={"#fff"} w={"20vw"} borderRadius="25px">
                <Text fontSize={['xl','xl',"3xl","3xl"]}>Loss</Text>
                <Text>10%</Text>
              </Box>
           </Flex>
           <Text m={"20px"} fontSize={"xl"}>Rented Books</Text>

            <Box px={["20px","20px","80px","80px"]} py={"30px"} bg={"#dde5b6"}>        
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
            {
              entries.map((bookData: { bookImage: string ; bookName: string ; bookLink: string ; },index:number)=>{
              return(
                <Tbody key={index}>
                <Tr>
                  <Td>
                    <Image h={"100px"} w={"100px"} src={bookData.bookImage}/>
                  </Td>
                  <Td>
                  {bookData.bookName}
                  </Td>
                  <Td>
                    <Button colorScheme='blue' mx={"20px"}><Link href={bookData.bookLink}>Read</Link></Button>
                    <Button colorScheme='red' onClick={() => {returnBook(bookData)}}>Return</Button>
                  </Td>
                </Tr>
              </Tbody>    
              )
              })
            }
              </Table>
                 <Flex  alignItems={"center"} justifyContent={"center"} >
                 <Pagination link={"/home/Admin/?page="}  hasNextPage= {end < book.length} hasPrevPage= {start > 0} />
                 </Flex>
            </TableContainer>
            </Box>  
          </Box>
     </Flex>
</Flex>
</>
  );
}

export default page;
