"use client"
import React from 'react'
import { redirect, useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';


const page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<Boolean>(true);
  useEffect(() => {
    redirect('/home/Admin')
  //   const session=(sessionStorage.getItem("mail") || '{}');
  // if(session){
  //    redirect('/home/Admin')
  // } 
  }, []);
  return (
 <>
  </>
  )
}

export default page