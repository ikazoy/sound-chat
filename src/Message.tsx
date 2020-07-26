import React from 'react'
import { useUser, User } from './UserProvider'
import { Avatar, Grid, Tooltip } from '@material-ui/core'
import styled from 'styled-components'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { soundCommandToLabel } from './PlaySound'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
)

const isMyMessage = (message: TMessage, user: User): boolean => {
  return message.createdBy === user.id
}

const messageConverter = (message: string): string => {
  const label = soundCommandToLabel(message)
  return label ? `🎶 ${label}` : message
}

export const Message = (props: { messageObject: TMessage }): JSX.Element => {
  const user = useUser()
  const classes = useStyles()
  const { key, image, message, name } = props.messageObject

  return (
    <Grid
      container
      justify={
        user && isMyMessage(props.messageObject, user)
          ? 'flex-end'
          : 'flex-start'
      }
      direction="row"
      alignItems="center"
    >
      <Tooltip title={name || ''}>
        <Avatar
          alt={name || undefined}
          src={image || undefined}
          className={classes.small}
          imgProps={{ referrerPolicy: 'no-referrer' }}
        />
      </Tooltip>
      <MessageString key={key}>{messageConverter(message)}</MessageString>
    </Grid>
  )
}

const MessageString = styled.span`
  margin: 10px;
`

export type TMessage = {
  key?: string
  name?: string
  createdBy: string
  image?: string
  message: string
  created: number
}
