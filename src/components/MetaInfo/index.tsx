import { ReactNode } from 'react';

interface MetaInfoProps {
    count: number,
    icon: ReactNode,
}

export const MetaInfo = ({ count, icon }: MetaInfoProps) => {
    return (
        <div className='flex items-center cursor-pointer gap-2'>
            {
                count > 0 && (
                    <p className='text-l font-semibold text-default-400'>{ count }</p>
                )
            }
            <p className='text-default-400 text-xl hover:text-2xl ease-in duration-100'>
                { icon }
            </p>
        </div>
    );
};
