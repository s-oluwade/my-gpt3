'use server';

import { Article } from '@/app/api/news/route';
import qs from 'query-string';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getAllNews(url: string): Promise<Article[]> {
    let parsedQuery = qs.parseUrl(url);

    const apiUrl = qs.stringifyUrl({
        url: parsedQuery.url + 'api/news',
        query: { ...parsedQuery.query, requestType: 'fetchAll' },
    });

    const res = await fetch(apiUrl, { cache: 'no-store' });
    const news = await res.json();

    return news;
}

export async function getOneNews(domain: string, id: string): Promise<Article | null> {
    const apiUrl = domain + '/api/news/?requestType=fetchOne&id=' + id;
    const res = await fetch(apiUrl, { cache: 'no-store' });
    const news = await res.json();

    return news;
}
