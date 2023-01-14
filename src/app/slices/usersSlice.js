import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = []

// createAsyncThunk  https://redux-toolkit.js.org/api/createAsyncThunk
/**
 * A function that accepts a Redux action type string and a callback function that should return a promise. It generates promise lifecycle action types based on the action type prefix that you pass in, and returns a thunk action creator that will run the promise callback and dispatch the lifecycle actions based on the returned promise.

This abstracts the standard recommended approach for handling async request lifecycles.

It does not generate any reducer functions, since it does not know what data you're fetching, how you want to track loading state, or how the data you return needs to be processed. You should write your own reducer logic that handles these actions, with whatever loading state and processing logic is appropriate for your own app.

 */
/**
 * createAsyncThunk accepts three parameters: a string action type value, a payloadCreator callback, and an options object
 * type
A string that will be used to generate additional Redux action type constants, representing the lifecycle of an async request:

For example, a type argument of 'users/requestStatus' will generate these action types:

    pending: 'posts/addNewPost/pending'
    fulfilled: 'posts/addNewPost/fulfilled'
    rejected: 'posts/addNewPost/rejected'
 */
export const fetchUsers = createAsyncThunk('users/fetchUsers',

/**
 *  {https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator} 
 * A callback function that should return a promise containing the result of some asynchronous logic. It may also return a value synchronously. If there is an error, it should either return a rejected promise containing an Error instance or a plain value such as a descriptive error message or otherwise a resolved promise with a RejectWithValue argument as returned by the thunkAPI.rejectWithValue function.
 */
async () => {
    const response = await axios.get(USERS_URL);
    return response.data
})

//https://redux-toolkit.js.org/usage/usage-guide#simplifying-slices-with-createslice
/**
 * Redux Toolkit includes a createSlice function that will auto-generate the action types and action creators for you, based on the names of the reducer functions you provide.
 */
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const selectAllUsers = (state) => state.users;

export const selectUserById = (state, userId) =>
    state.users.find(user => user.id === userId)

export default usersSlice.reducer