'use client';

import { getOneNews } from '@/app/(main)/(routes)/(root)/actions';
import { Article } from '@/app/api/news/route';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

interface ArticlePageProps {
    params: { id: string };
}

const ArticlePage = ({ params: { id = '0' } }: ArticlePageProps) => {
    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setArticle(await getOneNews(id));
            console.log('loading should now be false')
            setIsLoading(false);
        })();
    }, [id]);
    console.log(isLoading);

    return (
        <div id='article-container' className='mx-auto max-w-4xl'>
            {isLoading && (
                <div className='space-y-2'>
                    <Skeleton className='h-4' />
                    <Skeleton className='h-4' />
                </div>
            )}

            {!isLoading && !article && <div>No article found</div>}
            {!isLoading && article && (
                <div id='article' className='md:mt-4 flex flex-col gap-6 p-4'>
                    <div id='gpt-requestor'>
                        <Link href={`/gpt/?articleId=${article.id}`}>
                        <Button variant={'outline'}>
                            GPT Summarize this News Article
                        </Button>
                        </Link>
                    </div>
                    <div className='text-lg capitalize text-accent-foreground underline'>
                        {article?.category} News
                    </div>
                    <div
                        id='article-title'
                        className='text-3xl font-light text-secondary-foreground'
                    >
                        {article.title}
                    </div>
                    {!!article.description && <div>{article.description}</div>}
                    <div id='article-features' className='flex flex-col gap-2'>
                        <div className='flex'>
                            By &nbsp;{' '}
                            <span className='text-accent-foreground'>{article.author}</span>
                        </div>
                        <div className='flex gap-2'>
                            <Calendar />
                            <span>{new Date(article?.publishedAt).toDateString()}</span>
                            <span className='italic'>{article.source.id}</span>
                        </div>
                    </div>
                    <div
                        id='article-content'
                        className='font-light leading-8 text-secondary-foreground'
                    >
                        {article.content}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArticlePage;
