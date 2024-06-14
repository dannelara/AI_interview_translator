import { useRecordVoice } from '@/hooks/useRecordVoice';
import { blobToBase64, cn } from '@/utils';
import React from 'react';
import Microphone from './icons/Microphone';
import { generateTextFromAudio } from '../actions/generateTranslatedMessage';

type Props = {
    handleInputChange: (text: string) => void;
};

const AudioRecorder = ({ handleInputChange }: Props) => {
    const { startRecording, stopRecording, resetRecording, recording, recordedAudio } = useRecordVoice();

    React.useEffect(() => {
        if (recordedAudio) {
            blobToBase64(recordedAudio, async (base64) => {
                if (!base64) return;

                const res = await generateTextFromAudio(base64);
                if (!res) return;

                handleInputChange(res.text);
            });
        }

    }, [recordedAudio]);

    return (
        <button
            onMouseDown={startRecording}
            onTouchStart={startRecording}
            onMouseUp={stopRecording}
            onTouchEnd={stopRecording}
            className={cn(
                "bg-blue_default size-16 rounded-full flex items-center justify-center",
                recording && "animate-pulse"
            )}
        >
            <Microphone className="" />
        </button>
    );
};

export default AudioRecorder;