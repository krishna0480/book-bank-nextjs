"use client"

import React, { ChangeEvent } from 'react'
import { useState,FormEvent,useEffect } from 'react';

import {
  Flex,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  Link
} from '@chakra-ui/react'


import { redirect, useRouter } from 'next/navigation';
import NextLink from 'next/link'


const SignupPage = () => {
  const [formData, setFormData] = useState({ 
    email: '',
    password: '',
    confirmPassword: '',
    role:"Student",
    book:[]
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role:"",
  });
  const [isEmailAlreadyExist, setEmailExist] = useState(false);
  const router =  useRouter()

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
    setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }
  
  const validateForm = () => {
    const tempErrors: typeof errors = JSON.parse(JSON.stringify(errors));

    if(formData.email.trim() == '') {
      tempErrors.email = 'Email is requried!';
    } else if(/^\S+@\S+$/.test(formData.email) == false) {
      tempErrors.email = 'Invalid email format!'
    } else {
      tempErrors.email = '';
    }

    if(formData.password.trim() == '') {
      tempErrors.password = 'Password is required!';
    } else if(formData.password.length < 8) {
      tempErrors.password = 'Password should contain atleast 8 characters!';
    } else {
      tempErrors.password = ''
    }

    if(formData.confirmPassword.trim() == '') {
      tempErrors.confirmPassword = `Re-type the password here!`;
    } else if(formData.confirmPassword.trim() != formData.password.trim()) {
      tempErrors.confirmPassword = 'Password did not match!';
    } else {
      tempErrors.confirmPassword = ''
    }

    console.log(formData)

    if(formData.role==''){
      tempErrors.role = `Please Select the Role here!`;
    } else {
      tempErrors.role = ''
    }

    const usersList: { email: string }[] = JSON.parse(localStorage.getItem('data') ?? '[]');
    
    const isExist = usersList.findIndex(user => user.email == formData.email.trim()) > -1;

    setEmailExist(isExist);
    setErrors(tempErrors);

    return isExist || tempErrors.email != '' || tempErrors.password != '' || tempErrors.confirmPassword != '';
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if(validateForm() == true) return ;

    const usersList: { 
      email: string, 
      password: string,
      role:string,
      book:any[] }[] = JSON.parse(localStorage.getItem('data') ?? '[]');

    usersList.push({ 
      email: formData.email,
      password: formData.password,
      role: formData.role, 
      book:formData.book });

    localStorage.setItem('data', JSON.stringify(usersList));
    router.push('/login');
  }

  return (
    <Flex  h="100vh" bg="#d9ed92" alignItems="center" justifyContent="center">
      <form>
        <Flex   flexDirection="column" p={"50px"} bg="#C6F6D5" borderRadius={8} boxShadow="lg">

          <Text fontSize="4xl">Sign up</Text>
          
          <FormControl isInvalid = {errors.email != ''}>
            <FormLabel my={"10px"}>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              border={"2px solid black"}
              placeholder="Enter email id"
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid = {errors.password != ''}>
            <FormLabel my={"10px"}>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              border={"2px solid black"}
              placeholder="Enter password"
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid = {errors.confirmPassword != ''}>
            <FormLabel my={"10px"}>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              border={"2px solid black"}
              placeholder="Re-Type the password"
            />
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          </FormControl>

          {
            isEmailAlreadyExist &&
            <Alert mt = '20px' status='error' borderRadius={'10px'}>
              <AlertIcon />
              <AlertTitle>Email already registered!</AlertTitle>
            </Alert>
          }
              
          <Button my={4} colorScheme="teal" type='submit' onClick={handleSubmit} w="100%" >
            Submit
          </Button>

          <h3>Already have a account click </h3><Link as={NextLink} color={"#0000ff"} href={'/login'} >here</Link>
        </Flex>
       </form>
    </Flex>
  );
}

export default SignupPage
