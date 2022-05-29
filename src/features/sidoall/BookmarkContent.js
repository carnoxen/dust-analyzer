import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addBookmark, removeBookmark, bookmarks } from './sidoallSlice'
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

function BookmarkContent() {
    const dispatch = useDispatch()
    const bms = useSelector(bookmarks)

    const selectBookmark = (e) => {
        const tar = e.target
        const data = JSON.parse(tar.value)

        if (tar.checked) {
            dispatch(addBookmark(data))
        }
        else {
            dispatch(removeBookmark(data))
        }
    }

    return (<React.Fragment>
        <main id="bookmark">
            <h1>즐겨찾기</h1>
            {bms.map(({sidoName, stationName, pm10Grade, pm10Value, dataTime}) =>
                <section key={sidoName + stationName} className={`card sig-${pm10Grade}`}>
                    <h2>{sidoName} {stationName}</h2>
                    <ul>
                        <li>등급: {strGrade(pm10Grade)}</li>
                        <li>농도: {pm10Value}</li>
                        <li>측정 시간: {dataTime}</li>
                        <li><label>bookmark?: <input type="checkbox" 
                        value={JSON.stringify({sidoName, stationName, pm10Grade, pm10Value, dataTime})} 
                        checked={bms.filter(b => b.sidoName === sidoName && b.stationName === stationName).length > 0} 
                        onChange={selectBookmark} /></label></li>
                    </ul>
                </section>
            )}
        </main>
    </React.Fragment>)
}

export default BookmarkContent;