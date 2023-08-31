import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaFlag } from 'react-icons/fa';
import Article from './Article';

interface BlogCardProps {
    news: Article[];
}

const categories = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
];

const BlogSection = ({ news }: BlogCardProps) => {

    return (
        <section className='body-font mx-auto max-w-3xl text-gray-600 dark:text-gray-400'>
            <div className='container mx-auto px-5 py-10'>
                <div className='mb-6 text-xl'>{news.length} Results</div>
                <div className='-m-4 flex flex-wrap gap-16'>
                    
                    {categories.map((category) => {
                        const heading = category;
                        const body = news.filter((article) => article.category === category);
                        if (body.length === 0) {
                            return
                        }
                        return (
                            <div key={category}>
                                <h1 className='text-center text-3xl font-normal uppercase mb-6'>
                                    {heading}
                                </h1>
                                <div className='space-y-4'>
                                    {body
                                        .sort((a, b) =>
                                            a.publishedAt < b.publishedAt
                                                ? 1
                                                : a.publishedAt > b.publishedAt
                                                ? -1
                                                : 0
                                        )
                                        .map((article) => (
                                            <Article key={article.id} article={article} />
                                        ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
