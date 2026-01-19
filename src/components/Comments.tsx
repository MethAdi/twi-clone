import React from 'react'
import Link from 'next/link'
import { FaRegComment } from 'react-icons/fa'
import { FiRepeat } from 'react-icons/fi'
import { FaRegBookmark, FaRegHeart } from 'react-icons/fa6'
import { IoIosStats } from 'react-icons/io'
import Image from 'next/image'
import { BsThreeDots } from 'react-icons/bs'


export default function Comments (){
    return(
<div>
    <div className='px-4 py-2 flex gap-3 border-b border-border'>
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
</div>

    )
}
