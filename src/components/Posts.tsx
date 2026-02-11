import React from "react";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { FaRegComment } from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa6";
import { IoIosStats } from "react-icons/io";
import { getPosts } from "@/app/actions/getPosts";

export default async function Posts() {
  let posts = [];
  try {
    posts = await getPosts();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-secondary-text">
        <p>No posts yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post: any) => (
        <div
          key={post.id}
          className="px-4 py-2 flex gap-3 border-b border-border"
        >
          <Image
            src="/images/profile.jpg"
            alt="profile-pic"
            width={100}
            height={100}
            className="w-10 h-10 object-cover rounded-full shrink-0"
          />
          <div className="w-full">
            <div className="flex justify-between gap-1 text-sm">
              <div className="flex gap-1 items-center text-sm">
                <span className="text-white font-bold">User</span>
                <span className="text-secondary-text">@user</span>
                <span className="text-secondary-text">now</span>
              </div>
              <BsThreeDots className="text-secondary-text" />
            </div>
            <p className="text-white my-2">{post.content}</p>
            {post.imageUrl && (
              <div className="h-60 md:h-80 rounded-lg overflow-hidden border border-border my-3 relative">
                <Image
                  src={post.imageUrl}
                  alt="post-image"
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>
            )}
            <div className="flex justify-between my-4">
              <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                <FaRegComment />
                <span className="text-sm">0</span>
              </div>
              <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                <FiRepeat />
                <span className="text-sm">0</span>
              </div>
              <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                <FaRegHeart />
                <span className="text-sm">0</span>
              </div>
              <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                <IoIosStats />
                <span className="text-sm">0</span>
              </div>
              <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                <FaRegBookmark size={20} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
