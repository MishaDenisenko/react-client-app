import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
    baseUrl: `${ BASE_URL }/api`,
    prepareHeaders: (headers, api) => {
        const token = ( api.getState() as RootState ).user.token || localStorage.getItem('token');

        token && headers.set('Authorization', `Bearer ${token}`);

        return headers;
    },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
    baseQuery: baseQueryWithRetry,
    endpoints: () => ( {} ),
    reducerPath: 'splitApi',
    refetchOnMountOrArgChange: true,
})