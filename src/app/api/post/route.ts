import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `id, body, user_id, users (
      name, isFollow
    )`
    )
    .order("id", { ascending: false });

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
