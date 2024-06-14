"use client";

import { useDataStore } from '@/store/useDataStore';
import Link from 'next/link';
import React from 'react';
import ChevronLeft from '../components/icons/ChevronLeft';
import { useRouter } from 'next/navigation';
import Transcript from '../components/Transcript';
import CustomLink from '../components/CustomLink';


const TranscriptPage = () => {
    const router = useRouter();
    const { conversations } = useDataStore();
    const [ready, setReady] = React.useState(false);

    const handleBack = () => {
        router.back();
    }

    React.useEffect(() => {
        setReady(true);
    }, []);

    return (
        <main className='h-screen flex flex-col pb-8'>
            <div className='py-[1.5rem] border-b-2 border-white flex justify-between items-center'>
                <button onClick={handleBack} className='text-gray text-sm flex gap-2'>
                    <ChevronLeft className='' />
                    <p>Back</p>
                </button>
            </div>

            <div className='mt-4 flex flex-col gap-4'>
                {ready && conversations.map((conversation) => (<Transcript key={conversation.id} conversation={conversation} />))}
            </div>
            <CustomLink href="/" className="flex mt-auto">
                <div className="text-white bg-blue_default py-[1rem] flex-1 px-2 rounded-3xl text-center">
                    <span className="">Start new interview</span>
                </div>
            </CustomLink>
        </main>
    );
};

export default TranscriptPage;