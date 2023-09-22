import Chat from '@/components/Chat';
import { Bot } from 'lucide-react';

interface ChatGPTProps {
    searchParams: { articleId: string };
}

export default function ChatGPT({ searchParams: { articleId } }: ChatGPTProps) {
    return (
        <main className='flex h-full flex-col items-center'>
            <div className='w-full py-8 text-center'>
                <h1 className='flex items-center justify-center gap-4 py-2 text-center text-2xl underline'>
                    <Bot className='h-6 w-6' />
                    AI 2-Line Summary
                </h1>
            </div>
            <Chat articleId={articleId} />
        </main>
    );
}
