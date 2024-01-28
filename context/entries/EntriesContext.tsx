import { IEntry } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
    entries: IEntry[];
    addEntry: (description: string) => void;
    updateEntry: (entry: IEntry) => void
}


export const EntriesContext = createContext({} as ContextProps);