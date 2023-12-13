import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";



//get likes
export async function GET() {

    const likes = await prisma.post.findMany();

  return NextResponse.json({ success: true, likes });
}


//update likes
export async function PUT(request, response) {
  try {
    const { postId } = response.params;

    // const { likes } = await request.json();

    const post = await prisma.post.findFirst({
      where: { id: postId },
    });
    console.log(post.likes)

    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found.",
      });
    }

    const updatedpostlikes = await prisma.post.update({
        where: {
          id: postId,
        },
        data: { likes: {increment: 1,} },
    });
    return NextResponse.json({ success: true, post: updatedpostlikes});
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
