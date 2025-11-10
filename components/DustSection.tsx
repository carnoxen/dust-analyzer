import { useState, type ChangeEventHandler } from "react";
import { DEFAULT_SIDO, useOption, type Dust } from "./DustProvider";

function explainGrade(grade: string) {
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

function gradeToHSL(grade: string) {
    switch (grade) {
        case '1':
            return `bg-[hsl(120_100_30)]`
        case '2':
            return `bg-[hsl(90_100_30)]`
        case '3':
            return `bg-[hsl(60_100_30)]`
        case '4':
            return `bg-[hsl(30_100_30)]`
        case '5':
            return `bg-[hsl(0_100_30)]`
        default:
            return "bg-[hsl(0_0_30)]"
    }
}

function DustSection({ sidoName, stationName, pm10Grade, pm10Value, dataTime, bookmark }: Dust & { bookmark: boolean }) {
    const hsl = gradeToHSL(pm10Grade);
    const [bookmarked, setBookmarked] = useState(false);

    const selectBookmark: ChangeEventHandler<HTMLInputElement> = e => {
        setBookmarked(e.target.checked);
    }

    return (
        <section className={`${hsl} rounded-2xl p-3 m-1`} hidden={bookmark && !bookmarked}>
            <h2>{sidoName} {stationName}</h2>
            <ul>
                <li>등급: {explainGrade(pm10Grade)}</li>
                <li>농도: {pm10Value} &micro;g/m<sup>3</sup></li>
                <li>측정 시간: {dataTime}</li>
                <li>
                    <label>bookmark?: 
                        <input id={stationName} type="checkbox" value={stationName} onChange={selectBookmark}
                        checked={bookmarked} />
                    </label>
                </li>
            </ul>
        </section>
    )
}

export default function DustSectionList({ dusts }: { dusts: Dust[] }) {
    const [{sido, bookmark, sorting, reverse}] = useOption();

    return (
        <main className="flex-col items-center justify-center pt-16 pb-4">
            <h1>초미세먼지 모음</h1>
            {dusts
                .filter(({ sidoName }) => [DEFAULT_SIDO, sidoName].includes(sido)) 
                .toSorted((a, b) => {
                    if ('name' === sorting) {
                        const dustName = (x:Dust) => `${x.sidoName}${x.stationName}`
                        return dustName(a).localeCompare(dustName(b)) * (reverse ? -1 : 1);
                    }

                    return `${a[sorting]}`.localeCompare(`${b[sorting]}`) * (reverse ? -1 : 1);
                })
                .map(x => <DustSection key={x.stationName} {...x} bookmark={bookmark} />)}
        </main>
    )
}