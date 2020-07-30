import React from 'react'
import { TMessage, Message } from './Message'
import { Grid, Paper } from '@material-ui/core'

export const Messages = (props: { messages: TMessage[] }): JSX.Element => {
  const { messages } = props
  const messagesEndRef = React.useRef<HTMLInputElement>(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  React.useEffect(scrollToBottom, [messages])

  if (messages.length === 0) {
    return <div />
  }

  const messagesX = messages.map((m) => {
    return <Message key={m.key} messageObject={m} />
  })
  return (
    <Paper style={{ height: '50vh', overflow: 'hidden auto' }}>
      <Grid container direction="column">
        {messagesX}
      </Grid>
      <div ref={messagesEndRef} />
    </Paper>
  )
}
