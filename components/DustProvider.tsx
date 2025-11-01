import { createContext, useContext, useReducer } from "react";

export type Dust = {
    sidoName: string, 
    stationName: string, 
    pm10Grade: string, 
    pm10Value: string, 
    dataTime: string,
}

type Option = {
    sido: string;
    bookmark: boolean;
    selections: string[];
}

type OptionTools = [Option, (action: Partial<Option>) => void,]

export const DEFAULT_SIDO = import.meta.env['VITE_PUBLIC_DEFAULT_SIDO'] ?? "전국";
const DEFAULT_OPTION: Option = { sido: DEFAULT_SIDO, bookmark: false, selections: [] };

const reducer = (state: Option, action: Partial<Option>): Option => {
    return { ...state, ...action };
}

const DustContext = createContext<OptionTools>([DEFAULT_OPTION, () => {}]);

export function useOptions() {
    return useContext(DustContext);
}

export default function DustProvider({ children }: { children: React.ReactNode }){
    return (
        <DustContext value={useReducer(reducer, DEFAULT_OPTION)}>{ children }</DustContext>
    );
}