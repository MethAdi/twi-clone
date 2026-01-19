import React from 'react'
import {IoSearchOutline} from 'react-icons/io5'
import Image from 'next/image'
export default function RightSidebar(){
    return (
    <aside className='w-[350px] p-5 h-screen sticky top-0 hidden xl:block'>
            <div className='text-white flex items-center gap-2 border border-border p-2 rounded-full'>
                <IoSearchOutline size={20} />
                <input type="text" placeholder='Search' className='outline-none w-full'/>
            </div>
            <div className='border border-border p-4 text-white mt-5 rounded-lg'>
            <h3 className='font-bold text-2xl mb-4'>Subscribe to Premium</h3>
            <p>Get exclusive features and insights by subscribing to our premium plan.</p>
            <button className='mt-4 bg-primary text-white py-2 px-5 font-semibold cursor-pointer rounded-full'>Subscribe</button>
            </div>
            <div className='border border-border p-4 text-white mt-5 rounded-lg'> 
                <h3 className='mb-4 text-2xl font-bold'>Who to Follow</h3>
                <div className='flex justify-between items-center mb-6'>
                <div className='flex gap-2 items-center'>
                <Image src="/images/image1.jpg" alt="image1" width={800} height={800} className='w-10 h-10 object-cover rounded-full'/>
                <div className='text-white'>
                        <p>Mehta</p>
                        <p className='text-secondary-text font-light'>@mehtaa</p>
                </div>
                </div>
                <button className='bg-white text-black py-2 px-5 font-sembold cursor-pointer rounded-full'>
                    Follow
                </button>
                </div>
                <div className='flex justify-between items-center mb-6'>
                <div className='flex gap-2 items-center'>
                <Image src="/images/image2.jpg" alt="image2" width={800} height={800} className='w-10 h-10 object-cover rounded-full'/>
                <div className='text-white'>
                        <p>Aditya</p>
                        <p className='text-secondary-text font-light'>@adii</p>
                </div>
                </div>
                <button className='bg-white text-black py-2 px-5 font-sembold cursor-pointer rounded-full'>
                    Follow
                </button>
                </div>
                <div className='flex justify-between items-center mb-6'>
                <div className='flex gap-2 items-center'>
                <Image src="/images/image3.jpg" alt="image3" width={800} height={800} className='w-10 h-10 object-cover rounded-full'/>
                <div className='text-white'>
                        <p>Adimehta</p>
                        <p className='text-secondary-text font-light'>@adimehta</p>
                </div>
                </div>
                <button className='bg-white text-black py-2 px-5 font-sembold cursor-pointer rounded-full'>
                    Follow
                </button>
                </div>
            </div>
    </aside>
  )
}
