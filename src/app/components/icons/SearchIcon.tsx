import React from 'react';

type Props = {
    className?: string;
};

const SearchIcon = ({ className }: Props) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="none"
        >
            <path
                fill="#A6B0C7"
                d="M16.248 8.124a8.104 8.104 0 0 1-1.563 4.792l4.945 4.949a1.252 1.252 0 0 1-1.77 1.769l-4.944-4.949a8.077 8.077 0 0 1-4.792 1.563A8.123 8.123 0 0 1 0 8.124 8.123 8.123 0 0 1 8.124 0a8.123 8.123 0 0 1 8.124 8.124Zm-8.124 5.624a5.625 5.625 0 1 0 0-11.25 5.625 5.625 0 0 0 0 11.25Z"
            />
        </svg>
    );
};

export default SearchIcon;