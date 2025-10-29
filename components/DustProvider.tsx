import { createContext, useContext, useReducer } from "react";

export type Dust = {
    sidoName: string, 
    stationName: string, 
    pm10Grade: string, 
    pm10Value: string, 
    dataTime: string, 
    bookmarked: boolean
}

type Option = {
    data: Dust[]
    sido: string;
    bookmark: boolean;
}

type OptionTools = {
    state: Option;
    dispatch: (action: Partial<Option>) => void;
}

export const DEFAULT_SIDO = import.meta.env['NEXT_PUBLIC_DEFAULT_SIDO'] || "전국";
const DEFAULT_OPTION: Option = { data: [], sido: DEFAULT_SIDO, bookmark: false };

const reducer = (state: Option, action: Partial<Option>): Option => {
    return { ...state, ...action };
}

const DustContext = createContext<OptionTools>({ 
    state: DEFAULT_OPTION, 
    dispatch: () => {}
});

export function useDusts() {
    return useContext(DustContext);
}

export default function DustProvider({ children }: { children: React.ReactNode }){
    const [state, dispatch] = useReducer(reducer, DEFAULT_OPTION);
    return (
        <DustContext value={{state, dispatch}}>{ children }</DustContext>
    );
}