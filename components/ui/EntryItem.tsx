import { UIContext } from '@/context/ui'
import { IEntry } from '@/interfaces'
import { dateFunctions } from '@/utils'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/router'
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

  const router = useRouter()

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('id', entry._id)
    startDragging()

  }

  const onDragEnd = () => {
    endDragging()
  }

  const onClick = () => {
    router.push(`/entries/${entry._id}`)
  }


  return (
    <Card sx={{ marginBottom: 1 }} draggable onDragStart={onDragStart} onDragEnd={onDragEnd} onClick={onClick}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'> {dateFunctions.getFormatDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
