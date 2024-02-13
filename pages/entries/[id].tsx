import { Layout } from '@/components/layouts'
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material'
import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { EntryStatus, IEntry } from '@/interfaces';
import { GetServerSideProps } from 'next';
import { isValidObjectId } from 'mongoose';
import { dbEntries } from '@/databases';
import { EntriesContext } from '@/context/entries';
import { useRouter } from 'next/router';
import { dateFunctions } from '@/utils';

const validStatus: EntryStatus[] = ['finished', 'in-progress', 'pending']

interface Props {
    entry: IEntry
}

const EntryPage: FC<Props> = ({
    entry
}) => {

    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false)
    const {
        updateEntry
    } = useContext(EntriesContext)

    const isInvalid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const router = useRouter()

    const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus)
    }

    const onSave = () => {

        if (inputValue.trim().length === 0) return;


        const updatedEntry: IEntry = {
            ...entry,
            status: status,
            description: inputValue
        }

        updateEntry(updatedEntry, true)

        router.push('/')
    }

    return (
        <Layout title={inputValue.substring(0, 20) + '...'} >
            <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader title={`Entry:`} subheader={`Created  ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}>
                        </CardHeader>
                        <CardContent>
                            <TextField sx={{
                                marginTop: 2, marginBottom: 1
                            }}
                                fullWidth placeholder='New Entry' autoFocus multiline label='New Entry'
                                onBlur={() => setTouched(true)}
                                value={inputValue} onChange={onTextFieldChanged} helperText={
                                    isInvalid && 'Add a value'
                                }
                                error={isInvalid}
                            />


                            {/* radio */}
                            <FormControl>
                                <FormLabel>Status</FormLabel>
                                <RadioGroup row value={status}
                                    onChange={onStatusChanged}>
                                    {
                                        validStatus.map(option => (
                                            <FormControlLabel key={option} value={option} control={<Radio />} label={capitalize(option)} />

                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button startIcon={<SaveOutlinedIcon />} variant='contained' fullWidth onClick={onSave} disabled={
                                inputValue.length <= 0
                            }>Save </Button>

                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'red' }}>
                <DeleteForeverOutlinedIcon />
            </IconButton>
        </Layout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string }


    const entry = await dbEntries.getEntryById(id)

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage