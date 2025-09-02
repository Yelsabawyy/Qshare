"use client";

import { useState, useEffect } from "react";

interface QuizPageProps {
  params: Promise<{ id: string }>; // For [id] single dynamic routes
}

interface QuizType {
  _id: string;
  questions: string[];
  creatorEmail: string;
}

export default function Page({ params }: QuizPageProps) {
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        // Await the params promise
        const { id } = await params;

        const response = await fetch("/api/quiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        if (response.status === 404) {
          setError("Quiz not found");
          return;
        }
        if (!response.ok) throw new Error("Failed to fetch quiz");

        const quizData: QuizType = await response.json();
        setQuiz(quizData);
        setAnswers(new Array(quizData.questions.length).fill(""));
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError("Failed to fetch quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [params]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/quiz/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quiz, answers, userEmail }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError("Failed to submit quiz. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting quiz:", err);
      setError("Error submitting quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-gray-300 border-t-[#002F25] rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gray-700 font-semibold">
        {error}
      </div>
    );

  if (submitted)
    return (
      <div className="max-w-2xl mx-auto px-5 py-10 min-h-[70vh]">
        <div className="text-center p-8 bg-green-50 border border-green-200">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Quiz Submitted Successfully!
          </h2>
          <p className="text-green-700">Thank you for completing the quiz.</p>
        </div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-[#002F25] text-center">
        Quiz ID: {quiz?._id}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 bg-white">
          <label
            htmlFor="userEmail"
            className="block text-lg font-medium text-gray-800 mb-3"
          >
            Your Email
          </label>
          <input
            id="userEmail"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#002F25] focus:border-transparent"
          />
        </div>

        {quiz?.questions.map((question, index) => (
          <div key={index} className="p-4 bg-white">
            <label
              htmlFor={`question-${index}`}
              className="block text-lg font-medium text-gray-800 mb-3"
            >
              {index + 1}. {question}
            </label>
            <textarea
              id={`question-${index}`}
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#002F25] focus:border-transparent resize-vertical min-h-[100px]"
              placeholder="Type your answer here..."
              required
            />
          </div>
        ))}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={
              isSubmitting ||
              answers.some((answer) => answer.trim() === "") ||
              !userEmail
            }
            className="cursor-pointer px-8 py-3 bg-[#002F25] text-white font-medium rounded-md hover:bg-[#004A3A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
}
