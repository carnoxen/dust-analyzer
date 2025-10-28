import { type ChangeEvent } from "react";
import { DEFAULT_SIDO, useDusts } from "./DustProvider";

export default function SidoSelector() {
    const { state, dispatch } = useDusts();
    const { data: dusts, sido, bookmark } = state;
    console.log(state);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ sido: event.target.value });
    }
    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({ bookmark: event.target.checked });
    }

    return (
        <aside>
            <label>Sido:
                <select name="sido" onChange={handleChange} value={sido}>
                    {
                        [DEFAULT_SIDO, ...dusts
                            .map(x => x.sidoName)
                            .reduce<string[]>((a, b) => a.includes(b) ? a : [...a, b], [])]
                            .map(x => <option key={x} value={x}>{x}</option>)
                    }
                </select>
            </label>
            <label>bookmark?
                <input type="checkbox" name="bookmark" onChange={handleCheck} checked={bookmark} />
            </label>
        </aside>
    )
}