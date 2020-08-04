import React from 'react'
import firebase from './firebase'
import {
  Avatar,
  Button,
  AppBar,
  Toolbar,
  Slider,
  Grid,
  CssBaseline,
  IconButton,
  Typography,
} from '@material-ui/core'
import { useUser } from './UserProvider'
import { VolumeUp } from '@material-ui/icons'
// import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useVolume } from './useVolume'
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
    volume: {
      'min-width': 200,
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
      'margin-left': '10px',
    },
    button: {
      'margin-right': '10px',
    },
  })
)

export const SignIn = (): JSX.Element => {
  const user = useUser()
  const classes = useStyles()
  const { volume, setVolume } = useVolume()
  const volumeSlider = (
    <Grid container spacing={1} className={classes.volume}>
      <Grid item>
        <VolumeUp />
      </Grid>
      <Grid item xs={6}>
        <Slider
          color="secondary"
          value={volume}
          onChange={(_event: any, newValue: number | number[]) => {
            setVolume!(newValue as number)
          }}
          aria-labelledby="continuous-slider"
        />
      </Grid>
    </Grid>
  )
  const loginButton = (
    <Button
      variant="contained"
      onClick={() => {
        loginProcess()
      }}
      className={classes.button}
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

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar variant="regular" disableGutters>
          <Grid
            container
            spacing={1}
            justify="space-between"
            alignItems="center"
          >
            <Grid>
              <Typography
                align="left"
                variant="h6"
                className={classes.title}
                noWrap={true}
              >
                Ding Dong Ding
              </Typography>
            </Grid>
            <Grid xs={3}>{volumeSlider}</Grid>
            <Grid>
              <Avatar
                alt={user?.displayName || undefined}
                src={user?.avatar || undefined}
                imgProps={{ referrerPolicy: 'no-referrer' }}
                className={classes.avatar}
                variant="square"
              />
            </Grid>
            <Grid item>
              <IconButton edge="end">{button}</IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
