interface EverythingNewsProps {
    articles: any[];
}

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
    gb: ['mtv-news-uk', 'independent', 'business-insider-uk', 'talksport'],
    ca: ['cbc-news'],
    it: ['football-italia'],
    in: ['the-times-of-india'],
    za: ['news24'],
    ie: ['the-irish-times'],
    is: ['the-jerusalem-post'],
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

export async function loadNews(weekend: string | null) {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('02d21b3fddea4e8f9abb3b09f67f60f3');

    if (weekend) {
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
            require('../(newsarticles)/' + endDate + '.json');
            console.log('file already exists');
        } catch (error) {
            // file does not exist, proceed with creation
            const result: { [x: string]: any } = {};
            const size = 1;

            for (const [key, value] of Object.entries(sources)) {
                const articles: any[] = await Promise.all(
                    value.map(async (source) => {
                        const res: EverythingNewsProps = await newsapi.v2.everything({
                            sources: source,
                            from: startDate,
                            to: endDate,
                            language: 'en',
                            sortBy: 'relevancy',
                            pageSize: size,
                        });

                        if (res.articles.length > 0) {
                            for (let i = 0; i < res.articles.length; i++) {
                                res.articles[i]['category'] = sourcesCategories[source];
                                return res.articles[i];
                            }
                        }
                    })
                );

                result[key] = articles;
            }
            // console.log(result);
            if (Object.keys(result).length > 0) {
                var fs = require('fs');
                fs.writeFile(`${endDate}.json`, JSON.stringify(result), function (err: any) {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        }
    } else {
        // Use this endpoint for single loading or latest/top news
        const startDate = '2023-08-12';
        const endDate = '2023-08-19';
        const res: EverythingNewsProps = await newsapi.v2.everything({
            sources: 'talksport',
            from: startDate,
            to: endDate,
            language: 'en',
            sortBy: 'relevancy',
            pageSize: 1,
        });

        var fs = require('fs');
        fs.writeFile(`gb_talksport.json`, JSON.stringify(res.articles[0]), function (err: any) {
            if (err) {
                console.error(err);
            }
        });
    }
}
