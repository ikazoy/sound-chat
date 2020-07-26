import React from 'react'
import { useUser, User } from './UserProvider'
import { Avatar, Grid } from '@material-ui/core'
import styled from 'styled-components'

const isMyMessage = (message: TMessage, user: User): boolean => {
  console.log(message)
  console.log(user)
  return message.name === user.displayName
}

export const Message = (props: { messageObject: TMessage }): JSX.Element => {
  const user = useUser()
  const { key, image, message } = props.messageObject

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
      <Avatar alt={message || undefined} src={image || undefined} />
      <MessageString key={key}>{message}</MessageString>
    </Grid>
  )
}

// const Wrapper = styled.Grid``

const MessageString = styled.span`
  margin: 10px;
`

export type TMessage = {
  key?: string
  name: string
  image: string
  message: string
  created: number
}
