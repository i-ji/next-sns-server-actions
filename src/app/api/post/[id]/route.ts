import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

interface ParamsType {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: ParamsType) {
  const { id } = await params;
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `id, body, user_id, users (
      name, isFollow
    )`
    )
    .eq("id", id);
  if (error) return NextResponse.json(error);
  return NextResponse.json(posts);
}

export async function PUT(request: NextRequest, { params }: ParamsType) {
  const { id } = await params;
  const { body } = await request.json();
  const { data: posts, error } = await supabase
    .from("posts")
    .update({ body: body })
    .eq("id", id).select(`id, body, user_id, users (
      name, isFollow
    )`);

  if (error) return NextResponse.json(error);
  return NextResponse.json(posts);
}

export async function DELETE(request: NextRequest, { params }: ParamsType) {
  const { id } = await params;

  const { data: posts, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .select(
      `id, body, user_id, users (
      name, isFollow
    )`
    );

  if (error) return NextResponse.json(error);
  return NextResponse.json(posts);
}
