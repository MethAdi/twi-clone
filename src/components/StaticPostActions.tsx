 "use client";

import React, { useState } from 'react';
import { FaRegComment, FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import { FiRepeat } from 'react-icons/fi';
import { IoIosStats } from 'react-icons/io';

interface StaticPostActionsProps {
  initialLikes: number;
  initialComments: number;
  initialReposts: number;
}

export default function StaticPostActions({ initialLikes, initialComments, initialReposts }: StaticPostActionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const [likes, setLikes] = useState(initialLikes);
  const [reposts, setReposts] = useState(initialReposts);

  return (
    <div className='flex justify-between my-4'>
      {/* Comments */}
      <div className='text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer'>
        <FaRegComment />
        <span className='text-sm'>{initialComments}</span>
      </div>

      {/* Repost */}
      <div 
        onClick={() => {
          if (isReposted) {
            setReposts(reposts - 1);
          } else {
            setReposts(reposts + 1);
          }
          setIsReposted(!isReposted);
        }}
        className={`flex items-center gap-1 cursor-pointer ${isReposted ? 'text-green-500' : 'text-secondary-text hover:text-green-400'}`}
      >
        <FiRepeat />
        <span className='text-sm'>{reposts}</span>
      </div>

      {/* Like */}
      <div 
        onClick={() => {
          if (isLiked) {
            setLikes(likes - 1);
          } else {
            setLikes(likes + 1);
          }
          setIsLiked(!isLiked);
        }}
        className={`flex items-center gap-1 cursor-pointer ${isLiked ? 'text-red-500' : 'text-secondary-text hover:text-red-400'}`}
      >
        {isLiked ? <FaHeart /> : <FaRegHeart />}
        <span className='text-sm'>{likes}</span>
      </div>

      {/* Stats */}
      <div className='text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer'>
        <IoIosStats />
        <span className='text-sm'>5k</span>
      </div>

      {/* Save */}
      <div 
        onClick={() => setIsSaved(!isSaved)}
        className={`flex items-center gap-1 cursor-pointer ${isSaved ? 'text-blue-500' : 'text-secondary-text hover:text-blue-400'}`}
      >
        {isSaved ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
      </div>
    </div>
  );
}
