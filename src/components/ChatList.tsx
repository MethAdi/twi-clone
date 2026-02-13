"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  getUserConversations,
  searchUsers,
  getOrCreateConversation,
} from "@/app/actions/chatActions";
import { IoSearch } from "react-icons/io5";
import { MdOutlineGroupAdd } from "react-icons/md";

interface Conversation {
  id: number;
  participantIds: number[];
  messages: Array<{
    id: number;
    conversationId: number;
    senderId: number;
    content: string;
    imageUrl: string | null;
    createdAt: Date;
    isRead: boolean;
  }>;
  otherUser: {
    id: number;
    username: string;
    firstName: string | null;
    lastName: string | null;
    profileImage: string | null;
  } | null;
}

interface ChatListProps {
  userId: number;
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversationId?: number;
}

export default function ChatList({
  userId,
  onSelectConversation,
  selectedConversationId,
}: ChatListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread" | "groups">("all");

  useEffect(() => {
    loadConversations();
    const interval = setInterval(loadConversations, 3000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const loadConversations = async () => {
    const convs = await getUserConversations(userId);
    setConversations(convs);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await searchUsers(searchQuery, userId);
      setSearchResults(results);
    } finally {
      setIsSearching(false);
    }
  };

  const handleStartChat = async (user: any) => {
    try {
      const conversation = await getOrCreateConversation(userId, user.id);
      if (conversation) {
        onSelectConversation({
          id: conversation.id,
          participantIds: conversation.participantIds,
          messages: conversation.messages || [],
          otherUser: user,
        });
      }
      setSearchQuery("");
      setSearchResults([]);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const filteredConversations = conversations;

  return (
    <div className="h-screen flex flex-col bg-black border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border sticky top-0 bg-black/95 backdrop-blur">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Chat</h2>
          <button className="text-primary hover:bg-hover p-2 rounded-full transition">
            <MdOutlineGroupAdd size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-gray-900 rounded-full px-4 py-2 mb-4">
          <IoSearch className="text-secondary-text" size={20} />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none placeholder-secondary-text text-sm"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["all", "unread", "groups"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold transition ${
                filter === f
                  ? "bg-white text-black"
                  : "border border-border text-white hover:bg-gray-900"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {searchQuery.trim() && (
        <div className="border-b border-border">
          {searchResults.length === 0 ? (
            <div className="p-4 text-secondary-text text-center text-sm">
              {isSearching ? "Searching..." : "No users found"}
            </div>
          ) : (
            searchResults.map((user) => (
              <button
                key={user.id}
                onClick={() => handleStartChat(user)}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-900 transition border-b border-border last:border-b-0"
              >
                <Image
                  src={user.profileImage || "/images/profile.jpg"}
                  alt="profile"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div className="flex-1 text-left">
                  <div className="font-semibold text-white">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-secondary-text text-sm">
                    @{user.username}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-secondary-text text-lg font-semibold">
                Welcome to your inbox!
              </p>
              <p className="text-secondary-text text-sm">
                Send a message to start a conversation
              </p>
            </div>
          </div>
        ) : (
          filteredConversations.map(
            (conv) =>
              conv.otherUser && (
                <button
                  key={conv.id}
                  onClick={() => onSelectConversation(conv)}
                  className={`w-full flex items-start gap-3 p-4 hover:bg-gray-900 transition border-b border-border ${
                    selectedConversationId === conv.id ? "bg-gray-900" : ""
                  }`}
                >
                  <Image
                    src={conv.otherUser.profileImage || "/images/profile.jpg"}
                    alt="profile" 
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded-full shrink-0"
                  />
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-white truncate">
                          {conv.otherUser.firstName} {conv.otherUser.lastName}
                        </div>
                        {conv.messages.some(
                          (msg) => !msg.isRead && msg.senderId !== userId
                        ) && (
                          <div className="w-2 h-2 bg-primary rounded-full shrink-0"></div>
                        )}
                      </div>
                      <div className="text-secondary-text text-xs ml-2 shrink-0">
                        {conv.messages[0] &&
                          formatTime(new Date(conv.messages[0].createdAt))}
                      </div>
                    </div>
                    <div className="text-secondary-text text-sm truncate">
                      {conv.messages[0]?.content || "No messages yet"}
                    </div>
                  </div>
                </button>
              ),
          )
        )}
      </div>
    </div>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;

  return date.toLocaleDateString();
}
