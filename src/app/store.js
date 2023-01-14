import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './slices/postsSlice';
import usersReducer from './slices/usersSlice';

//configureStore function automatically sets up the thunk middleware by default, so you can immediately start writing thunks as part of your application code
export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer
    }
})