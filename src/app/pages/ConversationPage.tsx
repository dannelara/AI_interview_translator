"use client";

import { useSelectedLanguageStore } from '@/store/useSelectedLanguageStore';
import React from 'react';
import ChatForm from '../components/ChatForm';
import Messages from '../components/Messages';
import { generateTranslatedMessage } from '../actions/generateTranslatedMessage';
import { Conversation, Message } from '@/types/types';
import Loader from '../components/Loader';
import { useDataStore } from '@/store/useDataStore';
import { v4 as uuidv4 } from "uuid";
import { useRouter, useSearchParams } from 'next/navigation';
import { generateUrl } from '../components/Searchbar';
import Link from 'next/link';
import AudioRecorder from '../components/AudioRecorder';
import { io } from 'socket.io-client';
import { useChannelStore } from '@/store/useChannelStore';

const ConversationPage = () => {
    const { channel, setChannel } = useChannelStore();

    const currentConversationId = useSearchParams().get('current_conversation_id');
    const { selectedLanguage } = useSelectedLanguageStore();
    const { addConversation, addMessage, getConversation } = useDataStore();
    const conversation = getConversation(currentConversationId!);
    const [ready, setReady] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [messages, setMessages] = React.useState<Message[]>(conversation ? conversation.messages : []);
    const [error, setError] = React.useState('');
    const socket = React.useRef(
        io('http://localhost:8080')
    );

    const handleInputChange = (text: string) => {
        setInput(text);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!input || !selectedLanguage || !channel || !channel.userId) return;
        setLoading(true);

        try {

            const translatedResponse = await generateTranslatedMessage({
                language: selectedLanguage.language,
                latestMessage: input,
                messages,
                channelId: channel.channelId,
                userId: channel.userId
            });

            setMessages((prev) => [...prev, translatedResponse]);

            addMessage(channel.channelId, translatedResponse);

            socket.current.emit('sendMessage', channel.channelId, translatedResponse);

        } catch (error) {
            console.log(error);
        }

        setInput('');
        setLoading(false);
    }

    React.useEffect(() => {
        if (selectedLanguage) {
            setReady(true);
        }

        if (!channel.userId) {
            const userId = uuidv4();
            setChannel({ ...channel, userId });
        }
    }, [selectedLanguage, channel]);

    React.useEffect(() => {
        socket.current = io('http://localhost:8080');
        socket.current.emit("joinRoom", channel.channelId);

        socket.current.on('connect', () => {
            console.log('Connected to server');
        });

        socket.current.on('receiveMessage', (message) => {
            console.log('Received message', message);
            setMessages((prev) => {
                if (!prev.find(msg => msg.id === message.id)) {
                    return [...prev, message];
                }
                return prev;
            });
        });

        return () => {
            socket.current.off('receiveMessage');
            socket.current.disconnect();
        };
    }, [channel.channelId]);


    return (
        <main className='h-screen flex flex-col pb-8'>
            {ready && selectedLanguage && (
                <div className='py-[1rem] border-b-2 border-white flex justify-between items-center'>
                    <div className=' rounded-full overflow-hidden bg-blue-200 px-2 py-2 text-sm'>
                        <p>{selectedLanguage.language} - {selectedLanguage.country}</p>
                    </div>
                    <Link href="/transcript" className='bg-blue_default py-3 px-8 rounded-full text-xs text-white font-medium'>
                        Done
                    </Link>
                </div>
            )}

            {ready && (
                <div className='h-[40rem] overflow-y-auto mt-6 relative'>
                    <Messages messages={messages} />
                    {loading && (
                        <div className='absolute bottom-5 right-5'>
                            <Loader />
                        </div>
                    )}
                </div>
            )}
            <div className='flex gap-2 mt-auto'>
                <ChatForm
                    input={input}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
                <AudioRecorder handleInputChange={handleInputChange} />
            </div>
        </main>
    );
};

export default ConversationPage;

