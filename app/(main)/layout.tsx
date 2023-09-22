import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
    title: 'News AI - ChatGPT',
    description: 'News AI - ChatGPT',
    viewport: {
        height: 'device-height',
        width: 'device-width',
        initialScale: 1,
        minimumScale: 1,
        maximumScale: 1,
    }
};

// Layout for all pages that use the navbar and sidebar (they go together).
const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='main-page h-full dark:bg-muted dark:text-muted-foreground'>
            <Navbar />
            <div className='fixed inset-y-0 mt-16 hidden flex-col md:flex'>
                <Sidebar />
            </div>
            <main className='h-full pt-16 md:pl-28'>{children}</main>
        </div>
    );
};

export default MainLayout;
