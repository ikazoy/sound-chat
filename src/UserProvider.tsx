import React from 'react'

export type User = {
  email: string | null
  avatar: string | null
  displayName: string | null
}

export const UserContext = React.createContext<User | undefined>(undefined)

export const useUser = (): User | undefined => {
  const context = React.useContext<User | undefined>(UserContext)
  // if (context === undefined) {
  //   throw new Error('useUserContext must be used within a UserProvider')
  // }
  return context
}
