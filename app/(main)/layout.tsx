import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'News AI - ChatGPT',
    description: 'News AI - ChatGPT',
};

// Layout for all pages that use the navbar and sidebar (they go together).
const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full dark:bg-muted dark:text-muted-foreground'>
            <Navbar />
            <div className='fixed inset-y-0 mt-16 hidden flex-col md:flex'>
                <Sidebar />
            </div>
            <main className='h-full pt-16 md:pl-28'>{children}</main>
        </div>
    );
};

export default MainLayout;