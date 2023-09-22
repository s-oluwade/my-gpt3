'use server';

import { Article } from '@/app/api/news/route';
import OpenAI from 'openai';

export async function getGPTResponse(
    previousResponses: OpenAI.Chat.Completions.ChatCompletionMessage[],
    prompt: string,
    article: Article | null
): Promise<OpenAI.Chat.Completions.ChatCompletionMessage | null> {
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    let instructions: OpenAI.Chat.Completions.ChatCompletionMessage[] = [];

    if (article) {
        instructions = [
            {
                role: 'system',
                content: '',
            },
            {
                role: 'user',
                content:
                    'GPT summarize the following news article in 3 lines.\n',
            },
            {
                role: 'user',
                content: `Article title: ${article?.title}\n
          Article description: ${article?.description}\n
          Article body: \n
          `,
            },
            ...previousResponses,
        ];
    } else {
        instructions = [...previousResponses];
    }

    if (prompt !== '') {
        instructions.push({
            role: 'user',
            content: prompt,
        });
    }

    if (instructions.length === 0) {
        return null;
    }

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [...instructions],
        max_tokens: 100,
        temperature: 1,
        presence_penalty: 0,
        frequency_penalty: 0,
    });

    const quote = completion.choices[0].message;

    return quote;
}
