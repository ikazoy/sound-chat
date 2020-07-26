import React from 'react'
import {
  ButtonGroup,
  Button,
  Tooltip,
  IconButton,
  withStyles,
} from '@material-ui/core'
import { Info as InfoIcon } from '@material-ui/icons'
import { PlaySound, SoundCommandKey, soundCommandLabelMap } from './PlaySound'
import { sendMessage } from './SendMessage'
import { useUser } from './UserProvider'

export const SendSound = (): JSX.Element | null => {
  const [sound, setSound] = React.useState<string | undefined>(undefined)
  const [playing, setPlaying] = React.useState<boolean>(false)
  const [delayTimer, setDelayTimer] = React.useState<number>(0)
  const user = useUser()
  const delayInMsec = 500
  if (!user) return null
  const playSoundButton = (command: string, label: string) => {
    return (
      <Button
        key={label}
        onClick={() => {
          setPlaying(false)
          sendMessage({
            createdBy: user.id,
            message: `[[${command}]]`,
            name: user.displayName || undefined,
            image: user.avatar || undefined,
          })
        }}
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
        🎶 {label}
      </Button>
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
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        {(Object.keys(soundCommandLabelMap) as Array<
          keyof typeof soundCommandLabelMap
        >).map((k: SoundCommandKey) => {
          return playSoundButton(k, soundCommandLabelMap[k] as string)
        })}
      </ButtonGroup>
      <BigTextTooltip title="しばらくホバーすると送信前に音の確認が出来ます">
        <IconButton aria-label="delete">
          <InfoIcon />
        </IconButton>
      </BigTextTooltip>
    </React.Fragment>
  )
}
