// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({error: 'Prompt missing'});
  }

  if (prompt.length > 100) {
    return res.status(400).json({error: 'Prompt too long'});
  }

  const completion = await openai.chat.completions.create({
    model: 'text-davinci-003',
    messages: [
      {
        role: 'user',
        content: `Create a cringy motivational quote based on the following topic.\n
    Topic: ${prompt}\n
    Cringy motivational quote:`,
      },
    ],
    max_tokens: 500,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  const quote = completion.choices[0].message;

  res.status(200).json({quote});
}
