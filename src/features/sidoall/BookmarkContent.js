import React from 'react';
import { useSelector } from 'react-redux'
import { bookmarks } from './sidoallSlice'
import './card.css'
import DustSection from './DustSection';

function BookmarkContent() {
    const bms = useSelector(bookmarks)

    return (<React.Fragment>
        <main id="bookmark">
            <h1>즐겨찾기</h1>
            {bms
            .map(dust => <DustSection key={dust.stationName} dust={JSON.stringify(dust)} />)}
        </main>
    </React.Fragment>)
}

export default BookmarkContent;