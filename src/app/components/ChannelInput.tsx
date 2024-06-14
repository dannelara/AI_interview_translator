"use client";

import { useChannelStore } from '@/store/useChannelStore';
import React from 'react';

const ChannelInput = () => {
    const { setChannel } = useChannelStore();

    return (
        <div>
            <div className="my-4 flex flex-col">
                <label htmlFor="channel_id" className="mb-2">
                    Enter channel ID
                </label>
                <div className='bg-white p-4 flex w-full items-center rounded-md'>
                    <input
                        id="channel_id"
                        type="text"
                        className='outline-none text-searchbar flex-1'
                        placeholder='Channel ID'
                        onChange={(e) => setChannel({ channelId: e.target.value, userId: null })}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChannelInput;