import React, { ReactElement } from 'react';

interface ContainerProps {
    children: ReactElement | ReactElement[];
}

export const Container = ({ children }: ContainerProps) => {
    return (
        <div className='flex max-w-screen-xl mx-auto mt-10'>
            { children }
        </div>
    );
};
