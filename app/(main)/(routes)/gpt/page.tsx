import Chat from '@/components/Chat';


interface ChatGPTProps {
    searchParams: {articleId: string}
}

export default function ChatGPT({searchParams: {articleId}}: ChatGPTProps) {
    
    return (
        <main className='flex h-full flex-col items-center'>
            <div className='py-8 w-full text-center'>
                <h1 className='py-2 text-2xl'>Get news info using Chat GPT</h1>
            </div>
            <Chat articleId={articleId} />
        </main>
    );
}
