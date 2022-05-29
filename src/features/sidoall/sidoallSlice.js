import { createSlice } from '@reduxjs/toolkit'

export const sidoallSlice = createSlice({
    name: 'sidoall',
    initialState: [],
    reducers: {
        addBookmark(state, action) {
            state.push(action.payload)
        },
        removeBookmark(state, action) {
            const {sidoName, stationName} = action.payload;
            return state.filter(x => 
                x.sidoName !== sidoName || 
                x.stationName !== stationName)
        }
    },
})

export const { addBookmark, removeBookmark } = sidoallSlice.actions

export const bookmarks = (state) => state.sidoall

export default sidoallSlice.reducer