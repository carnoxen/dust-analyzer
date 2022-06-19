import './Main.css'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DustSection from './features/sidoall/DustSection';
import { dusts } from './features/sidoall/sidoallSlice';

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

    return <main className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 content-start'>
        {cards
        .map(x => <DustSection key={x.stationName} dust={JSON.stringify(x)} bookmark={status !== 'mysido'} />)}
    </main>
}