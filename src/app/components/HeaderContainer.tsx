import React from 'react';

type Props = {
    children: React.ReactNode | React.ReactNode[];
};

const HeaderContainer = ({ children }: Props) => {
    return (
        <div className='h-[7.938rem] flex items-center justify-center'>
            {children}
        </div>
    );
};

export default HeaderContainer;