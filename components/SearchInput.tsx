'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from './ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import qs from 'query-string';

const SearchInput = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get('categoryId');
    const searchString = searchParams.get('searchString');

    const [value, setValue] = useState(searchString || '');
    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        const query = {
            searchString: debouncedValue,
            categoryId,
        };

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            { skipEmptyString: true, skipNull: true }
        );

        router.push(url);
    }, [categoryId, debouncedValue, router]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    return (
        <div className='relative'>
            <Search className='absolute left-4 top-3 h-4 w-4 text-muted-foreground' />
            <Input
                placeholder='Search...'
                onChange={(event) => handleChange(event)}
                value={value}
                className='dark:bg-primary/10 pl-10'
            />
        </div>
    );
};

export default SearchInput;
