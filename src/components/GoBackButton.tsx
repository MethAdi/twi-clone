"use client";
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function GoBackButton() {
   const router = useRouter(); 
    return (
  <div className='text-white flex items-center gap-3'>
                      <button onClick={() => router.back()}>
                          <FaArrowLeft size={20} />
                      </button>
                      <span className='font-bold text-xl'>Post</span>
              </div>
  )
}


