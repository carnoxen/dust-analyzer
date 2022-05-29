export function Selector(props) {
    return (
        <select>
            {regions.map(reg => (<option key={reg} value={reg}>{reg}</option>))}
        </select>
    )
}