import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../app/services/postApi';
import { Card } from '../../components/Card';
import { CreateComment } from '../../components/CreateComment';
import { GoBack } from '../../components/GoBack';

export const CurrentPost = () => {
    const { id } = useParams<{ id: string }>();
    const { data } = useGetPostByIdQuery(id ?? '');

    if (!data) return <h2>Поста не существует</h2>;

    const {
        content,
        author: { avatarUrl = '', name = '' },
        authorId,
        comments,
        likes,
        likedByUser,
        createdAt
    } = data;

    return (
        <>
            <GoBack/>
            <Card
                id={ id }
                name={ name }
                authorId={ authorId }
                avatarUrl={ avatarUrl }
                content={ content }
                likedByUser={ likedByUser }
                commentsCount={ comments.length }
                likesCount={ likes.length }
                createdAt={ createdAt }
                cardFor='current-post'
            />
            <div className='mt-10'>
                <CreateComment/>
            </div>
            <div className='mt-10'>
                {
                    comments && comments.map((comment) => (
                        <Card
                            key={ comment.id }
                            commentId={ comment.id }
                            avatarUrl={ comment.user.avatarUrl ?? '' }
                            authorId={ comment.userId ?? '' }
                            content={ comment.content }
                            name={ comment.user.name ?? '' }
                            id={ id }
                            likedByUser={ likedByUser }
                            commentsCount={ comments.length }
                            likesCount={ likes.length }
                            createdAt={ createdAt }
                            cardFor='comment'
                        />
                    ))
                }
            </div>
        </>
    );
};
