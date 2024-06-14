import React from 'react';

type Props = {
    className?: string;
};

const ChevronLeft = ({ className }: Props) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={20}
            fill="none"
        >
            <path
                fill="#A6B0C7"
                d="M.418 8.991a1.43 1.43 0 0 0 0 2.022l8.569 8.569a1.43 1.43 0 0 0 2.022-2.022L3.449 10l7.555-7.56A1.43 1.43 0 0 0 8.982.418L.414 8.987l.004.004Z"
            />
        </svg>
    );
};

export default ChevronLeft;