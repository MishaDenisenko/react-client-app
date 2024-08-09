import { createSlice } from '@reduxjs/toolkit';
import { User } from '../app/types';
import { current, getUserById, login } from '../app/services/userApi';
import { RootState } from '../app/store';

interface InitialState {
    user: User | null,
    isAuthenticated: boolean,
    users: User[] | null,
    currentUser: User | null,
    token?: string,
}

const initialState: InitialState = {
    user: null,
    isAuthenticated: false,
    users: null,
    currentUser: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => initialState,
        resetUser: (state) => { state.user = null; }
    },
    extraReducers: builder => {
        builder
            .addMatcher(login.matchFulfilled, (state, action) => {
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addMatcher(current.matchFulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.currentUser = action.payload;
            })
            .addMatcher(getUserById.matchFulfilled, (state, action) => {
                state.user = action.payload;
            });
    }
});

export const { logout, resetUser } = userSlice.actions;
export default userSlice.reducer;

const userSelectors = {
    selectIsAuthenticated: (state: RootState) => state.user.isAuthenticated,
    selectCurrentUser: (state: RootState) => state.user.currentUser,
    selectUser: (state: RootState) => state.user.user
};

export const { selectIsAuthenticated, selectCurrentUser, selectUser } = userSelectors;