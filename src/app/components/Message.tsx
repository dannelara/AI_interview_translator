import { MessageRole } from '@/constants/enums';
import { Channel } from '@/store/useChannelStore';
import { Message } from '@/types/types';
import { cn } from '@/utils';
import React from 'react';

type Props = {
    message: Message,
    channel: Channel
};

const Message = ({ message, channel }: Props) => {

    const isMyMessage = message.userId === channel.userId;

    return (
        <div className={cn(
            "px-3 py-4 rounded-xl w-[90%] text-sm md:min-h-44",
            isMyMessage ? "bg-blue_default" : "bg-white",
            isMyMessage ? "rounded-br-none" : "rounded-bl-none",
            isMyMessage ? "self-end" : "self-start",
        )}>
            <p className={cn(
                "px-2 mb-2",
                isMyMessage ? "text-white" : "text-gray-900",
            )}>{message.translated}</p>
            <div className={cn(
                "px-2 py-3 rounded-lg",
                isMyMessage ? "bg-white" : "bg-blue_light",
            )}>
                {message.original}
            </div>
        </div>
    );
};

export default Message;