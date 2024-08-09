import { Card as NextCard, CardBody, CardFooter, CardHeader, Spinner } from '@nextui-org/react';
import { useLikePostMutation, useUnlikePostMutation } from '../../app/services/likeApi';
import { useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from '../../app/services/postApi';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/userSlice';
import { User } from '../User';
import { formatToClientDate } from '../../utils/formatToClientDate';
import { useDeleteCommentMutation } from '../../app/services/commentApi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MetaInfo } from '../MetaInfo';
import { FcDislike } from 'react-icons/fc';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { FaRegComment } from 'react-icons/fa';
import { ErrorMessage } from '../ErrorMessage';
import { hasErrorField } from '../../utils/hasErrorField';

interface CardProps {
    avatarUrl: string;
    name: string;
    authorId: string;
    content: string;
    commentId?: string;
    likesCount?: number;
    commentsCount?: number;
    createdAt?: Date;
    id?: string;
    cardFor: 'comment' | 'post' | 'current-post';
    likedByUser?: boolean;
}

export const Card = (props: CardProps) => {
    const [likePost] = useLikePostMutation();
    const [unlikePost] = useUnlikePostMutation();
    const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
    const [triggerGetPostById] = useLazyGetPostByIdQuery();
    const [deletePost, deletePostStatus] = useDeletePostMutation();
    const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const currentUser = useSelector(selectCurrentUser);

    const {
        authorId,
        name,
        avatarUrl,
        createdAt,
        content,
        cardFor,
        id = '',
        commentId = '',
        commentsCount = 0,
        likesCount = 0,
        likedByUser
    } = props;

    const handleDelete = async () => {
        const deleteAction = {
            'post': async () => {
                await deletePost(id).unwrap();
                await triggerGetAllPosts().unwrap();
            },
            'current-post': async () => {
                await deletePost(id).unwrap();
                navigate('/')
            },
            'comment': async () => {
                await deleteComment(commentId).unwrap();
                await triggerGetPostById(id).unwrap();
            },
        }

        try {
            await deleteAction[cardFor]();
        } catch (error) {
            hasErrorField(error) ? setError(error.data.error) : setError(error as string);
        }
    };

    const handleClick = async () => {
        try {
            likedByUser ? await unlikePost(id).unwrap() : await likePost({ postId: id }).unwrap();

            if (cardFor === 'current-post') triggerGetPostById(id).unwrap();
            else if (cardFor == 'post') triggerGetAllPosts().unwrap();
        } catch (error) {
            hasErrorField(error) && setError(error.data.error);
        }
    }

    return (
        <NextCard className='mb-5'>
            <CardHeader className='justify-between items-center bg-transparent'>
                <Link to={ `/users/${ authorId }` }>
                    <User name={ name } avatarUrl={ avatarUrl }
                          className='text-small font-semibold leading-none text-default-600'
                          description={ formatToClientDate(createdAt) }
                    />
                </Link>
                {
                    authorId === currentUser?.id &&
                    (
                        <div className='cursor-pointer' onClick={ handleDelete }>
                            {
                                deleteCommentStatus.isLoading || deletePostStatus.isLoading
                                    ? <Spinner/>
                                    : <RiDeleteBinLine/>
                            }
                        </div>
                    )
                }
            </CardHeader>
            <CardBody className='px-3 py-2 mb-5'>
                <p className='text-xl'>{ content }</p>
            </CardBody>
            {
                cardFor !== 'comment' && (
                    <CardFooter className={ 'gap-3' }>
                        <div className='flex gap-5 items-center'>
                            <div onClick={ handleClick }>
                                <MetaInfo
                                    count={ likesCount }
                                    icon={ likedByUser ? <FcDislike/> : <MdOutlineFavoriteBorder/> }
                                />
                            </div>
                            <Link to={ `/posts/${ id }` }>
                                <MetaInfo count={ commentsCount } icon={ <FaRegComment/> }/>
                            </Link>
                        </div>
                        <ErrorMessage message={ error }/>
                    </CardFooter>
                )
            }
        </NextCard>
    );
};
