'use client';
import { NewsResponse } from '@/app/api/news/route';
import SearchInput from '@/components/SearchInput';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useState } from 'react';
import { getNews } from './actions';
import BlogCard1 from '@/components/BlogCard1';
import BlogCard2 from '@/components/BlogCard2';
import BlogCard3 from '@/components/BlogCard3';
import BlogCard4 from '@/components/BlogCard4';

const categories = [
    {
        name: 'business',
    },
    {
        name: 'entertainment',
    },
    {
        name: 'general',
    },
    {
        name: 'health',
    },
    {
        name: 'science',
    },
    {
        name: 'sports',
    },
    {
        name: 'technology',
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
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [news, setNews] = useState<NewsResponse | null>(null);

    const router = useRouter();

    function handleCategories(category: string | undefined = undefined) {
        const query = { category };

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            {
                skipNull: true,
            }
        );

        let parsedQuery = qs.parseUrl(url);

        const apiUrl = qs.stringifyUrl({
            url: parsedQuery.url + 'api/news',
            query: { ...parsedQuery.query, requestType: 'fetch' },
        });

        (async () => {
            const news = await getNews(apiUrl);
            setNews(news);
        })();

        router.push(url);

        const mySearch = new URLSearchParams(qs.extract(url));
        setSelectedCategory(mySearch.get('category'));
    }

    function handleCountries(country: string | undefined = undefined) {
        const query = { country };

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            {
                skipNull: true,
            }
        );

        let parsedQuery = qs.parseUrl(url);

        const apiUrl = qs.stringifyUrl({
            url: parsedQuery.url + 'api/news',
            query: { ...parsedQuery.query, requestType: 'fetch' },
        });

        (async () => {
            const news = await getNews(apiUrl);
            setNews(news);
        })();

        router.push(url);
        const mySearch = new URLSearchParams(qs.extract(url));
        setSelectedCountry(mySearch.get('country'));
    }

    return (
        <main>
            <div id='filter' className='mx-16'>
                <SearchInput />
                <div
                    id='categories'
                    className='flex w-full items-center space-x-2 overflow-x-auto p-1'
                >
                    <div className='text-xs text-secondary-foreground'>Category: </div>
                    <Button
                        className='text-xs'
                        onClick={() => handleCategories()}
                        {...(selectedCategory ? { variant: 'ghost' } : { variant: 'outline' })}
                        size={'sm'}
                        key={'_'}
                    >
                        None
                    </Button>
                    {categories.map((category) => (
                        <Button
                            className='whitespace-pre text-xs'
                            onClick={() => handleCategories(category.name)}
                            {...(selectedCategory === category.name
                                ? { variant: 'outline' }
                                : { variant: 'ghost' })}
                            size={'sm'}
                            key={category.name}
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>
                <div
                    id='countries'
                    className='flex w-full items-center space-x-2 overflow-x-auto p-1'
                >
                    <div className='text-xs text-secondary-foreground'>Country: </div>
                    <Button
                        className='text-xs'
                        onClick={() => handleCountries()}
                        {...(selectedCountry ? { variant: 'ghost' } : { variant: 'outline' })}
                        size={'sm'}
                        key={'_'}
                    >
                        None
                    </Button>
                    {countries.map((country) => (
                        <Button
                            className='whitespace-pre text-xs'
                            onClick={() => handleCountries(country.id)}
                            {...(selectedCountry === country.id
                                ? { variant: 'outline' }
                                : { variant: 'ghost' })}
                            size={'sm'}
                            key={country.id}
                        >
                            {country.name}
                        </Button>
                    ))}
                </div>
            </div>
            <div>
                {news && (
                    <>
                    <BlogCard1/>
                    <BlogCard4/>
                    </>
                )}
            </div>
        </main>
    );
}