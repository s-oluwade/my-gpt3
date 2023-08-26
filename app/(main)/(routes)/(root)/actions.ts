'use server';

export async function getNews(url: string) {
    console.log(url);
    
    const res = await fetch(url);
    const news = await res.json();

    return news;
}
