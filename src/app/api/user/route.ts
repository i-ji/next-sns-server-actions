import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET() {
  const { data: users, error } = await supabase
    .from("users")
    .select(`id, name, isFollow, posts (id, user_id, body)`);

  if (error) return NextResponse.json(error);
  return NextResponse.json(users);
}
