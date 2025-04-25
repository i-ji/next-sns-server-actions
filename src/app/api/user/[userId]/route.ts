import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/utils/supabase";

interface ParamsType {
  params: Promise<{ userId: string }>;
}

export async function GET(request: NextRequest, { params }: ParamsType) {
  const { userId } = await params;
  const { data: users, error } = await supabase
    .from("users")
    .select(`id, name, isFollow, posts (id, user_id, body)`)
    .eq("id", userId);

  if (error) return NextResponse.json(error);
  return NextResponse.json(users);
}

export async function PATCH(request: NextRequest, { params }: ParamsType) {
  const { userId } = await params;
  const { isFollow } = await request.json();

  const { data, error } = await supabase
    .from("users")
    .update({ isFollow: isFollow })
    .eq("id", userId)
    .select();

  if (error) return NextResponse.json(error);
  return NextResponse.json(data);
}
