import { createSlice } from '@reduxjs/toolkit'

export const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState: [],
    reducers: {
        addBookmark(state, action) {
            state.push(action.payload)
        },
        removeBookmark(state, action) {
            return state.filter(x => x !== action.payload)
        },
    },
})

export const {addBookmark, removeBookmark} = bookmarkSlice.actions

export const bookmarks = (state) => state.bookmark

export default bookmarkSlice.reducer