import props from "../../props.json"
import React, { useEffect, useState } from 'react';
import DustSection from "./DustSection";

function MySidoContent() {
    const regions = props.regions
    
    const [sidoName, setSidoName] = useState(regions[0])
    const [dusts, setDusts] = useState([])
    const [stations, setStations] = useState([])
    const [stationName, setStationName] = useState('')

    const changeSidoName = e => setSidoName(e.target.value)
    const changeStationName = e => setStationName(e.target.value)

    useEffect(() => {
        const { serviceKey, returnType, ver, numOfRows, pageNo } = props.settings;
        const url = `B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${serviceKey}&returnType=${returnType}&numOfRows=${numOfRows}&pageNo=${pageNo}&sidoName=${sidoName}&ver=${ver}`

        fetch(url)
            .then(res => res.json())
            .then(data => data.response.body.items)
            .then(res => {
                setDusts(res)
                setStations(res.map(x => x.stationName))
                setStationName(res.map(x => x.stationName).at(0))
            })
    }, [sidoName])

    return (<React.Fragment>
        <header>
            <select onInput={changeSidoName}>
                {regions.map(reg => <option key={reg} value={reg} hidden={reg === sidoName}>{reg}</option>)}
            </select>
            <select onInput={changeStationName}>
                {stations.map(station => <option key={station} value={station} hidden={station === stationName}>{station}</option>)}
            </select>
        </header>
        <main id="mysido">
            <h1>내 지역</h1>
            {dusts
            .filter(x => x.stationName === stationName)
            .map((dust) => <DustSection key={dust.stationName} dust={JSON.stringify(dust)} bookmarked={false} />)}
        </main>
    </React.Fragment>)
}

export default MySidoContent;