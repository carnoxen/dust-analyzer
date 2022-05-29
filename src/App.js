// import logo from './logo.svg';
//import './App.css';
import './Nav.css'
import React, {useState} from 'react';
import MySidoContent from './features/sidoall/MySidoContent';
import SidoAllContent from './features/sidoall/SidoAllContent';
import BookmarkContent from './features/sidoall/BookmarkContent'

function FilterButton({ name, value, click }) {
    return (<button onClick={click} value={value}>{name}</button>)
}

function App() {
    const [status, setStatus] = useState('sidoall')

    const changeStatus = e => setStatus(e.target.value)

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
