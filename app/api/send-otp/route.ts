import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Generate random OTP
function generateOTP(length = 6) {
  const chars =
    "1234567890";
  let OTP = "";
  for (let i = 0; i < length; i++) {
    OTP += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return OTP;
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
    const newOTP = generateOTP();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Youssef Elsabawy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Qshare: Your OTP",
      text: `Your OTP is: ${newOTP}`,
      html: `<p>Hello,</p><p>Your OTP is: <b>${newOTP}</b></p>`,
    });

    return NextResponse.json({ message: "OTP sent to email", otp:newOTP }, { status: 200 });
  } catch (error) {
    console.error("Forget OTP error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
