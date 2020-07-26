import React, { useEffect, useState } from 'react'
import { SignIn } from './SignIn'
import { Messages } from './Messages'
import firebase from './firebase'
import './App.css'
import { User, UserContext } from './UserProvider'
import { TMessage } from './Message'
import { SendMessage } from './SendMessage'
import { PlaySound } from './PlaySound'

function App(): JSX.Element {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [messages, setMessages] = useState<TMessage[]>([])
  const [latestMessage, setLatestMessage] = useState<string | undefined>()
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // ログイン状態ならuserが取得できる
      console.warn(user)
      if (!user) {
        return
      }
      setUser({
        email: user.email,
        avatar: user.photoURL,
        displayName: user.displayName,
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
        console.log('inside once callback with limited 10')
        const messages = snap.val()
        if (messages !== null) {
          console.log(messages)
          Object.keys(messages).forEach((k: string) => {
            const message = messages[k]
            const m: TMessage = {
              key: k,
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
              name: message.name,
              image: message.image,
              message: message.message,
              created: message.created,
            }
            setMessages((currentMessages) => [...currentMessages, m])
            console.log(message.message)
            setLatestMessage(message.message)
          })
      })
  }, [user])
  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <SignIn />
        <Messages messages={messages} />
        <SendMessage />
        <PlaySound command={latestMessage} />
      </div>
    </UserContext.Provider>
  )
}

export default App
