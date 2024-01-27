import { IEntry } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
    entries: IEntry[];
    addEntry: (description: string) => void;
}


export const EntriesContext = createContext({} as ContextProps);