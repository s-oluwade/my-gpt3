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
    const [selectedCategory, setSelectedCategory] = useState<string>(params.get('category') ?? '');
    const [selectedCountry, setSelectedCountry] = useState<string>(params.get('country') ?? '');
    const [news, setNews] = useState<Article[]>([]);
    const [newsIsLoading, setNewsIsLoading] = useState<boolean>(true);
    const initialRender = useRef(true);

    useEffect(() => {
        (async () => {
            setNews(await getAllNews(window.location.href));
            setNewsIsLoading(false);
        })();
    }, []);

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
            handleChoice('category', selectedCategory);
        }

        initialRender.current = false;
    }, [handleChoice, selectedCategory]);

    useEffect(() => {
        if (!initialRender.current) {
            handleChoice('country', selectedCountry);
        }

        initialRender.current = false;
    }, [handleChoice, selectedCountry]);

    return (
        <main>
            <div id='filter' className='mx-auto space-y-2 md:w-4/5'>
                <SearchInput />
                <div className='flex w-full justify-center md:hidden'>
                    <Selector
                        onChange={setSelectedCategory}
                        options={categories}
                        label='Category'
                        value={selectedCategory}
                    />
                    <Selector
                        onChange={setSelectedCountry}
                        options={countries}
                        label='Country'
                        value={selectedCountry}
                    />
                </div>
                <div className=''>
                    <div id='country' className='hidden flex-wrap items-center p-1 md:flex'>
                        <span className='text-xs text-secondary-foreground'>COUNTRY: &nbsp;</span>
                        <div id='country-options'>
                        <Button
                            className='h-6 text-xs'
                            onClick={() => setSelectedCountry('')}
                            {...(selectedCountry ? { variant: 'link_off' } : { variant: 'link' })}
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
                    <div id='category' className='hidden flex-wrap items-center p-1 md:flex'>
                        <div className='text-xs text-secondary-foreground'>CATEGORY: </div>
                        <div id='category-options'>
                            <Button
                                className='h-6 text-xs'
                                onClick={() => setSelectedCategory('')}
                                {...(selectedCategory
                                    ? { variant: 'link_off' }
                                    : { variant: 'link' })}
                                size={'sm'}
                                key={'_'}
                            >
                                All
                            </Button>
                            {categories.map((category) => (
                                <Button
                                    className='h-6 whitespace-pre text-xs'
                                    onClick={() => setSelectedCategory(category.id)}
                                    {...(selectedCategory === category.id
                                        ? { variant: 'link' }
                                        : { variant: 'link_off' })}
                                    size={'sm'}
                                    key={category.id}
                                >
                                    {category.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {newsIsLoading && (
                <div className='w-full p-20 text-center text-xl uppercase'>News Is Loading...</div>
            )}
            {news && !newsIsLoading && (
                <div className='px-6'>
                    <BlogSection news={news} />
                </div>
            )}
        </main>
    );
}
