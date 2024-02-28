"use client"
import React, { useState } from 'react';

import {
  Flex,
  Text,
  Box,
  Center,
  Image,
  Spacer,
  Button
} from '@chakra-ui/react';
import { FaUser,FaBell,FaMailBulk,FaInfoCircle } from "react-icons/fa";
import './navbar.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSettings,IoIosNotifications ,IoIosAddCircle } from "react-icons/io";
import Link from 'next/link';
import { redirect, usePathname,useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { HiMiniUserGroup } from "react-icons/hi2";




const Navbar = () => {



  const pathName = usePathname()
  console.log(pathName)
  const router=useRouter()
  const role = sessionStorage.getItem("role")
  const [show,setShow] =React.useState<String>("")
  const [navLinks, setNavLinks] = useState<any>([]);


  const logOut = () => {
      console.log("logout");
      sessionStorage.removeItem("mail");
      sessionStorage.removeItem("role")
      router.push('/login')
  }

  useEffect(() => {
 
    let navLink = [
      {
        id:1,
        name:"Profile",
        link:"/home/Admin",
        member:["Super Admin","Admin","Student"],
        icon:<FaUser className="icons" />
    },
    {
      id:2,
      name:"Books",
      link:"/home/Books",
      member:["Super Admin","Admin"],
      icon: <IoIosAddCircle  className="icons"/>
  },
  {
    id:3,
    name:"Members",
    link:"/home/Members",
    member:["Super Admin"],
    icon:<HiMiniUserGroup  className="icons"/>
  },
  {
    id:4,
    name:"Buy",
    link:"/home/Rent",
    member:["Super Admin","Admin","Student"],
    icon:<FaInfoCircle className="icons" />
  }];

    if (role) {
      const filteredNavLinks = navLink.filter((link: any) =>
        link.member.includes(role)
      );
      setNavLinks(filteredNavLinks);
    } else {
      setNavLinks(navLink);
    }
  },[role]);


 console.log(role)
 
  return (

 <Box pos={"sticky"} top={"0px"}  className="main" h={"100vh"} w={"15%"} bg="#31572c" pt={"10px"} px={"10px"}>
 
   {
     navLinks.map(({link,name,icon,id,member}:{link:any,name:any,icon:any,id:any,member:any})=>{
      
      return( 
      <Center borderRadius='md' key={id} mt={"20px"} 
       p={['10px','10px','20px','20px']} 
       className='center' 
       bg={pathName == link?"#f5ffc6":"#90a955"} >
        <Link href={link} >{icon}</Link>
         <Text fontSize={['md','md','xl','xl']}  key={id} mx={"10px"}  className={`menuList`}>
              <Link href={link} >{name}</Link>
           </Text>
       </Center>

      )
     })
   } 
       <div>
         <Button className='btn'
          my={"10px"} mt={"20px"}
          fontSize={['10px','10px','20px','20px']} 
          w={"100%"} onClick={logOut}>Logout</Button>
       </div>
       
      </Box>

  )
}

export default Navbar

