import './card.css'
import { useDispatch } from 'react-redux'
import { toggleBookmark } from '../sidoall/sidoallSlice'

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

export default function DustSection({dust, bookmark = true}) {
    const {sidoName, stationName, pm10Grade, pm10Value, dataTime, bookmarked} = JSON.parse(dust)
    const dispatch = useDispatch()

    const selectBookmark = e => dispatch(toggleBookmark(e.target.value))

    return (
        <section className={`card sig-${pm10Grade}`}>
            <h2>{sidoName} {stationName}</h2>
            <ul>
                <li>등급: {strGrade(pm10Grade)}</li>
                <li>농도: {pm10Value} &micro;g/m<sup>3</sup></li>
                <li>측정 시간: {dataTime}</li>
                {bookmark && <li><label>bookmark?: <input type="checkbox" 
                        value={stationName} 
                        checked={bookmarked} 
                        onChange={selectBookmark} /></label></li>}
            </ul>
        </section>
    )
}