"use client";
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { TbPhoto } from 'react-icons/tb'
import { FaRegFaceSmile } from 'react-icons/fa6'
import { IoLocationOutline } from 'react-icons/io5'
import { RiCalendarScheduleLine } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { createPost } from '@/app/actions/createPost';

export default function CreatePost() {
    const [post, setPost] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null); 
    const fileref = useRef<HTMLInputElement | null>(null);
    const isDisabled = post.trim() === "" && !imagePreview; 
    const [showPicker, setShowPicker] = useState(false);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) { 
            setImagePreview(URL.createObjectURL(file));
        }
    };

   const removeImage = () =>{
        setImagePreview(null);
        if(fileref.current) fileref.current.value ="";
   }

   const onEmojiClick = (emojiData: EmojiClickData) => {
   setPost ((prev)=> prev + emojiData.emoji);
}

   const handlePost = async () => {
        const formData = new FormData();
        formData.append("content", post);
        
        if (fileref.current?.files?.[0]) {
            formData.append("image", fileref.current.files[0]);
        }
        
        await createPost(formData);
        
        // Clear the form after posting
        setPost("");
        setImagePreview(null);
        if (fileref.current) fileref.current.value = "";
   }

    return ( 
    <div className='flex gap-4 p-4 border-b border-border'>
        <Image src="/images/profile.jpg" alt="profile pic" width={500} height={500} className='w-10 h-10 object-cover rounded-full shrink-0'/>
        <div className="w-full"> 
            <textarea 
                placeholder="what's happening?" 
                className='w-full bg-transparent outline-none resize-none text-white placeholder-secondary-text text-xl py-2' 
                rows={2}
                value={post}
                onChange={(e) => setPost(e.target.value)}>
            </textarea>
            {imagePreview && (
                <div className='h-60 md:h-100 rounded-lg overflow-hidden border border-border mb-10 relative'>
                    <Image src={imagePreview} alt="preview" className='w-full h-full object-cover' width={500} height={500} />
                    <button 
                        className="absolute top-5 right-5 bg-gray-600 w-10 h-10 text-2xl rounded-full opacity-50 hover:opacity-100 cursor-pointer grid place-items-center" onClick = {removeImage}>
                        <RxCross2 size={20} />       
                    </button>
                </div>
            )}
            <div className='flex justify-between items-center pt-2'>
                <div className='flex gap-3'>
                    <div className='text-primary cursor-pointer hover:bg-hover p-2 rounded-full' onClick={() => fileref.current?.click()}>
                        <TbPhoto size={20} /> 
                    </div>
                    <div className='text-primary cursor-pointer hover:bg-hover p-2 rounded-full' onClick={() => setShowPicker(!showPicker)}>
                        <FaRegFaceSmile size={20} /> 
                    </div>
                    <div className='text-primary cursor-pointer hover:bg-hover p-2 rounded-full'>
                        <IoLocationOutline size={20} /> 
                    </div>
                    <div className='text-primary cursor-pointer hover:bg-hover p-2 rounded-full'>
                        <RiCalendarScheduleLine size={20} /> 
                    </div>
                </div> 
                {!isDisabled ? (
                    <button onClick={handlePost} className='text-black bg-white py-2 px-5 font-semibold cursor-pointer rounded-full hover:bg-gray-200'>Post</button>
                ) : (
                    <button disabled className='text-black bg-secondary-text/50 py-2 px-5 font-semibold cursor-not-allowed rounded-full'>Post</button>  
                )}
                {showPicker && (
                    <div className='fixed z-10 top-50 left-1/2 w-[90%] max-w-2xl -translate-x-1/2'>
                            <EmojiPicker theme ={Theme.DARK}  onEmojiClick = {onEmojiClick} style ={{ width:"100%", background:"black" }}/>
                </div>
                )}
            </div>
            <input type="file" ref={fileref} className='hidden' onChange={handleFileChange} accept="image/*"></input>
        </div>
    </div> 
    )
}