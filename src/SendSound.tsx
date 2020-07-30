import React from 'react'
import {
  Grid,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core'
import { PlaySound, SoundCommandKey, soundCommandLabelMap } from './PlaySound'
import { sendMessage } from './SendMessage'
import { useUser } from './UserProvider'
import { VolumeUp } from '@material-ui/icons'
import SendIcon from '@material-ui/icons/Send'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
)

export const SendSound = (): JSX.Element | null => {
  const [sound, setSound] = React.useState<string | undefined>(undefined)
  const [playing, setPlaying] = React.useState<boolean>(false)
  const [delayTimer, setDelayTimer] = React.useState<number>(0)
  const [isThrottled, setThrottled] = React.useState<boolean>(false)
  const user = useUser()
  const classes = useStyles()
  const delayInMsec = 200
  if (!user) return null

  const playSoundButton = (command: string, label: string) => {
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        spacing={1}
        style={{ fontSize: '12px' }}
      >
        <Grid item xs={5}>
          {label}
        </Grid>
        <Grid item xs={2}>
          <IconButton
            size="small"
            onMouseEnter={() => {
              window.clearTimeout(delayTimer)
              const timerId = window.setTimeout(() => {
                setSound(`[[${command}]]`)
                setPlaying(true)
                setDelayTimer(0)
              }, delayInMsec)
              setDelayTimer(timerId)
            }}
            onMouseLeave={() => {
              if (delayTimer > 0) {
                window.clearTimeout(delayTimer)
                setDelayTimer(0)
              }
              setSound(undefined)
              setPlaying(false)
            }}
          >
            <VolumeUp />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            size="small"
            color="primary"
            disabled={isThrottled}
            onClick={() => {
              setPlaying(false)
              sendMessage({
                createdBy: user.id,
                message: `[[${command}]]`,
                name: user.displayName || undefined,
                image: user.avatar || undefined,
              })
              setThrottled(true)
              window.setTimeout(() => {
                setThrottled(false)
              }, 10 * 1000)
            }}
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
      // </Paper>
    )
  }
  return (
    <React.Fragment>
      {/* for preview of sound */}
      <PlaySound
        command={sound}
        status={playing ? 'PLAYING' : 'STOPPED'}
        onFinishedPlaying={() => {
          setPlaying(false)
        }}
      />
      <div className={classes.root}>
        <Grid container direction="row" spacing={1}>
          {(Object.keys(soundCommandLabelMap) as Array<
            keyof typeof soundCommandLabelMap
          >).map((k: SoundCommandKey) => {
            const a = (
              <Grid item xs={6} key={k}>
                {playSoundButton(k, soundCommandLabelMap[k] as string)}
              </Grid>
            )
            return a
          })}
        </Grid>
      </div>
    </React.Fragment>
  )
}
