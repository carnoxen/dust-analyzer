import props from "../../props.json"
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import DustSection from "./DustSection";
import RefreshButton from '../../RefreshButton';
import {dusts} from './sidoallSlice'

function MySidoContent() {
    const regions = props.regions
    
    const [sidoName, setSidoName] = useState(regions[0])
    const [cards, setCards] = useState([])
    const [stations, setStations] = useState([])
    const [stationName, setStationName] = useState('')

    const dust_sel = useSelector(dusts)

    const changeSidoName = e => setSidoName(e.target.value)
    const changeStationName = e => setStationName(e.target.value)

    useEffect(() => {
        setCards(dust_sel.filter(x => x.sidoName === sidoName))
        setStations(dust_sel.filter(x => x.sidoName === sidoName).map(x => x.stationName))
        setStationName(dust_sel.filter(x => x.sidoName === sidoName).map(x => x.stationName).at(0))
    }, [sidoName])

    return (<React.Fragment>
        <header>
            <RefreshButton />
            <select onInput={changeSidoName}>
                {regions.map(region => <option key={region} value={region} hidden={region === sidoName}>{region}</option>)}
            </select>
            <select onInput={changeStationName}>
                {stations.map(station => <option key={station} value={station} hidden={station === stationName}>{station}</option>)}
            </select>
        </header>
        <main id="mysido">
            <h1>내 지역</h1>
            {cards
            .filter(x => x.stationName === stationName)
            .map((dust) => <DustSection key={dust.stationName} dust={JSON.stringify(dust)} bookmark={false} />)}
        </main>
    </React.Fragment>)
}

export default MySidoContent;