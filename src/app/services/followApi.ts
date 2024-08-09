import { api } from './api';
import { Follows } from '../types';

export const followApi = api.injectEndpoints({
    endpoints: build => ( {
        followUser: build.mutation<void, { followingId: string }>({
            query: arg => ( {
                url: '/follow',
                method: 'POST',
                body: arg
            } )
        }),
        unfollowUser: build.mutation<void, string>({
            query: id => ( {
                url: `/follow/${ id }`,
                method: 'DELETE'
            } )
        })
    } )
});

export const {
    useFollowUserMutation,
    useUnfollowUserMutation,
    endpoints: { followUser, unfollowUser }
} = followApi;