// components/Chat.js
'use client';

import {useState} from 'react';
import {generateResponse} from '../lib/utils/openai';
import {cache} from 'react';

function Chat() {
  const [messages, setMessages] = useState<{text: string; type: string}[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = cache(async () => {
    if (input.trim() === '') return;

    setMessages([...messages, {text: input, type: 'user'}]);
    setInput('');

    const response = cache(await generateResponse(input));
    setMessages([...messages, {text: response, type: 'ai'}]);
  });

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
            title='chat with gpt'
            placeholder='Say something'
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
