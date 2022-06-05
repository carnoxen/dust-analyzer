import props from '../../props.json'
import { createSlice, /*createSelector*/ } from '@reduxjs/toolkit'

export const sidoallSlice = createSlice({
    name: 'sidoall',
    initialState: [],
    reducers: {
        setDusts(state, action) {
            return action.payload.map(x => ({
                ...x, 
                bookmarked: (state?.find(y => y.stationName === x.stationName)?.bookmarked ?? false)
            }))
        },
        toggleBookmark(state, action) {
            return state.map(x => (x.stationName === action.payload) ? ({...x, bookmarked: !x.bookmarked}) : x)
        }
    },
})

export const {setDusts, toggleBookmark} = sidoallSlice.actions
export const fetchDusts = () => (async dispatch => {
    const {serviceKey, returnType, ver, numOfRows, pageNo} = props.settings;
    const url = `B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${serviceKey}&returnType=${returnType}&numOfRows=${numOfRows}&pageNo=${pageNo}&ver=${ver}&sidoName=전국`
    
    const data = await fetch(url).then(res => res.json())

    dispatch(setDusts(data.response.body.items))
})

export const dusts = (state) => state.sidoall
// export const dustsBookmarked = state => state.sidoall.filter(x => x.bookmarked)
// export const dustsBySido = createSelector([dusts, (_, sidoName) => sidoName], 
// (dusts, sidoName) => dusts.filter(x => x.sidoName === sidoName))
// export const dustsByStationName = createSelector([dusts, (_, stationName) => stationName], 
// (dusts, stationName) => dusts.filter(x => x.stationName === stationName))

export default sidoallSlice.reducer