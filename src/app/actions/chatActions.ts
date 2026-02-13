"use server";

import { prisma } from "@/lib/prisma";

export async function getOrCreateConversation(userId: number, otherUserId: number) {
  try {
    // Check if conversation already exists
    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [userId, otherUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          take: 10,
        },
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: [userId, otherUserId],
          messages: {
            create: [],
          },
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
    }

    return conversation;
  } catch (error) {
    console.error("Error getting/creating conversation:", error);
    return null;
  }
}

export async function sendMessage(
  conversationId: number,
  senderId: number,
  content: string,
  imageUrl?: string,
) {
  try {
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        content,
        imageUrl,
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

    return message;
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
}

export async function getMessages(conversationId: number, limit = 50) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
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
      orderBy: {
        createdAt: "asc",
      },
      take: limit,
    });

    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

export async function getUserConversations(userId: number) {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participantIds: {
          has: userId,
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Get participant info for each conversation
    const conversationsWithParticipants = await Promise.all(
      conversations.map(async (conv) => {
        const otherUserId = conv.participantIds.find((id) => id !== userId);
        const otherUser = await prisma.user.findUnique({
          where: { id: otherUserId },
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            profileImage: true,
          },
        });

        return {
          ...conv,
          otherUser,
        };
      }),
    );

    return conversationsWithParticipants;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
}

export async function searchUsers(query: string, excludeUserId: number) {
  try {
    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            id: {
              not: excludeUserId,
            },
          },
          {
            OR: [
              {
                username: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                firstName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        profileImage: true,
      },
      take: 10,
    });

    return users;
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
}

export async function markMessagesAsRead(conversationId: number, userId: number) {
  try {
    await prisma.message.updateMany({
      where: {
        conversationId,
        senderId: {
          not: userId,
        },
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  } catch (error) {
    console.error("Error marking messages as read:", error);
  }
} 