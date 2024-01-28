import { UIContext } from '@/context/ui'
import { IEntry } from '@/interfaces'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import React, { DragEvent, FC, useContext } from 'react'

interface Props {
  entry: IEntry
}

export const EntryItem: FC<Props> = ({
  entry
}) => {

  const {
    startDragging,
    endDragging,

  } = useContext(UIContext)

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('id', entry._id)
    startDragging()

  }

  const onDragEnd = () => {
    endDragging()
  }


  return (
    <Card sx={{ marginBottom: 1 }} draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>Hace minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
