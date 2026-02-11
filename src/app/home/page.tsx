import React from "react";
import CreatePost from "@/components/CreatePost";
import Posts from "@/components/Posts";
import Header from "@/components/Header";

export default function Page() {
  return (
    <div>
      <Header />
      <div className="border border-border h-14 grid grid-cols-2 text-white">
        <button className="cursor-pointer font-semibold hover:bg-hover">
          For You
        </button>
        <button className="cursor-pointer font-semibold hover:bg-hover">
          Following
        </button>
      </div>
      <CreatePost />
      <Posts />
    </div>
  );
}
