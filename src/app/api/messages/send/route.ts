import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversationId, senderId, content, imageUrl } = body;

    if (!conversationId || !senderId || !content) {
      return NextResponse.json(
        { error: "conversationId, senderId, and content are required" },
        { status: 400 }
      );
    }
    
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        content,
        imageUrl: imageUrl || null,
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
      },
    });

    // Update conversation's updatedAt timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}