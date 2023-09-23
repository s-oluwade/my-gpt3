import { Skeleton } from './ui/skeleton';

const ArticleCardSkeleton = () => {
    return (
        <div className='flex flex-col px-6 md:flex-row justify-between w-[28rem] md:w-full'>
            <div className='mt-8 space-y-3'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-14' />
            </div>
            <div className='mt-8 space-y-3 w-[28rem]'>
                <Skeleton className='h-4' />
                <Skeleton className='h-4' />
                <Skeleton className='h-4' />
                <Skeleton className='h-4' />
                <Skeleton className='h-4' />
                <Skeleton className='h-4' />
                <Skeleton className='h-4' />
            </div>
        </div>
    );
};

export default ArticleCardSkeleton;
