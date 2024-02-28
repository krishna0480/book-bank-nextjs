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
  Link,
  Select
} from '@chakra-ui/react'


import { redirect, useRouter } from 'next/navigation';



// const page = () => {
//   const router =  useRouter()
     
  
  
//   const initialFormData = {
//     email: '',
//     password: '',
//     confirmPassword: '',
//   }
  
//   const initialErrorMessages = {
//     email: '',
//     password: '',
//     confirmPassword: '',
//   }

//   const [formData, setFormData] = useState(initialFormData)
//   const [errorMessages, setErrorMessages] = useState(initialErrorMessages)
//   const [check, setCheck]=useState<Boolean|null>(null)
//    let userData = JSON.parse(localStorage?.getItem("data") || '[]')


 


// // 1st function
// const handleSubmit = (event: React.MouseEvent) => {
//   event.preventDefault()
 
//  setErrorMessages(validateFormData(formData))

// }

// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setFormData({ ...formData, [event.target.name]: event.target.value })
// }

// // 2 nd function

// const validateFormData = (formValues: any) => {


//   let error: any = { ...initialErrorMessages }
    

  
//   if (!formValues.email || formValues.email.length==0) {
//           error.email = 'Email is required'
        
//   } else if (!/^\S+@\S+$/.test(formValues.email)) {
//           error.email = 'Invalid email format'
//   }  
  
//   if(userData){
//     for(let i=0;i<=userData.length-1;i++){
//       if(userData[i].email==formData.email){
//         console.log("errror")
      
//         error.email="mail is used";
//       }
//     }
//   }
  
//   if (!formValues.password) {
//           error.password = 'Password is required'
//   } else if (formValues.password.length > 8) {
//           error.password = 'Password must be at least 8 characters long'
//   }
    
  
  
//   if (formValues.confirmPassword !== formValues.password ) {
//           error.confirmPassword = 'Passwords do not match'
//   } else  {
//           submit()
//           alert("success")
//           router.push('/login')
//   }
//   return(
//     error
//   ) 
// }


// //3rd function 

// const  submit = () => {
//       var arr=JSON.parse(localStorage.getItem('data')|| '[]')
//       arr.push(formData)
//       localStorage.setItem("data",JSON.stringify(arr))
// }







//   return (
//     <div>
//         <Flex  h="100vh" bg="#d9ed92" alignItems="center" justifyContent="center">
//           <Flex   flexDirection="column"p={"50px"} bg="#C6F6D5" borderRadius={8} boxShadow="lg">

//               <FormControl>

//                  <Text fontSize="4xl">Sign up</Text>

//             <FormLabel my={"10px"}>Email</FormLabel>
//                  <Input
//                   type="email"
//                   name="email"
//                   id="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   border={"2px solid black"}
//                   placeholder="emailid"
//                    />
//                       {errorMessages.email && (
//                         <p className="text-red-500 text-xs italic">{errorMessages.email}</p>
//                       )}

//             <FormLabel id="password" my={"10px"}>password</FormLabel>
           
//                 <Input
//                   type="password"
//                   name="password"
//                   id="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   border={"2px solid black"}
//                   placeholder="*******"
//                 />
//                       {errorMessages.password && (
//                         <p >{errorMessages.password}</p>
//                       )}
              
//             <FormLabel my={"10px"}>  Confirm Password</FormLabel>

//                 <Input
//                   type="password"
//                   name="confirmPassword"
//                   id="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange} 
//                   border={"2px solid black"}
//                   placeholder="*******"
//                   />
              
//                       {errorMessages.confirmPassword && (
//                           <p className="text-red-500 text-xs italic">{errorMessages.confirmPassword}</p>
//                         )}
//                         <br />
            
//             <Button mt={4} colorScheme="teal"
//               type='submit' onClick={handleSubmit}
//               w="100%" >
//                   Submit
//             </Button>

//              <h3>already signed in click </h3><Link href={'/login'} >here</Link>

//          </FormControl>
//        </Flex>
//     </Flex>
//     </div>
//   )
// }

//export default page

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
    const usersList: { email: string, password: string,role:string,book:any[] }[] = JSON.parse(localStorage.getItem('data') ?? '[]');
    usersList.push({ email: formData.email, password: formData.password, role: formData.role, book:formData.book });
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

          {/* <FormControl isInvalid = {errors.role != ''}>
            <FormLabel my={"10px"}>Select Role</FormLabel>
            <Select name='role' value={formData.role} onChange={handleChange} border={"2px solid black"}>
              <option></option>
              <option>Super Admin</option>
              <option>Admin</option>
              <option>student</option>
            </Select>
            <FormErrorMessage>{errors.role}</FormErrorMessage>
          </FormControl> */}
        

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

          <h3>Already signed in click </h3><Link color={"#0000ff"} href={'/login'} >here</Link>
        </Flex>
       </form>
    </Flex>
  );
}

export default SignupPage
