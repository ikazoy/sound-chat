import React from 'react'
import { useUser, User } from './UserProvider'
import { Avatar, Grid, Tooltip } from '@material-ui/core'
import styled from 'styled-components'
import { soundCommandToLabel } from './PlaySound'
// import moment from 'moment'
import moment from 'moment-timezone'

const isMyMessage = (message: TMessage, user: User): boolean => {
  return message.createdBy === user.id
}

const messageConverter = (message: string): string => {
  const label = soundCommandToLabel(message)
  return label ? `✨ ${label} ✨` : message
}

const dateConverter = (unixTimestamp: number): string => {
  return moment
    .unix(unixTimestamp / 1000)
    .tz('Asia/Tokyo')
    .format('h:mm A')
}

export const Message = (props: { messageObject: TMessage }): JSX.Element => {
  const user = useUser()
  const { key, image, message, name, created } = props.messageObject
  const isMine = user && isMyMessage(props.messageObject, user)
  const align = isMine ? 'right' : 'left'
  const MessageString = styled.span`
    margin-top: 5px;
    text-align: ${align};
  `
  const DateString = styled.span`
    text-align: ${align};
  `

  return (
    <Grid
      container
      justify="flex-start"
      direction={isMine ? 'row-reverse' : 'row'}
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <Tooltip title={name || ''}>
          <Avatar
            alt={name || undefined}
            src={image || undefined}
            imgProps={{ referrerPolicy: 'no-referrer' }}
            variant="square"
          />
        </Tooltip>
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <DateString key={key}>{dateConverter(created)}</DateString>
          <MessageString key={key}>{messageConverter(message)}</MessageString>
        </Grid>
      </Grid>
    </Grid>
  )
}

export type TMessage = {
  key?: string
  name?: string
  createdBy: string
  image?: string
  message: string
  created: number
}
