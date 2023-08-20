import {NextResponse} from 'next/server';
import OpenAI from 'openai';

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const prompt = searchParams.get('prompt');

  if (!prompt) {
    return NextResponse.json({error: 'Prompt missing'}, {status: 400});
  }

  if (prompt.length > 100) {
    return NextResponse.json({error: 'Prompt too long'}, {status: 400});
  }

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

  return NextResponse.json(quote);
}
