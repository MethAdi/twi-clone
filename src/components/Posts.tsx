
import React from 'react'
import Image from 'next/image'
import { BsThreeDots } from 'react-icons/bs'
import Link from 'next/link'
import { supabase } from '@/lib/supabase';
import PostActions from './PostActions';
import StaticPostActions from './StaticPostActions';
import { FaRegComment } from 'react-icons/fa'
import { FiRepeat } from 'react-icons/fi'
import { FaRegHeart } from 'react-icons/fa'
import { IoIosStats } from 'react-icons/io'
import { FaRegBookmark } from 'react-icons/fa'  

export default async function Posts() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  return (
    <div>
    {posts?.map((post) => (
        <div key={post.id} className='px-4 py-2 flex gap-3 border-b border-border'>
          <Image src="/images/image1.jpg" alt="profile-pic" width={100} height={100} className='w-10 h-10 object-cover rounded-full shrink-0' />
          <div className='w-full'>
            <div className='flex justify-between gap-1 text-sm'>
              <div className='flex gap-1 items-center text-sm'>
                <span className='text-white font-bold'>Aditya Mehta</span>
                <span className='text-secondary-text'>@adi</span>
                <span className='text-secondary-text'>just now</span>
              </div>
              <BsThreeDots className='text-secondary-text'/>
            </div>
            <div className="text-white my-2 block">{post.content}</div>
           <PostActions 
  postId={post.id} 
  likesCount={post.likes_count} 
  commentsCount={post.comments_count}
  repostsCount={post.reposts_count}
  savesCount={post.saves_count}
/>
          </div>
        </div>
      ))}
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
        <Link href ="#" className="text-white my-2 block">Sometimes when i look into the mirror</Link>
        <Link href = "#"> 
        <Image src="/images/post1.jpg" alt="post-image" width={1800} height={1800} className='h-70 md:h-130 w-full rounded-lg border border-border object-cover'/>    
        </Link>
        <StaticPostActions initialLikes={2500} initialComments={1500} initialReposts={7500} />
      </div>
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
        <Link href ="/home/post/123" className="text-white my-2 block">Sometimes when i look into the mirror</Link>
        <Link href = "/home/post/125"> 
        <Image src="/images/post1.jpg" alt="post-image" width={1800} height={1800} className='h-70 md:h-130 w-full rounded-lg border border-border object-cover'/>    
        </Link>
        <StaticPostActions initialLikes={2500} initialComments={1500} initialReposts={7500} />
      </div>
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
        <Link href ="#" className="text-white my-2 block">Sometimes when i look into the mirror</Link>
        <Link href = "#"> 
        <Image src="/images/post1.jpg" alt="post-image" width={1800} height={1800} className='h-70 md:h-130 w-full rounded-lg border border-border object-cover'/>    
        </Link>
        <StaticPostActions initialLikes={2500} initialComments={1500} initialReposts={7500} />
      </div>
    </div>
    </div>
  )
}

