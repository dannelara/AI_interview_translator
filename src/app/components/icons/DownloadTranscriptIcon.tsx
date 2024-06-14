import React from 'react';

type Props = {
    className?: string;
};

const DownloadTranscriptIcon = ({ className }: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            fill="none"
            className={className}
        >
            <path
                fill="#A6B0C7"
                d="M15.125 0a1.38 1.38 0 0 0-.975 2.35l1.778 1.775-7.274 7.279A1.377 1.377 0 0 0 10.6 13.35l7.275-7.279 1.779 1.78a1.37 1.37 0 0 0 1.5.296c.515-.215.85-.713.85-1.272v-5.5C22.004.615 21.39 0 20.63 0h-5.504ZM3.437 1.375A3.437 3.437 0 0 0 0 4.813v13.75C0 20.462 1.538 22 3.438 22h13.75c1.899 0 3.437-1.538 3.437-3.438V13.75c0-.76-.614-1.375-1.375-1.375-.76 0-1.375.614-1.375 1.375v4.813a.69.69 0 0 1-.688.687H3.438a.69.69 0 0 1-.687-.688V4.813a.69.69 0 0 1 .688-.687H8.25c.76 0 1.375-.614 1.375-1.375 0-.76-.614-1.375-1.375-1.375H3.437Z"
            />
        </svg>
    );
};

export default DownloadTranscriptIcon;