import React from 'react'
import { TextField, Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { useUser } from './UserProvider'
import firebase from './firebase'

export const SendMessage = (): JSX.Element => {
  const user = useUser()
  const [typedMessage, setTypedMessage] = React.useState<string>('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypedMessage(event.target.value)
  }
  const sendMessage = (m: string) => {
    firebase
      .database()
      .ref('message')
      .push(
        {
          message: m,
          name: user?.displayName,
          image: user?.avatar,
          created: firebase.database.ServerValue.TIMESTAMP,
        },
        () => {
          setTypedMessage('')
        }
      )
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
        onClick={() => sendMessage(typedMessage)}
      >
        Send
      </Button>
    </React.Fragment>
  )
}
