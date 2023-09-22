import { Article } from '@/app/api/news/route';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ArticleCard from './ArticleCard';

interface BlogCardProps {
    news: Article[];
    categories: {id: string; name: string}[];
    setSelectedCategory: (category: string) => void;
    selectedCategory: string;
}

const BlogSection = ({ news, setSelectedCategory, selectedCategory, categories }: BlogCardProps) => {

    return (
        <section className='body-font mx-auto max-w-3xl text-gray-600 dark:text-gray-400'>
            <div className='max-w-3xl w-full mx-auto px-5 py-10'>
                <div className='flex flex-wrap justify-center'>
                    <Tabs
                        defaultValue={selectedCategory}
                    >
                        <TabsList className='mx-auto hidden w-max md:block'>
                            {categories.map((category, index) => (
                                <TabsTrigger onClick={(e)=> {
                                    if (e.currentTarget.getAttribute('data-state') === 'active') {
                                        setSelectedCategory(category.id);
                                    }
                                    
                                }} key={index} className='capitalize' value={category.id}>
                                    {category.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {categories.map((category) => {
                            if (news.length === 0) {
                                return;
                            }

                            return (
                                <TabsContent className='space-y-4' key={category.id} value={category.id}>
                                    {news
                                        .sort((a, b) =>
                                            a.publishedAt < b.publishedAt
                                                ? 1
                                                : a.publishedAt > b.publishedAt
                                                ? -1
                                                : 0
                                        )
                                        .map((article) => (
                                            <ArticleCard key={article.id} article={article} />
                                        ))}
                                </TabsContent>
                            );
                        })}
                    </Tabs>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
