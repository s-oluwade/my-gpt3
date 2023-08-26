import Chat from '@/components/Chat';
import { getGPTResponse } from './actions';

export default function ChatGPT() {
    return (
        <main className='flex h-full flex-col items-center'>
            <div className='py-8 w-full text-center'>
                <h1 className='py-2 text-2xl'>Get news info using Chat GPT</h1>
            </div>
            <Chat getGPTResponse={getGPTResponse} />
        </main>
    );
}
