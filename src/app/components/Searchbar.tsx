"use client";

import React from 'react';
import HeaderContainer from './HeaderContainer';
import SearchIcon from './icons/SearchIcon';
import { useRouter, useSearchParams } from 'next/navigation';

export const generateUrl = (key: string, value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    return url.toString();
}

const Searchbar = () => {
    const router = useRouter();
    const languageSearch = useSearchParams().get('language_search') || '';
    const [input, setInput] = React.useState(languageSearch);

    const onInput = (input: string) => {
        setInput(input);
        const url = generateUrl('language_search', input);
        router.push(url);
    }

    return (
        <HeaderContainer>
            <div className="w-full">
                <div className='bg-white p-4 flex w-full rounded-3xl items-center'>
                    <SearchIcon className='inline-block mr-2 size-5' />
                    <input
                        value={input}
                        type="text"
                        className='outline-none text-searchbar flex-1'
                        placeholder='Search language'
                        onChange={(e) => onInput(e.target.value)}
                    />
                </div>
            </div>
        </HeaderContainer>
    );
};

export default Searchbar;