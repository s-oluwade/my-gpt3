import { NextResponse } from 'next/server';

interface EverythingNewsProps {
    articles: any[];
}

interface ArticleProps {
    [key: string]: {
        source: { id: string; name: string };
        author: string;
        description: string;
        url: string;
        urlToImage: string;
        publishedAt: string;
        content: string;
        category: string;
    }[];
}

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

type categories =
    | 'business'
    | 'entertainment'
    | 'general'
    | 'health'
    | 'science'
    | 'sports'
    | 'technology';

const sourcesCategories: { [key: string]: categories } = {
    'australian-financial-review': 'business',
    'bbc-sport': 'sports',
    'bleacher-report': 'sports',
    bloomberg: 'business',
    'business-insider-uk': 'business',
    'cbc-news': 'general',
    'football-italia': 'sports',
    'google-news-in': 'general',
    independent: 'general',
    'medical-news-today': 'health',
    'mtv-news-uk': 'entertainment',
    news24: 'general',
    'new-scientist': 'science',
    'news-com-au': 'general',
    polygon: 'entertainment',
    techradar: 'technology',
    'the-irish-times': 'general',
    'the-jerusalem-post': 'general',
    'the-times-of-india': 'general',
    'the-washington-times': 'general',
};

const sources = {
    us: [
        'bleacher-report',
        'bloomberg',
        'medical-news-today',
        'new-scientist',
        'polygon',
        'techradar',
        'the-washington-times',
    ],
    au: ['news-com-au', 'australian-financial-review'],
    gb: ['mtv-news-uk', 'independent', 'business-insider-uk', 'bbc-sport'],
    ca: ['cbc-news'],
    it: ['football-italia'],
    in: ['the-times-of-india'],
    za: ['news24'],
    ie: ['the-irish-times'],
    is: ['the-jerusalem-post'],
};

export async function GET(request: Request) {
    // queries: country, source, category
    const { searchParams } = new URL(request.url);
    const requestType = searchParams.get('requestType');
    const weekend = searchParams.get('weekend');
    const category = searchParams.get('category');
    const country = searchParams.get('country');
    const source = searchParams.get('source');

    console.log('printing params: ');
    console.log(country);

    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('02d21b3fddea4e8f9abb3b09f67f60f3');

    if (requestType === 'load' && weekend) {
        const weekendTokens = weekend.split('-');
        const year = parseInt(weekendTokens[0]);
        const month = parseInt(weekendTokens[1]);
        const day = parseInt(weekendTokens[2]);
        const date = new Date(year, month - 1, day);
        if (date.toString() === 'Invalid Date') {
            console.log('Invalid Date');
            return null;
        }

        const endDate = date.toISOString().substring(0, 10);
        date.setDate(date.getDate() - 6);
        const startDate = date.toISOString().substring(0, 10);

        try {
            require('./newsarticles/' + endDate + '.json');
            console.log('file already exists');
        } catch (error) {
            // file does not exist, proceed with creation
            const result: { [x: string]: any } = {};

            for (const [key, value] of Object.entries(sources)) {
                const articles: any[] = await Promise.all(
                    value.map(async (source) => {
                        const res: EverythingNewsProps = await newsapi.v2.everything({
                            sources: source,
                            from: startDate,
                            to: endDate,
                            language: 'en',
                            sortBy: 'relevancy',
                            pageSize: 1,
                        });

                        if (res.articles.length > 0) {
                            res.articles[0]['category'] = sourcesCategories[source];
                        }

                        return res.articles[0];
                    })
                );

                result[key] = articles;
            }
            // console.log(result);
            if (Object.keys(result).length > 0) {
                var fs = require('fs');
                fs.writeFile(
                    `${endDate}.json`,
                    JSON.stringify(result),
                    function (err: any) {
                        if (err) {
                            console.error(err);
                        }
                    }
                );
            }
        }
    } else if (requestType === 'fetch') {
        const news: ArticleProps[] = [];

        const fs = require('fs');
        const availableFiles: string[] = fs.readdirSync('./app/api/news/newsarticles');

        if (weekend) {
            news.push(require('./newsarticles/' + weekend + '.json'));
        } else {
            availableFiles.forEach((each) => {
                news.push(require('./newsarticles/' + each));
            });
        }

        if (category) {
            const response = [];
            for (const resource of news) {
                for (const [key, articles] of Object.entries(resource)) {
                    response.push({
                        [key]: articles.filter((item: any) => item && item.category === category),
                    });
                }
            }
            return NextResponse.json(response);
        } else if (country) {
            print('hit');
            print(news);
            const response = [];
            for (const r of news) {
                response.push(r[country]);
            }
            print('response:');
            print(response);
            return NextResponse.json(response);
        } else if (source) {
            const response = [];
            for (const resource of news) {
                for (const [key, value] of Object.entries(resource)) {
                    response.push({
                        [key]: value.filter((item: any) => item.source.id === source),
                    });
                }
            }
            return NextResponse.json(response);
        }
        return NextResponse.json(news);
    }

    return NextResponse.json(null);
}

function print(str: any) {
    return console.log(str);
}