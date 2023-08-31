import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import MobileSidebar from './MobileSidebar';

const font = Poppins({
    weight: '100',
    subsets: ['latin'],
});

const Navbar = () => {
    return (
        <div className='fixed z-50 flex w-full items-center justify-between border-b border-primary/10 bg-secondary px-4 py-2'>
            <div className='flex items-center'>
                <MobileSidebar />
                <Link href='/'>
                    <h1
                        className={cn(
                            'hidden text-xl font-bold text-primary md:block md:text-3xl',
                            font.className
                        )}
                    >
                        News AI
                    </h1>
                </Link>
            </div>
            {/* <div className='flex items-center gap-x-3'>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href='/' legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href='/gpt' legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Chat GPT
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div> */}
        </div>
    );
};

export default Navbar;
