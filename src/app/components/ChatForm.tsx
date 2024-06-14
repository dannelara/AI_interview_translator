"use client";

import { ChatRequestOptions } from 'ai';
import React from 'react';
import SendIcon from './icons/SendIcon';

type Props = {
    input: string;
    handleInputChange: (text: string) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void
};

const ChatForm = ({ handleInputChange, handleSubmit, input }: Props) => {

    return (
        <div className='mt-auto w-full flex gap-4'>
            <form className='bg-white flex w-full rounded-3xl items-center' onSubmit={handleSubmit}>
                <input
                    required
                    value={input}
                    type="text"
                    placeholder='Message'
                    className='outline-none text-searchbar flex-1 w-full mx-2 ml-4'
                    onChange={(e) => {
                        handleInputChange(e.target.value);
                    }}
                />
                <button type='submit' className='bg-blue_default size-16 rounded-full flex items-center justify-center'>
                    <SendIcon className='size-8' />
                </button>
            </form>
        </div>
    );
};

export default ChatForm;