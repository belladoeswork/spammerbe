import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

//update post
export async function PUT(request, response) {
  try {
    const { postId } = response.params;

    const { text } = await request.json();

    const post = await prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found.",
      });
    }

    const updatedposttext = await prisma.post.update({
      where: {
        id: postId,
      },
      data: { text },
    });
    const updatedpostlikes = await prisma.post.update({
        where: {
          id: postId,
        },
        data: { likes: like+1 },
    });
    return NextResponse.json({ success: true, post: updatedposttext});
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}


//delete post
export async function DELETE (request, response) {
    try {
        const { postId } = response.params;

        const post = await prisma.post.findFirst({
            where: {
                id: postId,
              }
        });

        if (!post) {
            return NextResponse.json({
              success: false,
              message: "No post with that ID found.",
            });
          }
      
        const deletedpost = await prisma.post.delete({
            where: {
              id: postId,
            }
          });

        return NextResponse.json({ success: true, post: deletedpost });

    } catch (error){
        return NextResponse.json({ success: false, error: error.message });

    }
}