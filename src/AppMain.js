import './Main.css'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DustSection from './features/sidoall/DustSection';
import { dusts } from './features/sidoall/sidoallSlice';

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

export default function AppMain({ status, option }) {
    const [cards, setCards] = useState([])

    const dust_sel = useSelector(dusts)

    useEffect (() => {
        if (status === 'mysido') {
            setCards(dust_sel.filter(x => x.stationName === option))
        }
        else if (status === 'sidoall') {
            setCards(dust_sel.filter(x => x.sidoName === option))
        }
        else if (status === 'bookmark') {
            setCards(dust_sel.filter(x => x.bookmarked))
        }
    }, [status, option, dust_sel])

    return <main>
        <h1>{heading(status)}</h1>
        {cards
        .map(x => <DustSection key={x.stationName} dust={JSON.stringify(x)} bookmark={status !== 'mysido'} />)}
    </main>
}