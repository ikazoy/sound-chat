import React from 'react'
import { TextField, Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { useUser } from './UserProvider'
import { TMessage } from './Message'
import firebase from './firebase'

export const sendMessage = (message: Omit<TMessage, 'created'>): void => {
  firebase
    .database()
    .ref('message')
    .push({
      ...message,
      created: firebase.database.ServerValue.TIMESTAMP as number,
    })
}

export const SendMessage = (): JSX.Element | null => {
  const user = useUser()
  const [typedMessage, setTypedMessage] = React.useState<string>('')
  if (!user) return null
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypedMessage(event.target.value)
  }
  return (
    <React.Fragment>
      <form autoComplete="off">
        <TextField
          value={typedMessage}
          onChange={handleChange}
          disabled={!user}
          placeholder="type your message here"
          fullWidth
        />
      </form>

      <Button
        variant="contained"
        color="primary"
        endIcon={<SendIcon>send</SendIcon>}
        onClick={() => {
          sendMessage({
            message: typedMessage,
            name: user.displayName || undefined,
            image: user.avatar || undefined,
          })
        }}
      >
        Send
      </Button>
    </React.Fragment>
  )
}
