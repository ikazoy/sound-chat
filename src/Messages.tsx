import React from 'react'
import { Message } from './Message'

export const Messages = (props: { messages: Message[] }): JSX.Element => {
  const { messages } = props
  if (messages.length === 0) {
    return <div />
  }

  const messagesX = messages.map((m) => {
    return <div key={m.created}>{m.message}</div>
  })
  return <div>{messagesX}</div>
}
