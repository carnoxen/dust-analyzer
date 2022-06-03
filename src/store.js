import { configureStore } from '@reduxjs/toolkit';
import sidoallReducer from './features/sidoall/sidoallSlice';
import bookmarkReducer from './features/bookmark/bookmarkSlice'

export default configureStore({
    reducer: {
        sidoall: sidoallReducer,
        bookmark: bookmarkReducer,
    },
});