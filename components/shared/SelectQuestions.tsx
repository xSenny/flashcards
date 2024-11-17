"use client";

import { useState, useEffect, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { createCards } from "@/lib/actions/card.actions";
import { useRouter } from 'next/navigation'
type Question = {
  question: string;
  answer: string;
};

export default function SelectQuestions({ groupId }: { groupId: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<number>>(new Set());
  const [pending, startPending] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setQuestions(JSON.parse(window.localStorage.getItem(groupId) || "[]"));
  }, [groupId]);

  const toggleQuestion = (index: number) => {
    setSelectedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const submit = async () => {
    startPending(async () => {
      if (selectedQuestions.size === 0) {
        alert("Select at least one question");
        return;
      }

      const selectedQuestionsArray = Array.from(selectedQuestions);

      const selectedQuestionsData = selectedQuestionsArray.map((index) => {
        const question = questions[index];
        return {
          group: groupId,
          question: question.question,
          answer: question.answer,
        };
      });

      await createCards(selectedQuestionsData);

      window.localStorage.removeItem(groupId);
      router.push(`/${groupId}/edit`);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 dark:from-purple-900 dark:to-blue-900 p-4">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-purple-800 dark:text-purple-200">
          Quiz Question Selector
        </h1>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((q, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className={`h-full flex flex-col cursor-pointer transition-all duration-200 ${
                  selectedQuestions.has(index)
                    ? "ring-2 ring-purple-500 dark:ring-purple-400 shadow-lg"
                    : "hover:shadow-md"
                }`}
                onClick={() => toggleQuestion(index)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Question {index + 1}</CardTitle>
                  <Checkbox
                    checked={selectedQuestions.has(index)}
                    onCheckedChange={() => toggleQuestion(index)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="font-semibold mb-2">{q.question}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{q.answer}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Selected: {selectedQuestions.size} / {questions.length}
          </p>
          <Button
            onClick={submit}
            disabled={selectedQuestions.size === 0 || pending}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Save Selected Questions
          </Button>
        </div>
      </footer>
    </div>
  );
}
