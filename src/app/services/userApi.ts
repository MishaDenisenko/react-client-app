import { api } from './api';
import { User } from '../types';

export const userApi = api.injectEndpoints({
    endpoints: builder => ( {
        login: builder.mutation<Token, Login>({
            query: arg => ( {
                url: '/login',
                method: 'POST',
                body: arg
            } )
        }),
        register: builder.mutation<Register, Register>({
            query: arg => ( {
                url: '/register',
                method: 'POST',
                body: arg
            } )
        }),
        current: builder.query<User, void>({
            query: () => ( {
                url: '/current',
                method: 'GET'
            } )
        }),
        getUserById: builder.query<User, string>({
            query: (id) => ( {
                url: `/users/${ id }`,
                method: 'GET'
            } )
        }),
        updateUser: builder.mutation<User, UpdateUser>({
            query: ({ id, userData }) => ( {
                url: `/users/${ id }`,
                method: 'PUT',
                body: userData
            } )
        })
    } )
});

type Token = {
    token: string | undefined;
    id: string
}

type Login = {
    email: string,
    password: string,
}

type Register = {
    email: string,
    password: string,
    name?: string,
}

type UpdateUser = {
    id: string,
    userData: FormData,
}

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    useCurrentQuery,
    useLazyCurrentQuery,
    useUpdateUserMutation,
    endpoints: { register, login, getUserById, current, updateUser }
} = userApi;
