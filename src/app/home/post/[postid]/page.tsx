import React from 'react'
import GoBackButton from '@/components/GoBackButton'
import Image from 'next/image'
import Link from 'next/link'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { FiRepeat } from 'react-icons/fi'
import { FaRegBookmark, FaRegHeart } from 'react-icons/fa6'
import { IoIosStats } from 'react-icons/io'
import ReplyPost from '@/components/ReplyPost'
import Comments from '@/components/Comments'

export default function Page(){
  return (
    <div>
        <div className='flex justify-between items-center mb-3 px-4 py-2'>
            <div className='text-white flex items-center gap-3'>
                    <GoBackButton />
                    <span className='font-bold text-xl'></span>
            </div>
            <button className='border border-border rounded-full px-4 py-1 cursor-pointer text-white'>
                Reply
            </button>
        </div>
          <div className='px-4 py-2 flex gap-3 border-b border-border'>
              <Image src="/images/image1.jpg" alt="profile-pic" width={100} height={100} className='w-10 h-10 object-cover rounded-full shrink-0' />
                <div className='w-full'>
                    <div className='flex justify-between gap-1 text-sm'>
                        <div className='flex gap-1 items-center text-sm'>
                                <span className='text-white font-bold'>Aditya Mehta</span>
                                <span className='text-secondary-text'>@adi</span>
                                <span className='text-secondary-text'>4h</span>
                    </div>
                    <BsThreeDots className='text-secondary-text'/>
                </div>
                <div className="text-white my-2 block">Sometimes when i look into the mirror</div>
                <div>
                <Image src="/images/post1.jpg" alt="post-image" width={1800} height={1800} className='h-70 md:h-130 w-full rounded-lg border border-border object-cover'/>    
                </div>
                <div className='flex justify-between my-4'>
                    <div className='text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer'>
                            <FaRegComment />
                            <span className='text-sm'>1.5k</span>
                    </div>
                    <div className='text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer'>
                            <FiRepeat />
                            <span className='text-sm'>7.5k</span>
                    </div>
                    <div className='text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer'>
                            <FaRegHeart/>
                            <span className='text-sm'>2.5k</span>
                    </div>
                    <div className='text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer'>
                            <IoIosStats />
                            <span className='text-sm'>5k</span>
                    </div>
                    <div className='text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer'>
                            <FaRegBookmark size={20}/>
                    </div>
                </div>
              </div>
            </div>
            <ReplyPost />
            <Comments />
    </div>
  )
}   

