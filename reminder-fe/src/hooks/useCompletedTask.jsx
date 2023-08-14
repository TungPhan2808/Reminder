import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const useCompletedTask = () => {
   const location = useLocation()

   const completed = useMemo(
      () => (location.pathname === '/completed' ? true : false),
      [location.pathname]
   )

   return completed
}
