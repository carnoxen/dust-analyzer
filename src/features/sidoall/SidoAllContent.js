import props from "../../props.json"
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import { dusts } from "./sidoallSlice";
import DustSection from "./DustSection";
import RefreshButton from "../../RefreshButton";

function SidoAllContent() {
    const regions = props.regions
    
    const [sidoName, setSidoName] = useState(regions[0]);
    const [cards, setCards] = useState([])

    const dust_sel = useSelector(dusts)

    const changeSidoName = e => setSidoName(e.target.value)

    useEffect(() => {
        setCards(dust_sel.filter(x => x.sidoName === sidoName))
    }, [sidoName])

    return (<React.Fragment>
        <header>
            <RefreshButton />
            <select onInput={changeSidoName}>
                {regions.map(region => <option key={region} value={region} hidden={region === sidoName}>{region}</option>)}
            </select>
        </header>
        <main id="sidoall">
            <h1>시도별 미세먼지 측정</h1>
            {cards
            .map(card => (<DustSection key={card.stationName} dust={JSON.stringify(card)} />))}
        </main>
    </React.Fragment>)
}

export default SidoAllContent;