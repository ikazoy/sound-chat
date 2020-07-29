import React from 'react'
import { TMessage, Message } from './Message'
import { Grid } from '@material-ui/core'

export const Messages = (props: { messages: TMessage[] }): JSX.Element => {
  const { messages } = props
  if (messages.length === 0) {
    return <div />
  }

  const messagesX = messages.map((m) => {
    return <Message key={m.key} messageObject={m} />
  })
  return (
    <Grid container direction="column">
      {messagesX}
    </Grid>
  )
}
