/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongobd";
import Quiz from "@/models/Quiz";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { questions, creatorEmail } = body;

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { error: "Questions are required" },
        { status: 400 }
      );
    }

    if (!creatorEmail) {
      return NextResponse.json(
        { error: "Creator email is required" },
        { status: 400 }
      );
    }

    const quiz = await Quiz.create({ questions, creatorEmail });

    return NextResponse.json(
      { id: quiz._id, url: `${process.env.URL}/quiz/${quiz._id}` },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error creating quiz:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
