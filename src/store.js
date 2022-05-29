import { configureStore } from '@reduxjs/toolkit';
import sidoallReducer from './features/sidoall/sidoallSlice';

export default configureStore({
    reducer: {
        sidoall: sidoallReducer,
    },
});