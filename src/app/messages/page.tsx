"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatList from "@/components/ChatList";
import ChatWindow from "@/components/ChatWindow";
import { getOrCreateConversation } from "@/app/actions/chatActions";
import { IoArrowBack } from "react-icons/io5";

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
  }>;
  otherUser: {
    id: number;
    username: string;
    firstName: string | null;
    lastName: string | null;
    profileImage: string | null;
  } | null;
}

export default function MessagesPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  }, []);

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black">
      <div className="w-full md:w-96 flex flex-col">
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <button
            onClick={() => router.push("/home")}
            className="text-primary hover:bg-hover p-2 rounded-full transition"
          >
            <IoArrowBack size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatList
            userId={userId}
            onSelectConversation={setSelectedConversation}
            selectedConversationId={selectedConversation?.id}
          />
        </div>
      </div>
      {selectedConversation && (
        <div className="hidden md:flex flex-1">
          <ChatWindow
            conversationId={selectedConversation.id}
            userId={userId}
            otherUser={selectedConversation.otherUser}
            onBack={() => setSelectedConversation(null)}
          />
        </div>
      )}
      {!selectedConversation && (
        <div className="hidden md:flex flex-1 items-center justify-center text-secondary-text">
          <p>Select a conversation to start messaging</p>
        </div>
      )}
    </div>
  );
}
