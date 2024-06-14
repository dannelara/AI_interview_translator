import React from 'react';

type Props = {
    className?: string;
};

const SendIcon = ({ className }: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className={className}
        >
            <path
                fill="#fff"
                d="M.863 14.23c-1.236.705-1.121 2.587.197 3.133l7.672 3.2v5.649a1.785 1.785 0 0 0 3.161 1.143l3.39-4.064 6.777 2.822c1.033.432 2.23-.246 2.4-1.35l3.5-22.75a1.745 1.745 0 0 0-.738-1.707 1.755 1.755 0 0 0-1.86-.076l-24.5 14Zm2.849 1.394 18.676-10.67-12.01 13.421.066.055-6.732-2.806Zm18.326 7.64-9.111-3.8L24.635 6.376l-2.597 16.887Z"
            />
        </svg>
    );
};

export default SendIcon;