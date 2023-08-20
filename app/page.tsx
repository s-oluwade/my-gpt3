import Head from 'next/head';
import Chat from '@/components/Chat';
import { getGPTResponse } from './actions';

export default function Home() {
  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <h1>ChatGPT in Next.js</h1>
        <Chat getGPTResponse={getGPTResponse} />
      </main>
    </>
  );
}
