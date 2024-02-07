import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
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

    const addEntry = async (description: string) => {
        const {
            data
        } = await entriesApi.post<IEntry>('/entries', {
            description
        })

        dispatch({ type: '[Entry] - Add-Entry', payload: data })
    }

    const updateEntry = async ({
        _id, description, status
    }: IEntry) => {
        try {
            const {
                data
            } = await entriesApi.put<IEntry>(`/entries/${_id}`, {
                description: description,
                status: status
            })
    
            dispatch({ type: '[Entry] - Update-Entry', payload: data })
        } catch (error) {
            console.log(error)
        }
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