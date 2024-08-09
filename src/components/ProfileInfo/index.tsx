interface ProfileInfoProps {
    title: string;
    info?: string;
}

export const ProfileInfo = ({ title, info }: ProfileInfoProps) => {
    return info && (
        <p className='font-semibold'>
            <span className='text-gray-500 mr-2'>{ title }</span>
            <span>{ info }</span>
        </p>
    );
};
