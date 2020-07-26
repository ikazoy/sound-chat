import React from 'react'
import Sound, { ReactSoundProps } from 'react-sound'
/* eslint @typescript-eslint/no-var-requires: 0 */
const Clap = require('./assets/audio/拍手と歓声.mp3')
const Ou = require('./assets/audio/mens-ou1.mp3')
const Yeah = require('./assets/audio/イエーイ.mp3')
const ListenToMe = require('./assets/audio/俺の話を聞け.mp3')
const WhatTime = require('./assets/audio/いま何時？.mp3')
const Dora = require('./assets/audio/ドラ.mp3')
const Guts = require('./assets/audio/ガッツだぜ.mp3')
const Zannen = require('./assets/audio/残念.mp3')

export type SoundCommandKey =
  | 'clap'
  | 'yeah'
  | 'listenToMe'
  | 'ou'
  | 'whatTime'
  | 'dora'
  | 'guts'
  | 'zannen'

export const soundCommandLabelMap: { [key in SoundCommandKey]?: string } = {
  clap: '拍手',
  yeah: 'イエーイ',
  ou: 'オゥ!',
  dora: 'ドラ',
  listenToMe: '俺の話を聞け',
  guts: 'ガッツだぜ',
  whatTime: '今何時',
}
const soundCommandModuleMap: { [K in SoundCommandKey]?: any } = {
  clap: Clap,
  yeah: Yeah,
  ou: Ou,
  listenToMe: ListenToMe,
  whatTime: WhatTime,
  dora: Dora,
  guts: Guts,
  zannen: Zannen,
}

export const isSoundCommand = (str: string): str is SoundCommandKey => {
  return Object.keys(soundCommandModuleMap).findIndex((k) => k === str) !== -1
}

const extractSoundCommandFromString = (str: string) => {
  const regexp = new RegExp(/^\[\[(\w+)\]\]$/)
  const matched = str.match(regexp)
  if (!matched) return null
  const soundCommand = matched[1]
  return isSoundCommand(soundCommand) ? soundCommand : null
}

export const soundCommandToLabel = (str: string) => {
  const extracted = extractSoundCommandFromString(str)
  return extracted ? soundCommandLabelMap[extracted] : null
}

export const soundCommandToModule = (
  str: string | undefined
): string | null => {
  if (str === undefined) return null
  const extracted = extractSoundCommandFromString(str)
  return extracted ? soundCommandModuleMap[extracted] : null
}

export const PlaySound = (props: {
  command?: string
  status?: ReactSoundProps['playStatus']
  onFinishedPlaying?: () => void
}): JSX.Element => {
  const { command, status, onFinishedPlaying } = props
  const sound = soundCommandToModule(command)
  /* eslint @typescript-eslint/no-empty-function: 0 */
  const defaultOnFinished = () => {}
  return (
    <Sound
      url={sound || ''}
      playStatus={status || 'PLAYING'}
      onFinishedPlaying={onFinishedPlaying || defaultOnFinished}
    ></Sound>
  )
}
