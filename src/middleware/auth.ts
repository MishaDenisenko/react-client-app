import { createListenerMiddleware } from '@reduxjs/toolkit';
import { login } from '../app/services/userApi';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: login.matchFulfilled,
    effect: async (action, api) => {
        api.cancelActiveListeners();

        action.payload.token && localStorage.setItem('token', action.payload.token);
    }
});