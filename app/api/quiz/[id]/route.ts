import { NextRequest, NextResponse } from "next/server";
import Quiz from "@/models/Quiz";
import { connectDB } from "@/lib/mongobd";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await connectDB();

    const quiz = await Quiz.findById(id).lean();

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    const quizData = {
      ...quiz,
      _id: quiz._id.toString()
    };

    return NextResponse.json(quizData, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz" },
      { status: 500 }
    );
  }
}