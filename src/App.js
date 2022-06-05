import './Nav.css'
import props from './props.json'
import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { fetchDusts } from './features/sidoall/sidoallSlice';
import AppHeader from './AppHeader';
import AppMain from './AppMain';

function FilterButton({ name, value, click }) {
    return (<button onClick={click} value={value}>{name}</button>)
}

function App() {
    const regions = props.regions

    const [status, setStatus] = useState('sidoall')
    const [option, setOption] = useState(regions.at(0));

    const changeStatus = e => setStatus(e.target.value)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDusts())
    }, [dispatch])

    return (
        <>
            <AppHeader status={status} setOption={setOption} />
            <AppMain status={status} option={option} />
            <nav>
                <ul>
                    <li><FilterButton name="내 지역" value="mysido" click={changeStatus} /></li>
                    <li><FilterButton name="시도 전체" value="sidoall" click={changeStatus} /></li>
                    <li><FilterButton name="북마크" value="bookmark" click={changeStatus} /></li>
                </ul>
            </nav>
        </>
    );
}

export default App;
