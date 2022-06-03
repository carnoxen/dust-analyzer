import { createSlice } from '@reduxjs/toolkit'

export const sidoallSlice = createSlice({
    name: 'sidoall',
    initialState: [],
    reducers: {
        setDusts(_, action) {
            return action.payload
        }
    },
})

export const {setDusts} = sidoallSlice.actions

export const dusts = (state) => state.sidoall

export default sidoallSlice.reducer