import './Nav.css'
import props from './props.json'
import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { fetchDusts } from './features/sidoall/sidoallSlice';
import AppHeader from './AppHeader';
import AppMain from './AppMain';

function FilterButton({ name, value, click }) {
    return (<button className='hover:bg-slate-200' onClick={click} value={value}>{name}</button>)
}

export default function App() {
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
                <FilterButton name="🏠내 지역" value="mysido" click={changeStatus} />
                <FilterButton name="🏢시도 전체" value="sidoall" click={changeStatus} />
                <FilterButton name="📒북마크" value="bookmark" click={changeStatus} />
            </nav>
        </>
    );
}
