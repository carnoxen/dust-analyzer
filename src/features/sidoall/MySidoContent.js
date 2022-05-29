import props from "../../props.json"
import React, { useEffect, useState } from 'react';
import './card.css'

function strGrade(grade) {
    switch (grade) {
        case '1':
            return "좋음";
        case '2':
            return "보통"
        case '3':
            return "한때 나쁨"
        case '4':
            return "나쁨"
        case '5':
            return "아주 나쁨"
        default:
            return "알 수 없음"
    }
}

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
            {dusts.filter(x => x.stationName === stationName).map(({sidoName, stationName, pm10Grade, pm10Value, dataTime}) =>
                <section key={sidoName + stationName} className={`card sig-${pm10Grade}`}>
                    <h2>{sidoName} {stationName}</h2>
                    <ul>
                        <li>등급: {strGrade(pm10Grade)}</li>
                        <li>농도: {pm10Value}</li>
                        <li>측정 시간: {dataTime}</li>
                    </ul>
                </section>
            )}
        </main>
    </React.Fragment>)
}

export default MySidoContent;