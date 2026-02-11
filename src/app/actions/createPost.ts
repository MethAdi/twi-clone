"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function createPost(formData: FormData) {
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File | null;

  if (!content || content.trim().length === 0) return;

  try {
    let imageUrl = null;

    // Handle image upload if present
    if (imageFile && imageFile.size > 0) {
      // Create unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${imageFile.name}`;

      // Save to public/images folder
      const uploadsDir = join(process.cwd(), "public", "images");
      await mkdir(uploadsDir, { recursive: true });

      const filepath = join(uploadsDir, filename);
      const bytes = await imageFile.arrayBuffer();
      await writeFile(filepath, Buffer.from(bytes));

      // Store just the path reference
      imageUrl = `/images/${filename}`;
    }

    await prisma.post.create({
      data: {
        content,
        imageUrl,
      },
    });
    revalidatePath("/home");
  } catch (error) {
    console.error("Error creating post:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Detailed error:", errorMessage);
    throw new Error(`Failed to create post: ${errorMessage}`);
  }
}
