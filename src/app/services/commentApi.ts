import { api } from './api';
import { Comment } from '../types';

export const commentApi = api.injectEndpoints({
    endpoints: build => ( {
        createComment: build.mutation<Comment, Partial<Comment>>({
            query: arg => ( {
                url: '/comments',
                method: 'POST',
                body: arg
            } )
        }),
        deleteComment: build.mutation<void, string>({
            query: id => ( {
                url: `/comments/${ id }`,
                method: 'DELETE'
            } )
        })
    } )
});

export const {
    useCreateCommentMutation,
    useDeleteCommentMutation,
    endpoints: { createComment, deleteComment }
} = commentApi;
