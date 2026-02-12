"use server";

import { prisma } from "@/lib/prisma";

export async function loginUser(username: string, password: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (user && user.password === password) {
      return { success: true, userId: user.id, username: user.username };
    }

    return { success: false, message: "Invalid username or password" };
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: "Login failed" };
  }
}
export async function registerUser(
  email: string,
  username: string,
  firstName: string,
  lastName: string,
  password: string,
) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

      const user = await prisma.user.create({
        data: {
          email,
          username,
          password,
          firstName,
          lastName,
        },
      });

    return { success: true, userId: user.id };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "Registration failed" };
  }
}
