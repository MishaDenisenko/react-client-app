import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery, useLazyCurrentQuery, useLazyGetUserByIdQuery } from '../../app/services/userApi';
import { GoBack } from '../../components/GoBack';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser, selectCurrentUser } from '../../features/userSlice';
import { Button, Card, Image, ButtonVariantProps, ThemeColors, useDisclosure } from '@nextui-org/react';
import { BASE_URL } from '../../constants';
import { CiEdit } from 'react-icons/ci';
import { ProfileInfo } from '../../components/ProfileInfo';
import { formatToClientDate } from '../../utils/formatToClientDate';
import { CountInfo } from '../../components/CountInfo';
import { MdOutlinePersonAddAlt1, MdOutlinePersonAddDisabled } from 'react-icons/md';
import { useFollowUserMutation, useUnfollowUserMutation } from '../../app/services/followApi';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;
import { hasErrorField } from '../../utils/hasErrorField';
import { ErrorMessage } from '../../components/ErrorMessage';
import { EditProfile } from '../../components/EditProfile';

export const UserProfile = () => {
    const { id } = useParams<{ id: string }>();
    const { data } = useGetUserByIdQuery(id ?? '');
    const [error, setError] = useState('');

    const currentUser = useSelector(selectCurrentUser);
    const isSelfProfile = currentUser?.id === id;

    const [followUser] = useFollowUserMutation();
    const [unfollowUser] = useUnfollowUserMutation();

    const [triggerCurrentUser] = useLazyCurrentQuery();
    const [triggerGetUserById] = useLazyGetUserByIdQuery();

    const dispatch = useDispatch();
    const { isOpen, onClose, onOpen } = useDisclosure();

    useEffect(() => () => {
        dispatch(resetUser());
    }, []);

    if (!data) return null;

    const triggerUser = async () => {
        await triggerGetUserById(id ?? '').unwrap();
        await triggerCurrentUser().unwrap();
    };

    const follow = async () => {
        try {
            await followUser({ followingId: id ?? '' }).unwrap();
            await triggerUser();
        } catch (error) {
            hasErrorField(error) ? setError(error.data.error) : setError(error as string);
        }
    };

    const unfollow = async () => {
        try {
            await unfollowUser(id ?? '').unwrap();
            await triggerUser();

        } catch (error) {
            hasErrorField(error) ? setError(error.data.error) : setError(error as string);
        }
    };

    const handleCloseModal = async () => {
        if (!id) return;

        try {
            await triggerUser();
            onClose();
        } catch (error) {
            hasErrorField(error) ? setError(error.data.error) : setError(error as string);
        }
    };

    const buttonParams = {
        endContent: data.isFollowing ? <MdOutlinePersonAddDisabled/> : <MdOutlinePersonAddAlt1/>,
        text: data.isFollowing ? 'Отписаться' : 'Подписаться',
        func: data.isFollowing ? unfollow : follow
    };

    return (
        <>
            <GoBack/>
            <div className='flex gap-4'>
                <Card className='flex flex-col items-center text-center space-y-4 p-5 flex-2'>
                    <Image
                        src={ `${ BASE_URL }${ data.avatarUrl }` }
                        alt={ data.name }
                        width={200}
                        className='border-4 b-wite'
                    />
                    <div className='flex flex-col text-2xl font-bold gap-4 item-center'>
                        { data.name }
                        {
                            isSelfProfile
                                ?
                                <Button endContent={ <CiEdit/> } onClick={ () => onOpen() }>
                                    Редактировать
                                </Button>
                                :
                                <Button
                                    className='gap-2'
                                    color={ data.isFollowing ? 'default' : 'primary' }
                                    variant={ 'flat' }
                                    onClick={ buttonParams.func }
                                    endContent={ buttonParams.endContent }
                                >
                                    { buttonParams.text }
                                </Button>
                        }
                    </div>
                </Card>
                <Card className='flex flex-col space-y-4 p-5 flex-1'>
                    <ProfileInfo title={ 'Почта:' } info={ data.email }/>
                    <ProfileInfo title={ 'Местоположение:' } info={ data.location }/>
                    <ProfileInfo title={ 'День рождения:' } info={ formatToClientDate(data.dateOfBirth) }/>
                    <ProfileInfo title={ 'О себе:' } info={ data.bio }/>
                    <div className='flex gap-2'>
                        <CountInfo title={ 'Подписчики' } count={ data.followers.length }/>
                        <CountInfo title={ 'Подписки' } count={ data.following.length }/>
                    </div>
                </Card>
            </div>
            <EditProfile user={ data } isOpen={ isOpen } onClose={ handleCloseModal }/>
            <ErrorMessage message={ error }/>
        </>
    );
};
