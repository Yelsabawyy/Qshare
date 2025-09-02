import { NextRequest, NextResponse } from "next/server";
import Quiz from "@/models/Quiz";
import { Types } from "mongoose";
import { connectDB } from "@/lib/mongobd";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Quiz ID is required" }, 
        { status: 400 }
      );
    }

    // if (!Types.ObjectId.isValid(id)) {
    //   return NextResponse.json(
    //     { error: "Invalid quiz ID format" }, 
    //     { status: 400 }
    //   );
    // }

    await connectDB();
    
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz" },
      { status: 500 }
    );
  }
}