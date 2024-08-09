import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/userSlice';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '@nextui-org/react';
import { User } from '../../components/User';

export const Following = () => {
    const currentUser = useSelector(selectCurrentUser);

    if (!currentUser) return null;

    return currentUser.following.length ? (
        <div className='flex flex-col gap-5'>
            {
                currentUser.following.map(({ following }) => (
                    <Link to={ `/users/${ following.id }` } key={ following.id }>
                        <Card>
                            <CardBody className='block'>
                                <User
                                    name={ following.name ?? '' }
                                    avatarUrl={ following.avatarUrl ?? '' }
                                    description={ following.email ?? '' }
                                />
                            </CardBody>
                        </Card>
                    </Link>
                ))
            }
        </div>
    ) : (
        <h1>У вас нет подписок</h1>
    );
};
