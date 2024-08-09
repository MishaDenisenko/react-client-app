import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/userSlice';
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import { BASE_URL } from '../../constants';
import { Link } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';

export const Profile = () => {
    const current = useSelector(selectCurrentUser);

    return current && (
        <Card className='p-4 w-[302px]'>
            <CardHeader className='pb-0 pt-2 px-4 flex-col items-center'>
                <Image alt='Card image' className='object-cover rounded-xl'
                       src={ `${ BASE_URL }${ current.avatarUrl }` } width={ 370 }
                />
            </CardHeader>
            <CardBody>
                <Link to={ `users/${ current.id }` }>
                    <h4 className='font-bold text-large mb-2'>{ current.name }</h4>
                </Link>
                <p className='text-default-500 flex items-center gap-2'>
                    {/*<MdAlternateEmail/>*/}
                    { current.email }
                </p>
            </CardBody>
        </Card>
    );
};
