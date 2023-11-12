'use client';

import BlogSection from '@/app/(main)/(routes)/(root)/BlogSection';
import SearchInput from '@/app/(main)/(routes)/(root)/SearchInput';
import { Article } from '@/app/api/news/route';
import { Selector } from '@/components/Selector';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAllNews } from './actions';
import { Skeleton } from '@/components/ui/skeleton';
import ArticleCardSkeleton from '@/components/ArticleCardSkeleton';

const categories = [
    {
        id: 'business',
        name: 'Business',
    },
    {
        id: 'entertainment',
        name: 'Entertainment',
    },
    {
        id: 'general',
        name: 'General',
    },
    {
        id: 'health',
        name: 'Health',
    },
    {
        id: 'science',
        name: 'Science',
    },
    {
        id: 'sports',
        name: 'Sports',
    },
    {
        id: 'technology',
        name: 'Technology',
    },
];

const countries = [
    {
        id: 'us',
        name: 'United States',
    },
    {
        id: 'au',
        name: 'Australia',
    },
    {
        id: 'gb',
        name: 'United Kingdom',
    },
    {
        id: 'ca',
        name: 'Canada',
    },
    {
        id: 'it',
        name: 'Italy',
    },
    {
        id: 'in',
        name: 'India',
    },
    {
        id: 'za',
        name: 'South Africa',
    },
    {
        id: 'ie',
        name: 'Ireland',
    },
    {
        id: 'is',
        name: 'Israel',
    },
];

export default function Home() {
    const router = useRouter();
    const params = useSearchParams();
    const [selectedCountry, setSelectedCountry] = useState<string>(params.get('country') ?? '');
    const [selectedCategory, setSelectedCategory] = useState<string>(
        params.get('category') ?? categories[0].id
    );
    const [news, setNews] = useState<Article[]>([]);
    const [newsIsLoading, setNewsIsLoading] = useState<boolean>(true);
    const initialRender = useRef(true);

    // useEffect(() => {
    //     (async () => {
    //         setNews(await getAllNews(window.location.href));
    //         setNewsIsLoading(false);
    //     })();
    // }, [selectedCategory]);

    useEffect(() => {
        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query: { category: selectedCategory },
            },
            {
                skipNull: true,
            }
        );

        router.push(url);
        (async () => {
            setNews(await getAllNews(url));
            setNewsIsLoading(false);
        })();
    }, [router, selectedCategory]);

    const handleChoice = useCallback(
        (type: 'category' | 'country', choice: string = '') => {
            const nullifyEmptyStringChoice = choice === '' ? null : choice;
            let query: {
                [x: string]: string | null;
            } =
                type === 'category'
                    ? { category: nullifyEmptyStringChoice }
                    : { country: nullifyEmptyStringChoice };

            const url = qs.stringifyUrl(
                {
                    url: window.location.href,
                    query,
                },
                {
                    skipNull: true,
                }
            );

            router.push(url);

            (async () => {
                setNews(await getAllNews(url));
            })();
        },
        [router]
    );

    useEffect(() => {
        if (!initialRender.current) {
            handleChoice('country', selectedCountry);
        }

        initialRender.current = false;
    }, [handleChoice, selectedCountry]);

    return (
        <main>
            <div id='filter' className='mx-4 md:mx-auto space-y-2 md:w-4/5'>
                <SearchInput />
                <div className='flex w-full justify-center md:hidden'>
                    <Selector
                        onChange={setSelectedCountry}
                        options={countries}
                        label='Country'
                        value={selectedCountry}
                    />
                    <Selector
                        onChange={setSelectedCategory}
                        options={categories}
                        label='Category'
                        value={selectedCategory}
                    />
                </div>
                <div className=''>
                    <div id='country' className='hidden flex-wrap items-center p-1 md:flex'>
                        <div id='country-options'>
                            <Button
                                className='h-6 text-xs'
                                onClick={() => setSelectedCountry('')}
                                {...(selectedCountry
                                    ? { variant: 'link_off' }
                                    : { variant: 'link' })}
                                size={'sm'}
                                key={'_'}
                            >
                                All
                            </Button>
                            {countries.map((country) => (
                                <Button
                                    className='h-6 whitespace-pre text-xs'
                                    onClick={() => setSelectedCountry(country.id)}
                                    {...(selectedCountry === country.id
                                        ? { variant: 'link' }
                                        : { variant: 'link_off' })}
                                    size={'sm'}
                                    key={country.id}
                                >
                                    {country.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {newsIsLoading ? (
                <div className='mt-12 md:ml-20 lg:ml-32 xl:ml-48 flex-col items-center justify-center space-y-4 flex md:w-[600px] lg:w-[700px]'>
                    <Skeleton className='hidden md:flex h-4 w-4/5' />
                    <ArticleCardSkeleton />
                    <ArticleCardSkeleton />
                    <ArticleCardSkeleton />
                </div>
            ) : (
                news && (
                    <div className='px-6'>
                        <BlogSection
                            news={news}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            categories={categories}
                        />
                    </div>
                )
            )}
        </main>
    );
}
