import { api } from './api';
import { Like } from '../types';

export const likeApi = api.injectEndpoints({
    endpoints: build => ( {
        likePost: build.mutation<Like, { postId: string }>({
            query: arg => ( {
                url: '/likes',
                method: 'POST',
                body: arg
            } )
        }),
        unlikePost: build.mutation<void, string>({
            query: id => ( {
                url: `/likes/${ id }`,
                method: 'DELETE'
            } )
        })
    } )
});

export const {
    useLikePostMutation, useUnlikePostMutation,
    endpoints: { likePost, unlikePost }
} = likeApi;

// export const {
//     endpoints: { likePost, unlikePost }
// } = likeApi;