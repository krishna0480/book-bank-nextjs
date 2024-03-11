"use client"
import React, { useState } from 'react';
import { useEffect } from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation';

export default function RouteMiddleware({children}:{children:React.ReactNode}){
  const { isClient, isSuperAdmin,isAdmin,isStudent, checkAndUpdate} = useAuth(); 
  const[superAdmin,setRoute]=useState<any>()
  const router =  useRouter();
  const pathname =  usePathname();
  const allowedPathsForSuperAdmin = [
    '/Admin',
    '/Books',
    '/Books/Addbooks',
    '/Members',
    '/Buy',
    '/Buy/Payment',
  ];
  
  const allowedPathsForAdmin = [
    '/Books',
    '/Books/Addbooks',
    '/Admin',
    '/Buy',
    '/Buy/Payment',
  ];

  const allowedPathsForStudent = [
    '/Admin',
    '/Buy',
    '/Books',
    '/Buy/Payment',
  ]

  useEffect(() => {   

    if (
      isClient &&
      (isSuperAdmin &&
        !allowedPathsForSuperAdmin.includes(pathname) ||
        isAdmin && !allowedPathsForAdmin.includes(pathname) ||
        isStudent && !allowedPathsForStudent.includes(pathname))
    ) {
      router.replace('/Admin');
    }

    if (isClient && !isSuperAdmin && pathname =='/Members') {
      router.replace('/Admin');
    }
    // if (isClient && !isSuperAdmin && !isAdmin && pathname =='/home/Books') {
    //   router.replace('/home/Admin');
    // }
    
    if(isClient  && (isSuperAdmin == false && isAdmin==false  && isStudent == false) && 
    (pathname == '/Admin' ||  pathname == '/Books'
     || pathname == '/Books/Addbooks' || pathname == '/Members' ||
      pathname == '/Buy' || pathname == '/Buy/Payment')
      ) {
      router.replace('/login')
    }
  }, [ router,isClient,isSuperAdmin,isAdmin,isStudent])

  useEffect(() => {
    checkAndUpdate();
  }, [pathname])

  if (
    isClient &&
    (isSuperAdmin &&
      !allowedPathsForSuperAdmin.includes(pathname) ||
      isAdmin && !allowedPathsForAdmin.includes(pathname) ||
      isStudent && !allowedPathsForStudent.includes(pathname) )
  ) return null

  if (isClient && !isSuperAdmin && pathname === '/Members') return null

  // if (isClient && !isSuperAdmin && !isAdmin && pathname === '/home/Books') return null

  if(isClient  && (isSuperAdmin == false && isAdmin == false && isStudent == false)  &&  
  (pathname == '/Admin' ||  pathname == '/Books' 
  || pathname == '/Books/Addbooks'  || pathname == '/Members' ||
  pathname == '/Buy' || pathname == '/Buy/Payment') ) return null;

  return isClient ? children : null;
}

const useAuth = () => {

  const [isClient, setClient] = React.useState(false);
  const [isSuperAdmin,setSuperAdmin]= React.useState(false);
  const [isAdmin,setAdmin]= React.useState(false);
  const [isStudent,setStudent]=React.useState(false)

  useEffect(() => {

    const role = sessionStorage.getItem("role")

    if(role == "Super Admin"){
      setSuperAdmin(true)
    } else if(role == "Admin"){
      setAdmin(true)
    }
    else if(role == "Student"){
      setStudent(true)
    } 
    setClient(true);
  }, [])
  
  const checkAndUpdate = () => {
 
    const role = sessionStorage.getItem("role")
    console.log(role)
    if(role == "Super Admin") {
      setSuperAdmin(true)
    } else if(role == "Admin"){
     setAdmin(true)
    } else if(role == "Student"){
      setStudent(true)
    } else{
      setSuperAdmin(false)
      setAdmin(false)
      setStudent(false)
    }
  }
  
  return { isClient,isSuperAdmin,isAdmin,isStudent, checkAndUpdate};
}


