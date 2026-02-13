 import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        participantIds: {
          has: parseInt(userId),
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10  ,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Get participant info for each conversation
    const conversationsWithParticipants = await Promise.all(
      conversations.map(async (conv) => {
        const otherUserId = conv.participantIds.find((id) => id !== parseInt(userId));
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

    return NextResponse.json(conversationsWithParticipants);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, otherUserId } = body;

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

    // Get other user info
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

    return NextResponse.json({
      ...conversation,
      otherUser,
    });
  } catch (error) {
    console.error("Error creating/getting conversation:", error);
    return NextResponse.json(
      { error: "Failed to process conversation" },
      { status: 500 }
    );
  }
}