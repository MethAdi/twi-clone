import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    const { username, firstName, lastName, email, profileImage } =
      await request.json();

    if (!username) {
      return NextResponse.json(
        { success: false, message: "Username is required" },
        { status: 400 },
      );
    }

    const updateData: any = {
      firstName: firstName || null,
      lastName: lastName || null,
      email: email || null,
    };

    if (profileImage) {
      updateData.profileImage = profileImage;
    }

    const updatedUser = await prisma.user.update({
      where: { username },
      data: updateData,
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update user" },
      { status: 500 },
    );
  }
}
