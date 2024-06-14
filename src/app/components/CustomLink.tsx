"use client";

import { cn } from '@/utils';
import Link from 'next/link';
import React from 'react';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    className?: string;
}

const CustomLink = ({ className, href, ...props }: Props) => {
    return (
        <Link
            {...props}
            href={href}
            className={cn(
                'text-blue-600',
                className
            )}
        >
        </Link>
    );
};

export default CustomLink;