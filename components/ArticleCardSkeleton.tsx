import { Skeleton } from './ui/skeleton';

const ArticleCardSkeleton = () => {
    return (
        <div className='flex w-[700px] justify-between'>
            <div className='mt-8 space-y-4'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-14' />
            </div>
            <div className='mt-8 space-y-2'>
                <Skeleton className='mb-8 h-8 w-[28rem]' />
                <Skeleton className='h-4 w-[28rem]' />
                <Skeleton className='h-4 w-[28rem]' />
                <Skeleton className='h-4 w-[28rem]' />
                <Skeleton className='h-4 w-[28rem]' />
                <Skeleton className='h-4 w-[28rem]' />
                <div>
                    <Skeleton className='mt-8 h-4 w-28' />
                </div>
            </div>
        </div>
    );
};

export default ArticleCardSkeleton;
