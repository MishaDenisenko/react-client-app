import { useGetAllPostsQuery } from '../../app/services/postApi';
import { CreatePost } from '../../components/CreatePost';
import { Card } from '../../components/Card';


export const Posts = () => {
    const { data } = useGetAllPostsQuery();

    return (
        <>
            <div className='mb-10 w-full'>
                <CreatePost/>
            </div>
            {
                data && data.map(({content, author: {avatarUrl, name}, id, authorId, comments, likes, likedByUser, createdAt}) => (
                        <Card
                            key={id}
                            id={id}
                            avatarUrl={avatarUrl ?? ''}
                            name={name ?? ''}
                            authorId={authorId}
                            content={content}
                            cardFor='post'
                            likesCount={likes.length}
                            commentsCount={comments.length}
                            likedByUser={likedByUser}
                            createdAt={createdAt}
                        />
                    ))
            }
        </>
    );
};
