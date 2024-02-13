import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { IEntry } from '@/interfaces';
import { entriesApi } from '@/apis';
import { useSnackbar } from 'notistack';

export interface EntriesState {
    entries: IEntry[];
}


const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}


export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
    const {
        enqueueSnackbar
    } = useSnackbar()

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
    }: IEntry, showAlert = false) => {
        try {
            const {
                data
            } = await entriesApi.put<IEntry>(`/entries/${_id}`, {
                description: description,
                status: status
            })

            dispatch({ type: '[Entry] - Update-Entry', payload: data })
            if (showAlert) {

                enqueueSnackbar('Entry updated', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    const deleteEntry = async (id: string) => {
        try {
            await entriesApi.delete<IEntry>(`/entries/${id}`)

            dispatch({ type: '[Entry] - Delete-Entry', payload: id})


            enqueueSnackbar('Entry deleted', {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })

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
            updateEntry,
            deleteEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
};