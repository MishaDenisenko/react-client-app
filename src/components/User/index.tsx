import { User as NextUser } from '@nextui-org/react';
import { BASE_URL } from '../../constants';


interface UserProps {
    name: string;
    avatarUrl: string;
    description?: string;
    className?: string;
}

export const User = ({name, avatarUrl, description, className}: UserProps) => {
    return (
        <NextUser name={name} className={className}
                  description={description}
                  avatarProps={{ src: `${BASE_URL}${avatarUrl}` }}
        />
    );
};
