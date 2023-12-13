import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

//get all posts
export async function GET() {

    const posts = await prisma.post.findMany();

  return NextResponse.json({ success: true, posts });
}



//create new post
export async function POST(request, response) {
  
  try {
    const { text, createAt } = await request.json();

    if (!text) {
      return NextResponse.json({
        success: false,
        error: "You must provide a text to create a post.",
      });
    }
    const post = await prisma.post.create({ data: { text, likes: 0, createAt } });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}