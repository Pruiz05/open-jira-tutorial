import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, useContext, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '@/context/ui';

export const NewEntry = () => {
    const [inputValue, setInputValue] = useState('')
    const [touched, setTouched] = useState(false)

    const {
        setIsAddingEntry,
        isAddingEntry
    } = useContext(UIContext)

    const {
        addEntry,
    } = useContext(EntriesContext)

    const handleOnTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleSubmit = () => {
        if (inputValue.length === 0) return;

        addEntry(inputValue)
        setIsAddingEntry(false)
        setTouched(false)
        setInputValue('')
    }

    return (
        <Box sx={{
            marginBottom: 2,
            paddingX: 1
        }}>
            {
                isAddingEntry ? (
                    <>
                        <TextField fullWidth sx={{
                            marginTop: 2, marginBottom: 1
                        }}
                            autoFocus
                            multiline
                            placeholder='New Entry'
                            label='New Entry'
                            helperText={inputValue.length <= 0 && touched && 'Add a value'}
                            error={inputValue.length <= 0 && touched}
                            value={inputValue}
                            onChange={handleOnTextChange}
                            onBlur={() => setTouched(true)}
                        />
                        <Box display='flex' justifyContent='space-between'>
                            <Button variant='text' color='error' startIcon={<CloseOutlinedIcon />} onClick={() => setIsAddingEntry(false)}>
                                Cancel
                            </Button>
                            <Button variant='outlined' color='primary' startIcon={<SaveIcon />} onClick={handleSubmit}>
                                Save
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Button startIcon={<AddIcon />} fullWidth variant='outlined' onClick={() => setIsAddingEntry(true)}>
                            Add
                        </Button>
                    </>
                )
            }



        </Box>
    )
}
