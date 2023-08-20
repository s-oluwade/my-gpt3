// components/Chat.js
'use client';

import OpenAI from 'openai';
import { useState } from 'react';
// import {generateResponse} from '../lib/utils/openai';

interface ChatProps {
  getGPTResponse: (text: string) => Promise<OpenAI.Chat.Completions.ChatCompletionMessage>;
}

function Chat({getGPTResponse}: ChatProps) {
  const [messages, setMessages] = useState<{text: string; type: string}[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    setMessages([...messages, {text: input, type: 'user'}]);
    setInput('');

    const response = await getGPTResponse(input);

    if (response.content) {
      setMessages([...messages, {text: response.content, type: 'ai'}]);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={message.type}>
            {message.text}
          </div>
        ))}
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}>
          <input
            title='Talk to Chat GPT'
            placeholder='Say something...'
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
