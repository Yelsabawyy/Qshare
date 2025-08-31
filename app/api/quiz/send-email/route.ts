import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { quiz, answers, userEmail } = body;

    if (!quiz || !answers || !quiz.creatorEmail || !quiz.questions || !userEmail) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const creatorEmail = quiz.creatorEmail;

    // Build email content: include who did the test
    let emailContent = `
      <h2>Quiz Submission</h2>
      <p><b>Test Taker Email:</b> ${userEmail}</p>
      <hr/>
    `;

    quiz.questions.forEach((question: string, index: number) => {
      emailContent += `<p><b>Q${index + 1}:</b> ${question}</p>`;
      emailContent += `<p><b>A${index + 1}:</b> ${answers[index]}</p><hr/>`;
    });

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email to quiz creator
    await transporter.sendMail({
      from: `"Qshare App" <${process.env.EMAIL_USER}>`,
      to: creatorEmail,
      subject: "New Quiz Submission",
      html: emailContent,
    });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Send quiz email error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
