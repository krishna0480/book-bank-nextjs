
"use client"

import Navbar from "@/components/navbar"
import { Alert, AlertIcon, AlertTitle, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel,
 Image, Input, Link, Table, TableContainer, Td, Text, Tooltip, Tr } from "@chakra-ui/react"
import axios, { AxiosProgressEvent } from "axios"
import { FaFile } from "react-icons/fa";
import { useRouter } from "next/navigation"
import React, { useState, useRef } from "react"
import { useEffect } from "react"
import { ChangeEvent } from "react"

const page = () => {
  const router =useRouter()
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
   const[bookUpdate,setBookUpdate] =useState("")



  const[book,setBook]=useState(
    {
      bookName:"",
      bookLink:"",
      bookImage:"",
    }
  )
  
  const [errors, setErrors] = useState<{bookName:string;bookLink:string;bookImage:any | string}>({
    bookName:"",
    bookLink:"",
    bookImage:""
  });
  const[update,setUpdate] =useState<String>("")
  const[bookExits,setBookExits] =useState<Boolean>(false)
  const bookData = JSON.parse(localStorage.getItem("books") ?? '[]')
  const logging = JSON.parse(localStorage.getItem("books")||'[]')

  useEffect(() => {
    const bookData = JSON.parse(localStorage.getItem("books") ?? '[]')
    const logging = JSON.parse(localStorage.getItem("books") ||'[]')
    console.log(logging)
    imgUpdate(book)
  },[bookUpdate]);
 
  const validate = () => {
    const tempErrors: typeof errors = JSON.parse(JSON.stringify(errors));
    
    tempErrors.bookImage = '';

    if(book.bookName.trim() == '') {
      tempErrors.bookName = 'Book name is requried!';
    }  else {
      tempErrors.bookName = '';
    }

    if(book.bookLink.trim() == '') {
      tempErrors.bookLink = 'Link is requried!';
      console.log("empty")
    }  else {
      tempErrors.bookLink = '';
      
    }
  
    const usersList: { bookName: string }[] = JSON.parse(localStorage.getItem('books') ?? '[]');
  
    const isExist = usersList.findIndex(user => user.bookName == book.bookName.trim()) > -1;
    console.log("hiii")
    setBookExits(isExist)
    setErrors(tempErrors)
    
    return  isExist ||tempErrors.bookName !== '' || tempErrors.bookLink !== '' ;
  }
  

  const handelUpload = async() => {
    // console.log(event);
    
   if(!file) return;

         const formData = new FormData();
         formData.append("file",file);
         
         let startAt = Date.now(); 
         console.log(file.size)
         console.log("hii")
         const res = await axios.post ("/api/upload",formData)
       const image = res.data.path.split("./public")
       return image[1];
  }


    const addBook =(event:ChangeEvent<HTMLInputElement> ) => {
    event.preventDefault()
    setBook(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }



   const imgValidate = () => {
    const tempErrors: typeof errors = JSON.parse(JSON.stringify(errors));

    if(book.bookName.trim() == '') {
      tempErrors.bookName = 'Book name is requried!';
    }  else {
      tempErrors.bookName = '';
    }

    if(book.bookLink.trim() == '') {
      tempErrors.bookLink = 'Link is requried!';
      console.log("empty")
    }  else {
      tempErrors.bookLink = '';
    }

    if(book.bookImage == '') {
      tempErrors.bookImage = 'Image is requried!';
      console.log(book.bookImage)
    }  else {
      tempErrors.bookImage = '';
    }

    const usersList: { bookName: string }[] = JSON.parse(localStorage.getItem('books') ?? '[]');
  
    const isExist = usersList.findIndex(user => user.bookName == book.bookName.trim()) > -1;
    console.log("hiii")
    setBookExits(isExist)
    setErrors(tempErrors)
    
    return  isExist ||tempErrors.bookName !== '' || tempErrors.bookLink !== '' ||tempErrors.bookImage !== '';
    
   }


   

   const imgUpdate = async(book:any) => {
    const ab= await handelUpload()
    console.log(ab)
    setBookUpdate(ab)
    console.log(logging)
    console.log(book.bookName);
    if(ab !== undefined){
      console.log("condition works")
      for(let i=0;i<=logging.length-1;i++){
        if(logging[i].bookName==book.bookName){
          console.log("condition works")
          logging[i].bookImage=ab
          console.log(logging)
          localStorage.setItem("books",JSON.stringify(logging))
        }
      }
    } 
  }

  const submitBook = async(data:any) => {
    const ab= await handelUpload()
    console.log(ab)
    console.log(data)
   console.log(book)
   if(ab!==undefined){
    if(validate()==true) return;
   }
    else if (ab == undefined ) {
    if(imgValidate()==true) return
   }
    
    // if(imgValidate()==true) return;
    var arr=JSON.parse(localStorage.getItem('books')|| '[]')
    arr.push(book)
    localStorage.setItem("books",JSON.stringify(arr))
    setBookUpdate(arr)
    console.log(arr);
    console.log(logging)
    router.push("/home/Books")
  }

 
  const submit = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
      submitBook(data)
   }
    
  const handleImageChange =(event: React.ChangeEvent<HTMLInputElement >) =>{
    if(!event.target.files)return
    if(event.target.files[0].type==="image/jpeg" || 
    event.target.files[0].type==="image/png" ){

      if(event.target.files[0].size<=3072000){
        let file =event.target.files[0]
         setError1(false)
         setError2(false)
         setUpload(0)
        setImage((file))
        setFile(file)
      } else {
           setError1(true)
      }

    } else {
          setError2(true)
    }
  }

 
  const handleChange =() =>{
    inputRef.current?.click();
  }

  return (
    <Flex overflowY={"scroll"}>
      <Navbar /> 
      <Box w={"100%"} bg={"#dde5b6"}>
  <Flex>
  <Text fontSize={"2xl"} my={"10px"} > Add Books </Text>
  <Button m={"10px"} colorScheme="teal"><Link href="/home/Books">Back</Link></Button>
  </Flex>
    <Flex justifyContent={"center"} alignItems={"center"} h={"90vh"} >
    <form>
  <Flex direction={"column"} boxShadow='dark-lg' borderRadius={"25px"} py={"20px"} w={"400px"} bg={"#C6F6D5"} p={"20px"}>
   <div>
  <input type="file" ref={inputRef} onChange={handleImageChange}  style={{display:'none'}}/>
     {
       image ?<>
   <Tooltip label="Click here to Update!" aria-label='A tooltip'>
   <Image className='img' onClick={handleChange}  w={"140px"} mt={"25px"}
        h={"150px"} borderRadius={"50%"}  src={URL.createObjectURL(image)}/>
   </Tooltip>
   </> :<>
         <Tooltip label="Click here to Update!" aria-label='A tooltip'>
           <Image className='img' onClick={handleChange}  w={"140px"} mt={"25px"}
         h={"150px"} borderRadius={"50%"} src={info==null?'/download.png':info} /></Tooltip>
         </>
     }
 </div>
  <FormControl isInvalid = {errors.bookName != ''} my={"10px"} >
   <FormLabel>Book Name</FormLabel>
   <Input
    type="text"
    name="bookName"
    value={book.bookName}
    border={"2px solid black"}
    placeholder="Book Name....."
  
    onChange={addBook}
     />
    <FormErrorMessage>{errors.bookName}</FormErrorMessage>
  </FormControl>

  <FormControl isInvalid = {errors.bookImage != ''} my={"10px"} >
   <FormLabel>Book Image</FormLabel>
   <Input
    type="text"
    name="bookImage"
    value={book.bookImage}
    border={"2px solid black"}
    placeholder="Book Image URl....."
    onChange={addBook}
     />
    <FormErrorMessage>{errors.bookImage}</FormErrorMessage>
  </FormControl>
 
  <FormControl isInvalid = {errors.bookLink != ''} my={"10px"} >
   <FormLabel>Book Link</FormLabel>
   <Input
    type="text"
    name="bookLink"
    value={book.bookLink}
    border={"2px solid black"}
    placeholder="Book Link.."
    onChange={addBook}
  />
        <FormErrorMessage>{errors.bookLink}</FormErrorMessage>
  </FormControl>

 
  {
    bookExits &&
    <Alert mt = '20px' status='error' borderRadius={'10px'}>
      <AlertIcon />
      <AlertTitle>Book already registered!</AlertTitle>
    </Alert>
  }

  <Button my={"10px"} w={"100%"} colorScheme='teal' size='lg' onClick={submit}> Add Book</Button>
  </Flex>
  </form>
  </Flex>
  </Box>
    </Flex>
  )
}

export default page





