import props from './props.json'
import { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {dusts} from './features/sidoall/sidoallSlice'

function heading(status) {
    switch (status) {
        case 'mysido':
            return '내 지역';
        case 'sidoall':
            return '시/도별'
        case 'bookmark':
            return '북마크'
        default:
            return 'unknown'
    }
}

export default function AppHeader({ status, setOption }) {
    const regions = props.regions;

    const [sidoName, setSidoName] = useState(regions.at(0))
    const [stations, setStations] = useState([])
    const [stationName, setStationName] = useState('')
    
    const changeSidoName = e => setSidoName(e.target.value)
    const changeStationName = e => {setStationName(e.target.value); setOption(e.target.value)}

    const dust_sel = useSelector(dusts)

    useEffect(() => {
        const filtered = dust_sel.filter(x => x.sidoName === sidoName).map(x => x.stationName);
        setStations(filtered)
        setStationName(filtered[0])

        if (status === 'sidoall') {
            setOption(sidoName)
        }
        else if (status === 'mysido') {
            setOption(filtered[0])
        }
    }, [status, dust_sel, sidoName, setOption])

    return <header>
        <h1>{heading(status)}</h1>
        <select onInput={changeSidoName} hidden={status !== 'mysido' && status !== 'sidoall'}>
            {regions.map(region => <option key={region} value={region} hidden={region === sidoName}>{region}</option>)}
        </select>
        <select onInput={changeStationName} hidden={status !== 'mysido'}>
            {stations.map(station => <option key={station} value={station} hidden={station === stationName}>{station}</option>)}
        </select>
    </header>
}