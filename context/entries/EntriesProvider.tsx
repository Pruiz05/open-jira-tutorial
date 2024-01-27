import { FC, PropsWithChildren, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { EntriesContext, entriesReducer } from './';
import { IEntry } from '@/interfaces';

export interface EntriesState {
    entries: IEntry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'test 1 - Pending',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'test 2 - in progress',
            status: 'in-progress',
            createdAt: Date.now() - 1100000,
        },
        {
            _id: uuidv4(),
            description: 'test 3 - finished',
            status: 'finished',
            createdAt: Date.now() - 1000,
        }
    ],
}


export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addEntry = (description: string) => {
        const newEntry: IEntry = {
            _id: uuidv4(),
            description: description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: '[Entry] - Add-Entry', payload: newEntry })
    }

    return (
        <EntriesContext.Provider value={{
            ...state,

            // methods
            addEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
};