interface CountInfoProps {
    title: string;
    count?: number;
}

export const CountInfo = ({ title, count = 0 }: CountInfoProps) => {

    return (
        <div className='flex flex-col items-center space-x-2 p-4'>
            <span className='text-4xl font-semibold'>{ count }</span>
            <span>{ title }</span>
        </div>
    );
};
