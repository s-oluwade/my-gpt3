"use server";

import OpenAI from "openai";

export async function getGPTResponse(prompt: string) {

    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      });

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 100,
        temperature: 1,
        presence_penalty: 0,
        frequency_penalty: 0,
      });

      const quote = completion.choices[0].message;

      return quote;
}