import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";



//get comments
export async function GET(request, response) {
    try{

    const { postId } = response.params;

    const post = await prisma.post.findFirst({
        where: {
          id: postId,
        },
    });
    if (!post) {
        return NextResponse.json({
          success: false,
          message: "No post with that ID found.",
        });
    }

    const comments = await prisma.comment.findMany( {where: {
        postId,
      },
    });

  return NextResponse.json({ success: true, comments });
}
catch (error) {
    return NextResponse.json({ success: false, error: error.message });

}
}



// //create new comment
export async function POST(request, response) {

    const { postId } = response.params;
    const { text } = await request.json();

    if (!text) {
        return NextResponse.json({
          success: false,
          error: "You must provide a text to comment.",
        });
    }
  
    const comment = await prisma.comment.create({ data: {
        text, postId
      },
    });

    return NextResponse.json({ success: true, comment });
}

