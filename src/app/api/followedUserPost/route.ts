import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET() {
  const { data: posts, error } = await supabase
    .from("users")
    .select(`id, name, isFollow, posts (id, user_id, body)`)
    .eq("isFollow", true)
    .order("id", { ascending: false });

  if (error) NextResponse.json(error);
  return NextResponse.json(posts);
}
