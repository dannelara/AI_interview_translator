
import { useSelectedLanguageStore } from '@/store/useSelectedLanguageStore';
import { Language } from '@/types/types';
import React from 'react';
import CheckMark from './icons/CheckMark';

type Props = {
    language: Language;
};

const Language = ({ language }: Props) => {
    const { selectedLanguage, setSelectedLanguage } = useSelectedLanguageStore();

    return (
        <div className='bg-white first:rounded-t-md last:rounded-b-md'>
            <button
                onClick={() => setSelectedLanguage(language)}
                className='px-[1.25rem] py-4 w-full flex items-center justify-between'
            >
                <p className='font-medium px-2'> {language.language} - {language.country} </p>
                {selectedLanguage && selectedLanguage.country === language.country && (
                    <CheckMark className='' />
                )}
            </button>
        </div>
    );
};

export default Language;