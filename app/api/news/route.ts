import { NextResponse } from 'next/server';

const countryIdentifier = {
    us: 'United States',
    au: 'Australia',
    gb: 'United Kingdom',
    ca: 'Canada',
    it: 'Italy',
    in: 'India',
    za: 'South Africa',
    ie: 'Ireland',
    is: 'Israel',
};

export interface Article {
    id: number;
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    category: string;
    country: string;
}

export interface FilteredArticles {
    [filterKey: string]: Article[];
}

export interface NewsResponse {
    [date: string]: FilteredArticles;
}

export async function GET(request: Request) {
    // queries: country, source, category
    const { searchParams } = new URL(request.url);
    const requestType = searchParams.get('requestType');
    const weekend = searchParams.get('weekend');
    const category = searchParams.get('category');
    const country = searchParams.get('country');
    const source = searchParams.get('source');
    const id = searchParams.get('id');
    
    let filteredArticles: Article[] = require('./news.json');
    if (requestType === 'fetchAll') {

        if (category) {
            filteredArticles = filteredArticles.filter(article => article.category === category);
        }
        if (source) {
            filteredArticles = filteredArticles.filter(article => article.source.id === source);
        }
        if (country) {
            filteredArticles = filteredArticles.filter(article => article.country === country);
        }
        return NextResponse.json(filteredArticles);
    }
    else if (requestType === 'fetchOne') {
        if (id) {
            return NextResponse.json(filteredArticles[parseInt(id)])
        }
    }

    return NextResponse.json(null);
}
