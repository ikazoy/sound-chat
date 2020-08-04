import React from 'react'

type Volume = number
type VolumeContext = {
  volume: Volume
  setVolume?: (v: Volume) => void
}

const initialVolume = 50
const volumeContext = React.createContext<VolumeContext>({
  volume: initialVolume,
})
const volumeKey = 'volume'

type Props = {
  children: React.ReactNode
}

export const VolumeProvider: React.FC<Props> = (props: Props) => {
  const [volume, _setVolume] = React.useState<number>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(volumeKey)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item)[volumeKey] : initialVolume
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialVolume
    }
  })
  const setVolume = (v: Volume) => {
    try {
      _setVolume(v)
      // Save to local storage
      window.localStorage.setItem(volumeKey, JSON.stringify(v))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }
  return (
    <volumeContext.Provider value={{ volume, setVolume }}>
      {props.children}
    </volumeContext.Provider>
  )
}

export const useVolume = (): VolumeContext => {
  const context = React.useContext<VolumeContext>(volumeContext)
  return context
}
