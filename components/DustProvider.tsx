import { createContext, useCallback, useContext, useMemo, useReducer } from "react";

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
}

type OptionTool = [Option, (action: Partial<Option>) => void,]

const DEFAULT_SORTING = 'name';
export const DEFAULT_SIDO = import.meta.env['VITE_PUBLIC_DEFAULT_SIDO'] ?? "전국";
const DEFAULT_OPTION: Option = { 
    sido: DEFAULT_SIDO, 
    bookmark: false, 
    sorting: DEFAULT_SORTING, 
    reverse: false,
};

const reducer = (state: Option, action: Partial<Option>): Option => {
    return { ...state, ...action };
}

const OptionContext = createContext<OptionTool>([DEFAULT_OPTION, () => {}]);

export function useOption() {
    return useContext(OptionContext);
}

export default function DustProvider({ children }: { children: React.ReactNode }){
    const [option, dispatch] = useReducer(reducer, DEFAULT_OPTION);
    const callback = useCallback(dispatch, []);
    const memo = useMemo<OptionTool>(() => [option, callback], [option]);
    
    return (
        <OptionContext value={memo}>{ children }</OptionContext>
    );
}