import React from 'react'
import firebase from './firebase'
import Avatar from '@material-ui/core/Avatar'
import { useUser } from './UserProvider'

const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase
    .auth()
    .signInWithRedirect(provider)
    .then(function (result) {
      // const token = result.credential.accessToken
      // const user = result.user
    })
    .catch(function (error) {
      // const errorCode = error.code
      // const errorMessage = error.message
      // const email = error.email
      // const credential = error.credential
    })
}

export const SignIn = (): JSX.Element => {
  const user = useUser()
  return (
    <div>
      <div onClick={onClick}>Login button</div>
      <Avatar
        alt={user?.displayName || undefined}
        src={user?.avatar || undefined}
      />
    </div>
  )
}
