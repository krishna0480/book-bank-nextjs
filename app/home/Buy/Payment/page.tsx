"use client"
import Navbar from "@/components/navbar";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Link, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";


const page = () => {
  
  const router = useRouter()
  const bookName = sessionStorage.getItem("book")
  console.log(bookName,"book");
  const toast = useToast()
  const  email = localStorage.getItem("username")
  const data =JSON.parse(localStorage.getItem("data") || '[]' )
  const bookList =JSON.parse(localStorage.getItem("books") || '[]' )

  const [formData, setFormData] = useState({ 
    amount:0,
    ref:0,
    name:localStorage.getItem("username"),
    book:"",
    quantity:1
  });

  const [errors, setErrors] = useState({
   amount:"",
   ref:"",
  });

  const validate = () => {
    const tempErrors: typeof errors = JSON.parse(JSON.stringify(errors));
    if(formData.amount == 0) {
      tempErrors.amount = 'amount is required!';
    } else if(formData.amount <1000 ) {
      tempErrors.amount = 'Payment should be above Rs:1000';
    } else {
      tempErrors.amount = ''
    }
    if(formData.ref == 0) {
      tempErrors.ref = 'Reference number is required!';
    } else if(formData.ref <= 1000 ) {
      tempErrors.ref = 'Enter valid Reference number';
    } else {
      tempErrors.ref = ''
    }
    setErrors(tempErrors);
    return  tempErrors.amount != '' || tempErrors.ref != ''
  } 

  const userValidate = () => {

    for(let i=0;i<=data.length-1;i++){
      console.log("email");
      if(email == data[i].email){
        console.log("email2");
        const user =data[i]
        console.log(user)

       for(let j=0;j<=user.book.length-1;j++){
        console.log(user.book[j].bookName);
        if(user.book[j].bookName==bookName){
         const sale = JSON.parse(localStorage.getItem("sale") || '[]')

         for(let k=0;k<=sale.length-1;k++){
          if(sale[k].name==user.email){
            sale[k].quantity=sale[k].quantity+1
            console.log(sale[k])
            localStorage.setItem("sale",JSON.stringify(sale))
            router.push("/home/Buy")
            return true

          }
         }
          
        }
       }
     
      }
    }
  
  }

  const handelUpload = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
    setFormData (prev => ({ ...prev, [event.target.name]: event.target.value }));
     const book = bookList.find((book: { bookName: string | null; }) => book.bookName === bookName);
     if (book) {
    setFormData((prev) => ({ ...prev, book }));
  }
  }

  const handelSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
         event.preventDefault();
         
         if(validate()== true) return;
         if(userValidate()==true) return;
         console.log("submit works") 

         for(let i=0;i<=data.length-1;i++) { 
          if(email==data[i].email) {
            console.log(data[i]);
            
            for(let j=0;j<=bookList.length-1;j++){
             if(bookList[j].bookName==bookName){
              data[i].book.push(bookList[j])
              console.log(data)
              localStorage.setItem("data",JSON.stringify(data))
              break;
          }
        }
      }
    }
          var arr=JSON.parse(localStorage.getItem('sale')|| '[]')
          arr.push(formData)
          localStorage.setItem("sale",JSON.stringify(arr))
          toast({
            position: 'top',
            isClosable: true,
            render: () => (
              <Box color='white'  borderRadius={"25px"} p={3} bg='green'>
              <Flex >
                <AiOutlineCheck  fontSize={"25px"}/>
                <Text mx={"10px"}>Book is added to account</Text>
                </Flex>
              </Box> 
            ),
          })
          router.push("/home/Buy")
  }
  
  return (
    <Flex >
      <Navbar /> 
      <Box bg={"#dde5b6"} h={"100vh"} w={"100%"}>
      <Text p={"10px"} display={"inline"}>Payment </Text><Button><Link href="/home/Rent" colorScheme="green">Back</Link></Button>
   
      <Flex justifyContent={"center"} alignItems={"center"} h={"90vh"} w={"100%"} mt={"-20px"} >
        <Flex bg={"#C6F6D5"} direction={"column"} p={"30px"}>
          
        <FormControl my={"10px"} isInvalid = {errors.amount != ''}>
           <FormLabel>Amount</FormLabel>
             <Input
             type="number"
             name="amount"
             value={formData.amount}
             onChange={handelUpload}
             border={"2px solid black"}

              placeholder="Enter the Amount....."
              />
           <FormErrorMessage>{errors.amount}</FormErrorMessage>
      </FormControl>

      <FormControl my={"10px"}  isInvalid = {errors.ref != ''}>
         <FormLabel>Refrence number</FormLabel>
          <Input
          type="number"
          name="ref"
          value={formData.ref}
          onChange={handelUpload}
          border={"2px solid black"}
          placeholder="please enter the reference nummber.."
        />
       <FormErrorMessage>{errors.ref}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <Button type="submit" colorScheme="green" w={"100%"} onClick={handelSubmit}>submit</Button>
        </FormControl>
        </Flex>
      </Flex>
      </Box>
    </Flex>
  );
}

export default page;
