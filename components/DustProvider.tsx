import { createContext, useContext, useReducer } from "react";

export type Dust = {
    sidoName: string, 
    stationName: string, 
    pm10Grade: string, 
    pm10Value: string, 
    dataTime: string,
}

export const SORTING_SELECTIONS = {
    name: '이름',
    pm10Value: '농도',
    dataTime: '측정 시간'
}

type Option = {
    sido: string;
    bookmark: boolean;
    sorting: keyof typeof SORTING_SELECTIONS;
    reverse: boolean;
    selections: string[];
}

type OptionTools = [Option, (action: Partial<Option>) => void,]

const DEFAULT_SORTING = 'name';
export const DEFAULT_SIDO = import.meta.env['VITE_PUBLIC_DEFAULT_SIDO'] ?? "전국";
const DEFAULT_OPTION: Option = { 
    sido: DEFAULT_SIDO, 
    bookmark: false, 
    sorting: DEFAULT_SORTING, 
    reverse: false,
    selections: [], 
};

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