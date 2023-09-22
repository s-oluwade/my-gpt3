import { Article } from '@/app/api/news/route';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    article: Article;
}

const ArticleCard = ({ article }: Props) => {
    return (
        <div key={article.url} className='flex flex-wrap p-8 md:flex-nowrap bg-slate-900'>
            <div className='mb-6 flex flex-shrink-0 flex-col md:mb-0 md:w-64'>
                <span className='font-semibold uppercase text-gray-700 dark:text-gray-500 whitespace-pre'>
                    {article.source.name}
                </span>
                <span className='mt-1 text-sm text-gray-500'>
                    {article.publishedAt?.slice(0, 10)}
                </span>
                <span className='mt-1'>
                    <Image
                        src={`/img/64/${article.country}_64.png`}
                        alt='flag'
                        width='50'
                        height='50'
                    />
                </span>
            </div>
            <div className='md:flex-grow'>
                <h2 className='mb-2 text-xl font-medium text-gray-900 dark:text-gray-300'>
                    <Link href={`/article/${article.id}`}>{article.title}</Link>
                </h2>
                <p className='leading-relaxed'>{article.description}</p>
                <Link
                    href={`/article/${article.id}`}
                    className='mt-4 inline-flex cursor-pointer items-center text-indigo-500'
                >
                    Learn More
                    <svg
                        className='ml-2 h-4 w-4'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    >
                        <path d='M5 12h14'></path>
                        <path d='M12 5l7 7-7 7'></path>
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default ArticleCard;
