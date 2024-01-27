import { List, Paper } from '@mui/material'
import React, { FC, useContext, useMemo } from 'react'
import { EntryItem } from '.'
import { EntryStatus } from '@/interfaces'
import { EntriesContext } from '@/context/entries'

interface Props {
  status: EntryStatus
}

const EntryList: FC<Props> = ({
  status
}) => {
  const { entries } = useContext(EntriesContext)

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])


  return (
    <div>
      <Paper sx={{
        height: 'calc(100vh - 180px)', overflow: 'scroll',
        backgroundColor: 'transparent',
        padding: '3px 5px'
      }}>
        <List sx={{ opacity: 1 }}>
          {
            entriesByStatus.map(entry => (
              <EntryItem key={entry._id} entry={entry} />
            ))
          }
        </List>
      </Paper>
    </div>
  )
}

export default EntryList