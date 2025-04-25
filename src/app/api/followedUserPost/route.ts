import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `id, body, user_id, users (
    name, isFollow
  )`
    )
    .filter("users.isFollow", "eq", true)
    .not("users", "is", null)
    .range(offset, offset + limit - 1)
    .order("id", { ascending: false });

  if (error) NextResponse.json(error);
  return NextResponse.json(posts);
}
