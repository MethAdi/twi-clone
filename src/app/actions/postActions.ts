// src/app/actions/postActions.ts
"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function likePost(postId: string) {
  const { error } = await supabase.rpc('increment_likes', { post_id: postId });
  
  if (error) {
    console.error("Error liking post:", error);
    throw new Error("Failed to like post");
  }
  
  revalidatePath("/home");
  return { success: true };
}

export async function unlikePost(postId: string) {
  const { error } = await supabase.rpc('decrement_likes', { post_id: postId });
  
  if (error) {
    console.error("Error unliking post:", error);
    throw new Error("Failed to unlike post");
  }
  
  revalidatePath("/home");
  return { success: true };
}

export async function repostPost(postId: string) {
  const { error } = await supabase.rpc('increment_reposts', { post_id: postId });
  
  if (error) {
    console.error("Error reposting:", error);
    throw new Error("Failed to repost");
  }
  
  revalidatePath("/home");
  return { success: true };
}

export async function unrepostPost(postId: string) {
  const { error } = await supabase.rpc('decrement_reposts', { post_id: postId });
  
  if (error) {
    console.error("Error unreposting:", error);
    throw new Error("Failed to unrepost");
  }
  
  revalidatePath("/home");
  return { success: true };
}

export async function savePost(postId: string) {
  const { error } = await supabase.rpc('increment_saves', { post_id: postId });
  
  if (error) {
    console.error("Error saving post:", error);
    throw new Error("Failed to save post");
  }
  
  revalidatePath("/home");
  return { success: true };
}

export async function unsavePost(postId: string) {
  const { error } = await supabase.rpc('decrement_saves', { post_id: postId });
  
  if (error) {
    console.error("Error unsaving post:", error);
    throw new Error("Failed to unsave post");
  }
  
  revalidatePath("/home");
  return { success: true };
}