"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";

const QuestionItem = z.object({
  question: z.string().min(1, "Question is required"),
});

const FormSchema = z.object({
  questions: z.array(QuestionItem).min(1, "At least one question is required"),
});

type FormValues = z.infer<typeof FormSchema>;

// 2) Component
export default function QuestionsForm() {
  const [loadingComponent, setLoadingComponent] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!getCookie("email")) {
      router.push("/");
    } else {
      setLoadingComponent(false);
    }
  }, [router]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { questions: [{ question: "" }] }, // start with one field
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitted questions:", data.questions);
    // send to backend or state manager
  };

  return loadingComponent ? (
    <div className="min-h-[70vh] flex items-center text-center">
      <div className="flex items-center justify-center h-full w-full">
        <div className="h-10 w-10 border-4 border-gray-300 border-t-[#002F25] rounded-full animate-spin"></div>
      </div>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl mx-auto px-5 min-h-[80vh]"
    >
      <label className="block text-sm font-medium text-gray-700">
        Questions
      </label>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2">
            <input
              {...register(`questions.${index}.question` as const)}
              placeholder={`Question ${index + 1}`}
              className="flex-1 px-3 py-2 border rounded-none "
            />

            {/* Remove button (hide if only one) */}
            {fields.length > 1 ? (
              <button
                type="button"
                onClick={() => remove(index)}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full cursor-pointer border bg-white hover:bg-gray-50"
                title="Remove question"
              >
                −
              </button>
            ) : null}
          </div>
        ))}

        {/* Field-level errors */}
        {errors.questions?.message ? (
          <p className="text-sm text-red-600">{errors.questions.message}</p>
        ) : null}

        {/* Per-item errors */}
        {errors.questions &&
          Array.isArray(errors.questions) &&
          errors.questions.map((err, i) => {
            if (!err) return null;
            return (
              <p key={i} className="text-sm text-red-600">
                {`Question ${i + 1}: ${err.question?.message ?? ""}`}
              </p>
            );
          })}
      </div>

      {/* Add (plus) button */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => append({ question: "" })}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-none cursor-pointer bg-[#CCFB87] text-[#002F25] font-medium hover:brightness-95"
        >
          {/* Simple plus icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
          </svg>
          Add question
        </button>

        <button
          type="submit"
          className="px-4 py-2 rounded-none cursor-pointer bg-[#002F25] text-white font-medium"
        >
          Save
        </button>
      </div>
    </form>
  );
}
