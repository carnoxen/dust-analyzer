import { type ChangeEvent } from "react";
import { DEFAULT_SIDO, SORTING_SELECTIONS, useOptions, type Dust } from "./DustProvider";

export default function SidoSelector({ dusts }: { dusts: Dust[] }) {
    const [state, dispatch] = useOptions();
    const sidos = [...new Set([DEFAULT_SIDO, ...dusts.map(x => x.sidoName)])];

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target;
        dispatch({ [name]: value });
    }
    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = event.target;
        dispatch({ [name]: checked });
    }

    return (
        <nav className="fixed w-screen bottom-0 bg-gray-600 p-3">
            <label>Sido:
                <select name="sido" onChange={handleChange} value={state.sido}>
                    {sidos.map(x => <option key={x} value={x} className="text-black">{x}</option>)}
                </select>
            </label>
            <label>Bookmark?
                <input type="checkbox" name="bookmark" onChange={handleCheck} checked={state.bookmark} />
            </label>
            <label>Sorting:
                <select name="sorting" onChange={handleChange} value={state.sorting}>
                    {Object.entries(SORTING_SELECTIONS).map(([value, name]) => <option key={value} value={value} className="text-black">{name}</option>)}
                </select>
            </label>
            <label>Reverse?
                <input type="checkbox" name="reverse" onChange={handleCheck} checked={state.reverse} />
            </label>
        </nav>
    )
}