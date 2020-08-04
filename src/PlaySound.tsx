import React from 'react'
import Sound, { ReactSoundProps } from 'react-sound'
import { useVolume } from './useVolume'
/* eslint @typescript-eslint/no-var-requires: 0 */
const Ou = require('./assets/audio/mens-ou1.mp3')
const Arigatou = require('./assets/audio/ありがとうございます.mp3')
const Yeah = require('./assets/audio/イエーイ.mp3')
const WhatTime = require('./assets/audio/いま何時？.mp3')
const Guts = require('./assets/audio/ガッツだぜ.mp3')
const SingleBed = require('./assets/audio/シングルベッド.mp3')
const Dora = require('./assets/audio/ドラ.mp3')
const Drum = require('./assets/audio/ドラムロール.mp3')
const Boo = require('./assets/audio/ブーイング.mp3')
const Howan = require('./assets/audio/ほわんほわんほわん.mp3')
const ListenToMe = require('./assets/audio/俺の話を聞け.mp3')
const Zannen = require('./assets/audio/残念.mp3')
const Clap = require('./assets/audio/拍手と歓声.mp3')
const Relieved = require('./assets/audio/本当によかった.mp3')

export type SoundCommandKey =
  | 'ou'
  | 'arigatou'
  | 'yeah'
  | 'whatTime'
  | 'guts'
  | 'singleBed'
  | 'dora'
  | 'drum'
  | 'boo'
  | 'howan'
  | 'listenToMe'
  | 'zannen'
  | 'clap'
  | 'relieved'

export const soundCommandLabelMap: { [key in SoundCommandKey]?: string } = {
  ou: 'オゥ!',
  arigatou: 'ありがとう',
  yeah: 'イエーイ',
  whatTime: '今何時',
  guts: 'ガッツだぜ',
  singleBed: 'シングルベッド',
  dora: 'ドラ',
  drum: 'ドラムロール',
  boo: 'ブーイング',
  howan: 'ほわんほわん',
  listenToMe: '俺の話を聞け',
  zannen: 'ざんねん',
  clap: '拍手',
  relieved: '本当に良かった',
}
const soundCommandModuleMap: { [K in SoundCommandKey]?: any } = {
  ou: Ou,
  arigatou: Arigatou,
  yeah: Yeah,
  whatTime: WhatTime,
  guts: Guts,
  singleBed: SingleBed,
  dora: Dora,
  drum: Drum,
  boo: Boo,
  howan: Howan,
  listenToMe: ListenToMe,
  zannen: Zannen,
  clap: Clap,
  relieved: Relieved,
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
  const { volume } = useVolume()
  const sound = soundCommandToModule(command)
  /* eslint @typescript-eslint/no-empty-function: 0 */
  const defaultOnFinished = () => {}
  return (
    <Sound
      url={sound || ''}
      playStatus={status || 'PLAYING'}
      onFinishedPlaying={onFinishedPlaying || defaultOnFinished}
      volume={volume}
    ></Sound>
  )
}
