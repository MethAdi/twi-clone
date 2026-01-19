import React from 'react'
import { FaFeather, FaXTwitter } from 'react-icons/fa6'
import Link from 'next/link'
import { GoHomeFill, GoSearch, GoBell, GoMail, GoPerson,  } from 'react-icons/go'
import { HiUsers } from 'react-icons/hi2'
import { MdVerified } from 'react-icons/md'
import { TbDotsCircleHorizontal } from 'react-icons/tb' 
import Image from 'next/image'
import { HiDotsCircleHorizontal } from 'react-icons/hi'

export default function LeftSidebar() {
  return (
    <aside className='w-[50px] lg:w-[275px] p-1 lg:p-4 h-screen sticky top-0'>

      {/* Logo */}
      <p className='mb-6 text-white flex justify-center lg:justify-start'>
        <FaXTwitter size={30} />
      </p>

      <div className='space-y-2'>

        {/* Home */}
        <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
          <GoHomeFill size={30} />
          <span className='hidden lg:inline text-xl font-bold'>Home</span>
        </Link>

        {/* Explore */}
        <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
          <GoSearch size={30} />
          <span className='hidden lg:inline text-xl font-bold'>Explore</span>
        </Link>

        {/* Notifications */}
        <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
          <GoBell size={30} />
          <span className='hidden lg:inline text-xl font-bold'>Notifications</span>
        </Link>

        {/* Messages */}
        <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
          <GoMail size={30} />
          <span className='hidden lg:inline text-xl font-bold'>Messages</span>
        </Link>

        {/* Communities */}
        <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
          <HiUsers size={30} />
          <span className='hidden lg:inline text-xl font-bold'>Communities</span>
        </Link>

        {/* Premium */}
        <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
          <MdVerified size={30} />
          <span className='hidden lg:inline text-xl font-bold'>Premium</span>
        </Link>

        {/* Profile */}
        <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
          <GoPerson size={30} />
          <span className='hidden lg:inline text-xl font-bold'>Profile</span>
        </Link>

        {/* More */}
        <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
          <TbDotsCircleHorizontal size={30} />
          <span className='hidden lg:inline text-xl font-bold'>More</span>
        </Link>
      </div>
      <button className='hidden lg:block bg-white text-black p-3 w-full mt-3 font-bold rounded-full cursor-pointer'>
        Post
      </button >
      <button className='bg-primary p-3 mt-3 rounded-full cursor-pointer text-white lg:hidden'>
          <FaFeather size={20} />
      </button>
      <div className='mt-10 text-white flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Image src="/images/profile.jpg" alt="Profile" width={500} height={500} className='w-10 h-10 object-cover rounded-full' /> 
          <div className='hidden lg:block'>
            <p className='font-sembold'>AdiTech</p>
            <p className='text-secondary-text font-light'>@aditech</p>
          </div>
        </div>
        <HiDotsCircleHorizontal size={20} className='hidden lg:block' />
      </div>
    </aside>
  )
}
