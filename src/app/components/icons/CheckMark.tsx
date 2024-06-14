import React from 'react';

type Props = {
    className?: string;
};

const CheckMark = ({ className }: Props) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="none"
        >
            <circle cx={8} cy={8} r={8} fill="#F4F8FE" />
            <path
                fill="#324578"
                d="M12.224 5.176a.6.6 0 0 1 0 .849l-4.8 4.8a.6.6 0 0 1-.849 0l-2.4-2.4a.6.6 0 0 1 .85-.85L7.001 9.55l4.375-4.373a.6.6 0 0 1 .85 0h-.002Z"
            />
        </svg>
    );
};

export default CheckMark;