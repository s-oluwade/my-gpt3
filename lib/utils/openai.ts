// utils/openai.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  },
});

async function generateResponse(prompt: string) {
  const response = await instance.post('/engines/text-davinci-003/completions', {
    prompt,
    max_tokens: 50, // Adjust the response length as needed
  });

  return response.data.choices[0].text;
}

export { generateResponse };
