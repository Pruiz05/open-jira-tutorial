import { IEntry } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
    entries: IEntry[];
    addEntry: (description: string) => void;
    updateEntry: (entry: IEntry, showAlert: boolean) => void;
    deleteEntry: (id: string) => void;
}

export const EntriesContext = createContext({} as ContextProps);