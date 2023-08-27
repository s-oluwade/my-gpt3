'use server';

export async function getNews(url: string) {
    
    const res = await fetch(url, {cache: 'no-store'});
    const news = await res.json();

    return news;
}
