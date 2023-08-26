// components/Chat.js
'use client';

import OpenAI from 'openai';
import {useState} from 'react';
import {Input} from './ui/input';
import {Button} from './ui/button';

interface ChatProps {
  getGPTResponse: (text: string) => Promise<OpenAI.Chat.Completions.ChatCompletionMessage>;
}

function Chat({getGPTResponse}: ChatProps) {
  const [messages, setMessages] = useState<{text: string; type: string}[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const response = await getGPTResponse(input);

    setMessages([...messages, {text: input, type: 'user'}]);
    setInput('');

    if (response.content) {
      setMessages((old) => [...old, {text: response.content!, type: 'ai'}]);
    } else {
      setMessages([...messages, {text: '[no response from GPT]', type: 'ai'}]);
    }
  };

  return (
    <div className='flex flex-col gap-4 w-full md:w-[80%] px-6'>
      <div className='bg-neutral-900 text-secondary-foreground p-4 rounded-md h-96 w-full overflow-auto text-sm'>
        {messages.map((message, index) => (
          <>
            <div key={index} className={message.type}>
              <span className='uppercase'>{message.type}</span>
              :&nbsp;{message.text}
            </div>
            <br />
          </>
        ))}
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}>
          <fieldset className='flex gap-2'>
            <Input
              title='Talk to Chat GPT'
              placeholder='Say something...'
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type='submit'>Send</Button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Chat;
