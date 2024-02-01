import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { EntriesContext, entriesReducer } from './';
import { IEntry } from '@/interfaces';
import { entriesApi } from '@/apis';

export interface EntriesState {
    entries: IEntry[];
}


const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}


export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

    const addEntry = (description: string) => {
        const newEntry: IEntry = {
            _id: uuidv4(),
            description: description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: '[Entry] - Add-Entry', payload: newEntry })
    }

    const updateEntry = (entry: IEntry) => {
        dispatch({ type: '[Entry] - Update-Entry', payload: entry })
    }


    const fetchEntries = async () => {
        const { data } = await entriesApi.get<IEntry[]>('/entries');

        dispatch({ type: '[Entry] - Load-Entry', payload: data })
    }

    useEffect(() => {
        fetchEntries()
    }, [])


    return (
        <EntriesContext.Provider value={{
            ...state,

            // methods
            addEntry,
            updateEntry

        }}>
            {children}
        </EntriesContext.Provider>
    )
};