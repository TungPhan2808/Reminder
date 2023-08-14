import { useContext } from 'react'
import { AppContext } from './AppProvider'

export const useStore = () => {
  return useContext(AppContext)
}
