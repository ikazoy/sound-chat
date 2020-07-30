import React from 'react'
import firebase from './firebase'
import {
  Avatar,
  Button,
  AppBar,
  Toolbar,
  // Slide,
  CssBaseline,
  IconButton,
  Typography,
} from '@material-ui/core'
import { useUser } from './UserProvider'
// import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
interface Props {
  children: React.ReactElement
}
// function HideOnScroll(props: Props) {
//   const { children } = props
//   const trigger = useScrollTrigger()

//   return (
//     <Slide appear={false} direction="down" in={!trigger}>
//       {children}
//     </Slide>
//   )
// }

const logoutProcess = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.reload()
    })
}

const loginProcess = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase
    .auth()
    .signInWithRedirect(provider)
    .then(function (result) {
      // const token = result.credential.accessToken
      // const user = result.user
      console.log(result)
    })
    .catch(function (error) {
      // const errorCode = error.code
      // const errorMessage = error.message
      // const email = error.email
      // const credential = error.credential
      console.error(error)
    })
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
)

export const SignIn = (): JSX.Element => {
  const user = useUser()
  const classes = useStyles()
  const loginButton = (
    <Button
      variant="contained"
      onClick={() => {
        loginProcess()
      }}
    >
      Login
    </Button>
  )
  const logoutButton = (
    <Button
      variant="contained"
      size="small"
      onClick={() => {
        logoutProcess()
      }}
    >
      Log out
    </Button>
  )
  const button = user ? logoutButton : loginButton
  const signedIn = (
    <React.Fragment>
      <Avatar
        alt={user?.displayName || undefined}
        src={user?.avatar || undefined}
        imgProps={{ referrerPolicy: 'no-referrer' }}
        className={classes.avatar}
        variant="square"
      />
      <IconButton edge="end">{button}</IconButton>
    </React.Fragment>
  )

  // TODO: Sign out
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar variant="regular">
          <Typography variant="h6" className={classes.title}>
            Ding Dong Ding
          </Typography>
          {/* {user ? signedIn : login} */ signedIn}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
