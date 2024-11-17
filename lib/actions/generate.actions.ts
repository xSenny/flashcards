'use server'
import { groq } from '@ai-sdk/groq';
import { generateObject, generateText } from 'ai';
import { z } from 'zod';



export const generateQuestions = async (input: string) => {
  const { object } = await generateObject({
    model: groq('gemma2-9b-it'),
    schema: z.object({
      qa: z.array(
        z.object({
          question: z.string(),
          answer: z.string()
        })
      )
    }), 
    system: 'You help students to study. Write from the following text 10 questions and their answers for anki cards.',
    prompt: input,
  });

  console.log(object)

  return object;
}