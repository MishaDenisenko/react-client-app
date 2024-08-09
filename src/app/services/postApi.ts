import { api } from './api';
import { Post } from '../types';

export const postApi = api.injectEndpoints({
    endpoints: build => ( {
        createPost: build.mutation<Post, { content: string }>({
            query: arg => ( {
                url: '/posts',
                method: 'POST',
                body: arg
            } )
        }),
        getAllPosts: build.query<Post[], void>({
            query: () => ( {
                url: '/posts',
                method: 'GET'
            } )
        }),
        getPostById: build.query<Post, string>({
            query: id => ( {
                url: `/posts/${ id }`,
                method: 'GET'
            } )
        }),
        deletePost: build.mutation<void, string>({
            query: id => ( {
                url: `/posts/${ id }`,
                method: 'DELETE'
            } )
        })
    } )
});

export const {
    useCreatePostMutation,
    useGetAllPostsQuery,
    useLazyGetAllPostsQuery,
    useGetPostByIdQuery,
    useLazyGetPostByIdQuery,
    useDeletePostMutation,
    endpoints: { createPost, getAllPosts, getPostById, deletePost }
} = postApi;