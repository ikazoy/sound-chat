import React from 'react'
import { Grid, TextField, IconButton } from '@material-ui/core'
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
    <Grid container>
      <Grid item xs={10}>
        <form autoComplete="off">
          <TextField
            variant="outlined"
            value={typedMessage}
            onChange={handleChange}
            disabled={!user}
            placeholder="type your message here"
            fullWidth
            onKeyPress={(ev) => {
              if (ev.key !== 'Enter') return
              ev.preventDefault()
              sendMessage({
                createdBy: user.id,
                message: typedMessage,
                name: user.displayName || undefined,
                image: user.avatar || undefined,
              })
              setTypedMessage('')
            }}
          />
        </form>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          color="primary"
          onClick={() => {
            sendMessage({
              createdBy: user.id,
              message: typedMessage,
              name: user.displayName || undefined,
              image: user.avatar || undefined,
            })
            setTypedMessage('')
          }}
        >
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}
