import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/userSlice';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '@nextui-org/react';
import { User } from '../../components/User';

export const Followers = () => {
    const currentUser = useSelector(selectCurrentUser);

    if (!currentUser) return null;

    return currentUser.followers.length ? (
        <div className='flex flex-col gap-5'>
            {
                currentUser.followers.map(({ follower }) => (
                    <Link to={ `/users/${ follower.id }` } key={ follower.id }>
                        <Card>
                            <CardBody className='block'>
                                <User
                                    name={ follower.name ?? '' }
                                    avatarUrl={ follower.avatarUrl ?? '' }
                                    description={ follower.email ?? '' }
                                />
                            </CardBody>
                        </Card>
                    </Link>
                ))
            }
        </div>
    ) : (
        <h1>У вас нет подписчиков</h1>
    );
};
