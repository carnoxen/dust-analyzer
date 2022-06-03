import './Nav.css'
import props from './props.json'
import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { setDusts } from './features/sidoall/sidoallSlice';
import MySidoContent from './features/sidoall/MySidoContent';
import SidoAllContent from './features/sidoall/SidoAllContent';
import BookmarkContent from './features/sidoall/BookmarkContent'

function FilterButton({ name, value, click }) {
    return (<button onClick={click} value={value}>{name}</button>)
}

function App() {
    const [status, setStatus] = useState('sidoall')

    const changeStatus = e => setStatus(e.target.value)
    const dispatch = useDispatch();

    const fetchData = async () => {
        const {serviceKey, returnType, ver, numOfRows, pageNo} = props.settings;
        const url = `B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${serviceKey}&returnType=${returnType}&numOfRows=${numOfRows}&pageNo=${pageNo}&ver=${ver}&sidoName=전국`
        
        const data = await fetch(url).then(res => res.json())

        dispatch(setDusts(data.response.body.items))
    }

    const shuffle = () => {
        switch (status) {
            case "sidoall":
                return <SidoAllContent />
            case "mysido":
                return <MySidoContent />
            case "bookmark":
                return <BookmarkContent />
            default:
                return (<main>no section</main>)
        }
    }

    useEffect(() => {
        fetchData();
    }, [status])

    return (
        <React.Fragment>
            {shuffle()}
            <nav>
                <ul>
                    <li><FilterButton name="내 지역" value="mysido" click={changeStatus} /></li>
                    <li><FilterButton name="시도 전체" value="sidoall" click={changeStatus} /></li>
                    <li><FilterButton name="북마크" value="bookmark" click={changeStatus} /></li>
                </ul>
            </nav>
        </React.Fragment>
    );
}

export default App;
