import { createContext, useReducer } from 'react'
import { reducer } from './reducer'
import { initialValue, SET_TODO_LIST } from './constants'
import { http } from '../utils/http'

export const AppContext = createContext(initialValue)

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialValue)

   const fetchTasks = async completed => {
      try {
         const data = await http('/tasks', 'GET', {
            params: {
               completed,
            },
         })
         dispatch({ type: SET_TODO_LIST, payload: data.data.tasks })
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <AppContext.Provider value={[state, dispatch, fetchTasks]}>
         {children}
      </AppContext.Provider>
   )
}

export default AppProvider
