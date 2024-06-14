import { Conversation, Message } from '@/types/types';
import React from 'react';
import PdfIcon from './icons/PdfIcon';
import DownloadTranscriptIcon from './icons/DownloadTranscriptIcon';
import jsPDF from 'jspdf';
import { MessageRole } from '@/constants/enums';

type Props = {
    conversation: Conversation
};

const Transcript = ({ conversation }: Props) => {
    const { messages } = conversation;
    
    const groupedByLanguage = React.useMemo(() => {
        if (messages) {
            return messages.reduce((acc, message) => {
                if (!acc[message.language]) {
                    acc[message.language] = [];
                }

                acc[message.language].push(message);

                return acc;
            }, {} as Record<string, Message[]>);
        };

        return []
    }, [messages]);

    const languages = Object.keys(groupedByLanguage);

    const handleDownloadPdf = (language: string) => {
        const doc = new jsPDF();

        const initialY = 10;
        const sidesMargins = 18;

        let currentPage = 1;
        const dateHeight = 15;
        const nextY = initialY + dateHeight + 2;
        doc.setFont("Avenir");

        doc.setFontSize(10);
        doc.text(new Date().toISOString(), sidesMargins, nextY);

        doc.setFontSize(16);

        let currentY = nextY + 35;

        doc.setFontSize(10);
        const footerHeight = 20;

        messages.forEach((message) => {
            const rolePrefix = message.role === MessageRole.USER ? 'You: ' : 'AI: ';
            const textToUse = language === message.language ? message.original : message.translated;

            const wrappedRole = doc.splitTextToSize(rolePrefix, 10);
            const wrappedText = doc.splitTextToSize(textToUse.trim(), 190 - sidesMargins);
            const roleHeight = wrappedRole.length * 5;
            const textHeight = wrappedText.length * 5;
            const messageHeight = roleHeight + textHeight;

            if (currentY + messageHeight > doc.internal.pageSize.height - footerHeight) {
                doc.addPage();
                currentY = 10;
                currentPage++;
            }

            doc.text(rolePrefix, sidesMargins, currentY);
            doc.text(wrappedText, sidesMargins, currentY + 5, {
                maxWidth: doc.internal.pageSize.width - sidesMargins,
            });

            currentY += messageHeight + 2;
        });

        doc.save(`Conversation - ${new Date().toISOString()}.pdf`);

    };

    return (
        <div className='flex flex-col gap-2'>
            {languages && languages.map((l) => (
                <button
                    key={l}
                    onClick={() => handleDownloadPdf(l)}
                    className='bg-white flex items-center justify-between px-2 py-4 rounded-lg'
                >
                    <div className='flex gap-2'>
                        <PdfIcon className='h-6 w-6' />
                        <p>Transcript - {l}</p>
                    </div>
                    <DownloadTranscriptIcon className='h-6 w-6' />
                </button>
            ))}
        </div>
    );
};

export default Transcript;