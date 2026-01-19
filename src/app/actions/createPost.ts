"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const content = formData.get("content") as string;
  
  const { data, error } = await supabase.from("posts").insert({ content });
  
  if (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
  
  revalidatePath("/home");
  return { success: true };
}
