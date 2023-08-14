import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import TodoListContainer from './components/TodoListContainer'
import Login from './components/Login'
import { useEffect } from 'react'
import { useStore } from './store/useStore'
import { SET_USER } from './store/constants'
import { http } from './utils/http'
import { enqueueSnackbar } from 'notistack'

function App() {
   const dispatch = useStore()[1]
   const navigate = useNavigate()

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const data = await http('/auth/login/success', 'GET')
            dispatch({ type: SET_USER, payload: data.data })
         } catch (error) {
            navigate('/login', { replace: true })
            enqueueSnackbar('Login failed!', { variant: 'error' })
         }
      }

      fetchUser()
   }, [dispatch, navigate])

   return (
      <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/completed?" element={<TodoListContainer />} />
      </Routes>
   )
}

export default App
