import { type ChangeEvent } from "react";
import { DEFAULT_SIDO, useOptions, type Dust } from "./DustProvider";

export default function SidoSelector({ dusts }: { dusts: Dust[] }) {
    const [state, dispatch] = useOptions();
    const sidos = [...new Set([DEFAULT_SIDO, ...dusts.map(x => x.sidoName)])];

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ sido: event.target.value });
    }
    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({ bookmark: event.target.checked });
    }

    return (
        <nav className="fixed w-screen bottom-0 bg-gray-600 p-3">
            <label>Sido:
                <select name="sido" onChange={handleChange} value={state.sido}>
                    {sidos.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
            </label>
            <label>bookmark?
                <input type="checkbox" name="bookmark" onChange={handleCheck} checked={state.bookmark} />
            </label>
        </nav>
    )
}