import React from 'react';
import Message from './Message';
import { Message as MessageT } from '@/types/types';
import { useChannelStore } from '@/store/useChannelStore';

type Props = {
    messages: MessageT[];
};

const Messages = ({ messages }: Props) => {
    const { channel } = useChannelStore();
    return (
        <div className='flex flex-col gap-y-[1.875rem]'>
            {messages.map((message) => (
                <Message key={message.id} message={message} channel={channel} />
            ))}
        </div>
    );
};

export default Messages;