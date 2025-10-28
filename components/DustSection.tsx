import type { ChangeEventHandler } from "react";
import { useDusts, type Dust } from "./DustProvider";

function strGrade(grade: string) {
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

export default function DustSection(dust: Dust) {
    const { sidoName, stationName, pm10Grade, pm10Value, dataTime, bookmarked } = dust;
    const { state, dispatch } = useDusts();

    const selectBookmark: ChangeEventHandler<HTMLInputElement> = e => {
        const value = e.target.value;
        const checked = e.target.checked;
        const { data } = state;
        dispatch({
            data: data.map(x => x.stationName === value ? ({
                ...x,
                bookmarked: checked,
            }) : x)
        })
    }

    return (
        <section className={`card sig-${pm10Grade} rounded-2xl p-4`}>
            <h2>{sidoName} {stationName}</h2>
            <ul>
                <li>등급: {strGrade(pm10Grade)}</li>
                <li>농도: {pm10Value} &micro;g/m<sup>3</sup></li>
                <li>측정 시간: {dataTime}</li>
                <li>
                    <label>bookmark?: 
                        <input id={stationName} type="checkbox" value={stationName} checked={bookmarked} onChange={selectBookmark} />
                    </label>
                </li>
            </ul>
        </section>
    )
}