import props from "../../props.json"
import React, { useEffect, useState } from 'react';
import DustSection from "./DustSection";

function SidoAllContent() {
    const regions = ["전국", ...(props.regions)]
    const [sidoName, setSidoName] = useState(regions[0]);
    const [dusts, setDusts] = useState([])

    const changeSidoName = e => setSidoName(e.target.value)

    useEffect(() => {
        const { serviceKey, returnType, ver, numOfRows, pageNo } = props.settings;
        const url = `B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${serviceKey}&returnType=${returnType}&numOfRows=${numOfRows}&pageNo=${pageNo}&sidoName=${sidoName}&ver=${ver}`

        fetch(url)
            .then(res => res.json())
            .then(data => data.response.body.items)
            .then(res => setDusts(res))
    }, [sidoName])

    return (<React.Fragment>
        <header>
            <select onInput={changeSidoName}>
                {regions.map(reg => <option key={reg} value={reg} hidden={reg === sidoName}>{reg}</option>)}
            </select>
        </header>
        <main id="sidoall">
            <h1>시도별 미세먼지 측정</h1>
            {dusts
            .map((dust) => (<DustSection key={dust.stationName} dust={JSON.stringify(dust)} />))}
        </main>
    </React.Fragment>)
}

export default SidoAllContent;