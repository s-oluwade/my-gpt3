// components/Chat.js
'use client';

import { getOneNews } from '@/app/(main)/(routes)/(root)/actions';
import { getGPTResponse } from '@/app/(main)/(routes)/gpt/actions';
import { Article } from '@/app/api/news/route';
import OpenAI from 'openai';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ChatProps {
    articleId: string | null;
}

function Chat({ articleId = null }: ChatProps) {
    const [messages, setMessages] = useState<OpenAI.Chat.Completions.ChatCompletionMessage[]>([]);
    const [input, setInput] = useState('');
    const [article, setArticle] = useState<Article | null>(null);
    const initialRender = useRef(true);

    useEffect(() => {
        if (articleId) {
            (async () => {
                setArticle(await getOneNews(window.location.protocol+'//'+window.location.host, articleId));
            })();
        }
    }, [articleId]);

    const handleGPTRequest = useCallback(async () => {
        const response = await getGPTResponse(messages, input, article);

        if (!response) {
            return;
        }

        setMessages([...messages, { content: input, role: 'user' }]);
        setInput('');

        if (response.content) {
            setMessages((old) => [...old, { content: response.content!, role: 'assistant' }]);
        } else {
            console.log('no response from GPT');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [article]);

    useEffect(() => {
        if (!initialRender.current) {
            if (article) {
                handleGPTRequest();
            }
        }
        initialRender.current = false;
    }, [article, handleGPTRequest]);

    return (
        <div className='flex w-full flex-col gap-4 px-6 md:w-[80%]'>
            <div className='h-96 w-full overflow-auto rounded-md p-4 text-sm text-secondary-foreground'>
                {messages.map((message, index) => {
                    if (!message.content) {
                        return
                    }
                    else {
                        return (<>
                            <div key={index}>
                                {/* <span className='uppercase'>{message.role}</span> */}
                                {message.content}
                            </div>
                            <br />
                        </>)
                    }
                })}
            </div>
            {/* <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleGPTRequest();
                    }}
                >
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
            </div> */}
        </div>
    );
}

export default Chat;
