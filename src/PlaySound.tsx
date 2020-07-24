import React from 'react'
import Sound from 'react-sound'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Clap = require('./assets/audio/mens-ou1.mp3')

type SoundCommandKey = 'clap'
const soundCommandKeys: SoundCommandKey[] = ['clap']
const soundCommandModuleMap: { [K in SoundCommandKey]: any } = {
  clap: Clap,
}

const isSoundCommand = (str: string): str is SoundCommandKey => {
  return soundCommandKeys.findIndex((k) => k === str) !== -1
}

export const soundCommandToModule = (
  str: string | undefined
): string | null => {
  if (str === undefined) return null
  const regexp = new RegExp(/^\[\[(\w+)\]\]$/)
  const matched = str.match(regexp)
  if (!matched) return null
  const soundCommand = matched[1]
  return isSoundCommand(soundCommand)
    ? soundCommandModuleMap[soundCommand]
    : null
}

const useAudio = (url: string): [boolean, () => void] => {
  console.log(url)
  const [audio] = React.useState<HTMLAudioElement | null>(new Audio(url))
  console.log(audio)
  // const [playing, setPlaying] = React.useState(false)
  const [playing, setPlaying] = React.useState(false)
  const toggle = () => setPlaying(!playing)

  React.useEffect(() => {
    console.log(playing, audio)
    if (playing) {
      audio
        ?.play()
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      audio?.pause()
    }
    // }, [audio, playing])
  })

  React.useEffect(() => {
    audio?.addEventListener('ended', () => setPlaying(false))
    return () => {
      audio?.removeEventListener('ended', () => setPlaying(false))
    }
    // }, [audio])
  })

  return [playing, toggle]
}

export const PlaySound = (props: { command?: string }) => {
  const { command } = props
  const sound = soundCommandToModule(command)
  // console.log(sound)
  // const [playing, toggle] = useAudio(sound || '')
  // console.log(playing)
  // return <div onClick={() => toggle()}>a</div>
  return <Sound url={sound || ''} playStatus="PLAYING"></Sound>
}
