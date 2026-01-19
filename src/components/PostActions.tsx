"use client";

import React, { useState } from 'react';
import { FaRegComment, FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import { FiRepeat } from 'react-icons/fi';
import { IoIosStats } from 'react-icons/io';
import { likePost, unlikePost, repostPost, unrepostPost, savePost, unsavePost } from '@/app/actions/postActions';

interface PostActionsProps {
  postId: string;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  savesCount: number;
}

export default function PostActions({ postId, likesCount, commentsCount, repostsCount, savesCount }: PostActionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const [likes, setLikes] = useState(likesCount);
  const [reposts, setReposts] = useState(repostsCount);
  
  const handleLike = async () => {
    if (isLiked) {
      await unlikePost(postId);
      setLikes(likes - 1);
    } else {
      await likePost(postId);
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleRepost = async () => {
    if (isReposted) {
      await unrepostPost(postId);
      setReposts(reposts - 1);
    } else {
      await repostPost(postId);
      setReposts(reposts + 1);
    }
    setIsReposted(!isReposted);
  };

  const handleSave = async () => {
    if (isSaved) {
      await unsavePost(postId);
    } else {
      await savePost(postId);
    }
    setIsSaved(!isSaved);
  };

  return (
    <div className='flex justify-between my-4'>
      {/* Comments */}
      <div className='text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer'>
        <FaRegComment />
        <span className='text-sm'>{commentsCount || 0}</span>
      </div>

      {/* Repost */}
      <div 
        onClick={handleRepost} 
        className={`flex items-center gap-1 cursor-pointer ${isReposted ? 'text-green-500' : 'text-secondary-text hover:text-green-400'}`}
      >
        <FiRepeat />
        <span className='text-sm'>{reposts || 0}</span>
      </div>

      {/* Like */}
      <div 
        onClick={handleLike} 
        className={`flex items-center gap-1 cursor-pointer ${isLiked ? 'text-red-500' : 'text-secondary-text hover:text-red-400'}`}
      >
        {isLiked ? <FaHeart /> : <FaRegHeart />}
        <span className='text-sm'>{likes || 0}</span>
      </div>

      {/* Stats */}
      <div className='text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer'>
        <IoIosStats />
        <span className='text-sm'>0</span>
      </div>

      {/* Save */}
      <div 
        onClick={handleSave} 
        className={`flex items-center gap-1 cursor-pointer ${isSaved ? 'text-blue-500' : 'text-secondary-text hover:text-blue-400'}`}
      >
        {isSaved ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
      </div>
    </div>
  );
}