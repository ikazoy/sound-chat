import React, { useEffect, useState } from 'react'
import { SignIn } from './SignIn'
import { Messages } from './Messages'
import firebase from './firebase'
import './App.css'
import { User, UserContext } from './UserProvider'
import { TMessage } from './Message'
import { SendMessage } from './SendMessage'
import { PlaySound } from './PlaySound'
import { SendSound } from './SendSound'
import { Divider } from '@material-ui/core'

function App(): JSX.Element {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [messages, setMessages] = useState<TMessage[]>([])
  const [latestMessage, setLatestMessage] = useState<string | undefined>()
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        return
      }
      setUser({
        email: user.email,
        avatar: user.photoURL,
        displayName: user.displayName,
        id: user.uid,
      })
    })
  }, [])

  useEffect(() => {
    if (!user) return
    let latestCreated = 0
    firebase
      .database()
      .ref('message')
      // すでに投稿済みのメッセージを取得
      .limitToLast(10)
      .once('value', (snap) => {
        const messages = snap.val() as { [key: string]: TMessage }
        if (messages !== null) {
          Object.keys(messages).forEach((k) => {
            const message = messages[k]
            const m: TMessage = {
              key: k,
              createdBy: message.createdBy,
              name: message.name,
              image: message.image,
              message: message.message,
              created: message.created,
            }
            setMessages((currentMessages) => [...currentMessages, m])
            latestCreated =
              latestCreated === null || latestCreated < m.created
                ? m.created
                : latestCreated
          })
        }
        // 新規投稿分を取得
        snap.ref
          .orderByChild('created')
          .startAt(latestCreated + 1)
          .on('child_added', (snap) => {
            const message = snap.val()
            const m: TMessage = {
              key: snap.key!,
              createdBy: message.createdBy,
              name: message.name,
              image: message.image,
              message: message.message,
              created: message.created,
            }
            setMessages((currentMessages) => [...currentMessages, m])
            setLatestMessage(message.message)
          })
      })
  }, [user])
  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <SignIn />
        {user && (
          <React.Fragment>
            <Messages messages={messages} />
            <Divider />
            <SendSound />
            <SendMessage />
            <PlaySound command={latestMessage} />
          </React.Fragment>
        )}
      </div>
    </UserContext.Provider>
  )
}

export default App
