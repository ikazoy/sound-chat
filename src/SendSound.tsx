import React from 'react'
import {
  Paper,
  Button,
  Tooltip,
  IconButton,
  Grid,
  withStyles,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core'
import { Info as InfoIcon } from '@material-ui/icons'
import { PlaySound, SoundCommandKey, soundCommandLabelMap } from './PlaySound'
import { sendMessage } from './SendMessage'
import { useUser } from './UserProvider'
import { Send, VolumeUp } from '@material-ui/icons'

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
  const user = useUser()
  const classes = useStyles()
  const delayInMsec = 200
  if (!user) return null

  const playSoundButton = (command: string, label: string) => {
    return (
      <Paper className={classes.paper}>
        {label}
        <VolumeUp
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
        />
        <Send
          onClick={() => {
            setPlaying(false)
            sendMessage({
              createdBy: user.id,
              message: `[[${command}]]`,
              name: user.displayName || undefined,
              image: user.avatar || undefined,
            })
          }}
        />
      </Paper>
    )
  }
  const BigTextTooltip = withStyles({
    tooltip: {
      fontSize: '1em',
    },
  })(Tooltip)
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
          <Grid item xs>
            {(Object.keys(soundCommandLabelMap) as Array<
              keyof typeof soundCommandLabelMap
            >).map((k: SoundCommandKey) => {
              return playSoundButton(k, soundCommandLabelMap[k] as string)
            })}
          </Grid>
        </Grid>
      </div>
      <BigTextTooltip title="しばらくホバーすると送信前に音の確認が出来ます">
        <IconButton aria-label="delete">
          <InfoIcon />
        </IconButton>
      </BigTextTooltip>
    </React.Fragment>
  )
}
