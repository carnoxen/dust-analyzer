import props from './props.json'
import {useDispatch} from 'react-redux'
import {setDusts} from './features/sidoall/sidoallSlice'

export default function RefreshButton() {
    const dispatch = useDispatch();

    const fetchData = async () => {
        const {serviceKey, returnType, ver, numOfRows, pageNo} = props.settings;
        const url = `B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${serviceKey}&returnType=${returnType}&numOfRows=${numOfRows}&pageNo=${pageNo}&ver=${ver}&sidoName=전국`
        
        const data = await fetch(url).then(res => res.json())

        dispatch(setDusts(data.response.body.items))
    }

    return <button onClick={fetchData}>refresh</button>
}