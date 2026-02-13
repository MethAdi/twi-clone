"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { getMessages, sendMessage } from "@/app/actions/chatActions";
import { IoArrowBack } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineMoreHoriz } from "react-icons/md";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  content: string;
  imageUrl: string | null;
  createdAt: Date;
  sender: {
    id: number;
    username: string;
    profileImage: string | null;
  };
}

interface ChatWindowProps {
  conversationId: number;
  userId: number;
  otherUser: {
    id: number;
    username: string;
    firstName: string | null;
    lastName: string | null;
    profileImage: string | null;
  } | null;
  onBack: () => void;
}

export default function ChatWindow({
  conversationId,
  userId,
  otherUser,
  onBack,
}: ChatWindowProps) {
  if (!otherUser) {
    return (
      <div className="h-screen flex flex-col bg-black border-l border-border items-center justify-center">
        <p className="text-secondary-text">User not found</p>
      </div>
    );
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const fileref = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 1500);
    return () => clearInterval(interval);
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = useCallback(async () => {
    const msgs = await getMessages(conversationId);
    setMessages(msgs);
  }, [conversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !imagePreview) return;

    setIsLoading(true);
    try {
      await sendMessage(
        conversationId,
        userId,
        content,
        imagePreview || undefined,
      );
      setContent("");
      setImagePreview(null);
      if (fileref.current) fileref.current.value = "";
      await loadMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileref.current) fileref.current.value = "";
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setContent((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };

  return (
    <div className="h-screen flex flex-col bg-black border-l border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-black/80 backdrop-blur">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onBack}
            className="text-primary hover:bg-hover p-2 rounded-full transition md:hidden"
          >
            <IoArrowBack size={20} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <Image
              src={otherUser.profileImage || "/images/profile.jpg"}
              alt="profile"
              width={40}
              height={40}
              className="w-10 h-10 object-cover rounded-full"
            />
            <div>
              <div className="font-semibold text-white">
                {otherUser.firstName} {otherUser.lastName}
              </div>
              <div className="text-secondary-text text-xs">
                @{otherUser.username}
              </div>
            </div>
          </div>
        </div>
        <button className="text-primary hover:bg-hover p-2 rounded-full transition">
          <MdOutlineMoreHoriz size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Image
                src={otherUser.profileImage || "/images/profile.jpg"}
                alt="profile"
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
              />
              <p className="font-semibold text-white text-lg">
                {otherUser.firstName} {otherUser.lastName}
              </p>
              <p className="text-secondary-text text-sm">
                @{otherUser.username}
              </p>
              <p className="text-secondary-text text-sm mt-4">
                This conversation is just getting started
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.senderId === userId ? "flex-row-reverse" : ""}`}
            >
              <Image
                src={msg.sender.profileImage || "/images/profile.jpg"}
                alt="profile"
                width={40}
                height={40}
                className="w-8 h-8 object-cover rounded-full shrink-0 mt-1"
              />
              <div
                className={`max-w-xs lg:max-w-md ${
                  msg.senderId === userId
                    ? "bg-primary rounded-3xl rounded-tr-sm"
                    : "bg-gray-900 rounded-3xl rounded-tl-sm"
                } p-4`}
              >
                {msg.imageUrl && (
                  <Image
                    src={msg.imageUrl}
                    alt="message"
                    width={300}
                    height={300}
                    className="rounded-2xl max-h-64 object-cover mb-2"
                  />
                )}
                {msg.content && (
                  <p
                    className={`break-words ${msg.senderId === userId ? "text-black" : "text-white"}`}
                  >
                    {msg.content}
                  </p>
                )}
                <p
                  className={`text-xs ${msg.senderId === userId ? "text-gray-700" : "text-gray-400"} mt-1`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-border p-4 space-y-3 bg-black"
      >
        {imagePreview && (
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border">
            <Image
              src={imagePreview}
              alt="preview"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-gray-600 w-6 h-6 rounded-full grid place-items-center"
              onClick={removeImage}
            >
              <RxCross2 size={14} />
            </button>
          </div>
        )}
        <div className="flex items-end gap-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileref.current?.click()}
              className="text-primary hover:bg-hover p-2 rounded-full transition"
            >
              📷
            </button>
            <button
              type="button"
              onClick={() => setShowPicker(!showPicker)}
              className="text-primary hover:bg-hover p-2 rounded-full transition"
            >
              <BsEmojiSmile size={18} />
            </button>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Aa"
            rows={1}
            className="flex-1 bg-gray-900 text-white outline-none placeholder-secondary-text border border-border rounded-2xl px-4 py-3 resize-none"
            style={{ maxHeight: "100px" }}
          />
          <button
            type="submit"
            disabled={isLoading || (!content.trim() && !imagePreview)}
            className="bg-primary text-black px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>
        <input
          type="file"
          ref={fileref}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
        {showPicker && (
          <div className="fixed z-10 top-50 left-1/2 w-[90%] max-w-2xl -translate-x-1/2">
            <EmojiPicker
              theme={Theme.DARK}
              onEmojiClick={onEmojiClick}
              style={{ width: "100%", background: "black" }}
            />
          </div>
        )}
      </form>
    </div>
  );
}
