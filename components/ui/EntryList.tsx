import { List, Paper } from '@mui/material'
import React, { DragEvent, FC, useContext, useMemo } from 'react'
import { EntryItem } from '.'
import { EntryStatus } from '@/interfaces'
import { EntriesContext } from '@/context/entries'
import { UIContext } from '@/context/ui'

import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

const EntryList: FC<Props> = ({
  status
}) => {
  const { entries, updateEntry } = useContext(EntriesContext)
  const {
    isDragging,
    endDragging
  } = useContext(UIContext)

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])


  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('id')

    const entry = entries.find(e => e._id === id)!;
    entry.status = status;
    updateEntry(entry, false)
    endDragging()
  }

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop}>
      <Paper sx={{
        height: 'calc(100vh - 180px)', overflow: 'scroll',
        backgroundColor: 'transparent',
        padding: '3px 5px'
      }} className={isDragging ? styles.dragging : ''}>
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
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