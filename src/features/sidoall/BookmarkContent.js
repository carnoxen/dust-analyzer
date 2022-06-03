import React from 'react';
import { useSelector } from 'react-redux'
import { bookmarks } from '../bookmark/bookmarkSlice'
import { dusts } from './sidoallSlice';
import './card.css'
import DustSection from './DustSection';
import RefreshButton from '../../RefreshButton';

function BookmarkContent() {
    const bookmark_sel = useSelector(bookmarks)
    const dust_sel = useSelector(dusts)

    return (<React.Fragment>
        <header>
            <RefreshButton />
        </header>
        <main id="bookmark">
            <h1>즐겨찾기</h1>
            {dust_sel
            .filter(x => bookmark_sel.includes(x.stationName))
            .map(dust => <DustSection key={dust.stationName} dust={JSON.stringify(dust)} />)}
        </main>
    </React.Fragment>)
}

export default BookmarkContent;