"use client"
import React from 'react'
import { useState,FormEvent,useEffect} from 'react';

import {
  Flex,
  Text,
  Input,
   FormControl,
   FormLabel,
   Button,
   FormErrorMessage,
   Link
} from '@chakra-ui/react';


import { useRouter,redirect, usePathname } from 'next/navigation';

const page = () => {
  const router =  useRouter();
  const pathname =  usePathname();



  const initialFormData = {
    email: '',
    password: '',
  };
  const initialErrorMessages = {
    email: '',
    password: '',
  }


  const [formData, setFormData] = useState(initialFormData)
  const [errorMessages, setErrorMessages] = useState(initialErrorMessages)
  
  const validateFormData = (formValues: any,val:any) => {
    console.log(val)
    
    let error: any = { ...initialErrorMessages }

    if (!formValues.email) {
          error.email = 'Email is required'
    } else if (!/^\S+@\S+$/.test(formValues.email)) {
          error.email = 'Invalid email format'
    }

    if (!formValues.password) {
           error.password = 'Password is required'
    } else if (formValues.password.length < 8) {
            error.password = 'Password must be at least 8 characters long'
    }

    if(formValues.password.length >= 8){
           console.log("logged");
          
      for(let i=0;i<=val.length-1;i++){
         if(val[i].email==formValues.email && val[i].password==formValues.password){
          console.log(val[i].email);
          sessionStorage.setItem("mail","true");
          sessionStorage.setItem("role",val[i].role)
          localStorage.setItem("username",val[i].email)
          router.push("/home/Admin")
          break;
       } else if((val[i].email!==formValues.email && val[i].password!==formValues.password)){
        error.email = "User details doesn't match"
     }
      }
    }
    return(
      error 
    ) 
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
         event.preventDefault()
          setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event: React.MouseEvent) => {
          event.preventDefault()
          const val =JSON.parse(localStorage.getItem("data") ||'{}');
           setErrorMessages(validateFormData(formData,val))
  }
  
  return (
    <div>
      
        <Flex  h="100vh" bg="#d9ed92" alignItems="center" justifyContent="center">
          <Flex  w={"390px"} flexDirection="column"p={"50px"} bg="#C6F6D5" borderRadius={8} boxShadow="lg">

              <FormControl isInvalid = {errorMessages.email != ''}>
                <Text fontSize="4xl">Login </Text>
              <FormLabel my={"10px"}>Email</FormLabel>
              <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            border={"2px solid black"}
            placeholder="emailid" />
       
          <FormErrorMessage>{errorMessages.email}</FormErrorMessage>
           </FormControl>

              <FormControl isInvalid = {errorMessages.password != ''}>
            <FormLabel id="password" my={"10px"}>password</FormLabel>
           
          <Input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            border={"2px solid black"}
            placeholder="*******"
          />
           <FormErrorMessage>{errorMessages.password}</FormErrorMessage>
           </FormControl>

        <Button
            my={4}
            colorScheme="teal"
            type='submit'
            onClick={handleSubmit}
            w="100%"
          >
            Submit
          </Button>

          
          <Text>new member click <Link color='#0000ff' href="/signup" >here</Link></Text>


  

    </Flex>
    </Flex>
    </div>
   
  )
}

export default page

