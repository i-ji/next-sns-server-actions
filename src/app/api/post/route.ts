import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limitParam = searchParams.get("limit");

  let query = supabase
    .from("posts")
    .select(
      `id, body, user_id, users (
      name, isFollow
    )`
    )
    .order("id", { ascending: false });

  if (limitParam !== "all") {
    const limit = parseInt(limitParam || "10", 10);
    query = query.range(offset, offset + limit - 1);
  }

  const { data: posts, error } = await query;

  if (error) return NextResponse.json(error);

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const { body } = await request.json();

  const { data, error } = await supabase
    .from("posts")
    .insert([{ body: body }])
    .select(
      `id, body, user_id, users (
      name, isFollow
    )`
    );

  if (error) return NextResponse.json(error);
  return NextResponse.json(data);
}
