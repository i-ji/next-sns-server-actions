"use server";

import { supabase } from "./supabase";

export async function addActionPost(body: string) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ body: body }])
      .select(
        `id, user_id, body, users (
                name, isFollow
                )`
      )
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function updateActionPost(id: number, body: string) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .update({ body: body })
      .eq("id", id).select(`id, body, user_id, users (
      name, isFollow
    )`);

    if (error) {
      throw error;
    }
    return data;
  } catch (e) {
    console.error(e);
  }
}
