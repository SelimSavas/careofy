"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Question } from "@/types/test.types";

export function QuestionCard({
  question,
  questionNumber,
  selected,
  onSelect,
}: {
  question: Question;
  questionNumber: number;
  selected: string | null;
  onSelect: (optionId: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="mb-4 font-heading text-[120px] font-bold leading-none text-navy-800/5">
        {questionNumber}
      </div>
      <h3 className="mb-8 text-navy-800">{question.text}</h3>
      <div className="mb-8 space-y-4">
        {question.options.map((option) => {
          const active = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={`flex min-h-[64px] w-full items-center gap-4 rounded-xl border p-4 text-left transition duration-200 ease-out ${
                active
                  ? "border-2 border-brand-500 bg-brand-100"
                  : "border border-gray-200 bg-white hover:border-navy-800 hover:bg-navy-50"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading font-bold ${
                  active ? "bg-brand-500 text-white" : "bg-navy-100 text-navy-800"
                }`}
              >
                {option.label}
              </div>
              <span className="flex-1 text-gray-800">{option.text ?? option.label}</span>
              {active && <Check className="shrink-0 text-brand-500" size={24} />}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
