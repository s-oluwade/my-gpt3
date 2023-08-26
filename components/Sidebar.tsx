'use client';

import { Home, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const routes = [
        {
            title: 'Home',
            path: '/',
            icon: <Home className='h-5 w-5' />,
        },
        {
            title: 'Chat GPT',
            path: '/gpt',
            icon: <Bot className='h-5 w-5' />,
        },
    ];

    return (
        <div className='flex h-full flex-col space-y-4 bg-secondary text-primary'>
            <div className='flex-1 justify-center p-3'>
                <div className='space-y-2'>
                    {routes.map((route) => (
                        <div
                            key={route.path}
                            onClick={() => {
                                router.push(route.path);
                            }}
                            className={cn(
                                'group flex w-full cursor-pointer justify-start rounded-lg p-3 text-xs font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary',
                                pathname === route.path &&
                                    'bg-primary/10 text-primary hover:bg-primary/20'
                            )}
                        >
                            <div className='flex flex-col gap-y-2 items-center flex-1'>
                                {route.icon}
                                {route.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
