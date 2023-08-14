/* eslint-disable react/prop-types */
import SideBar from '../components/SideBar'
import TodoList from '../components/TodoList'
import { useCompletedTask } from '../hooks/useCompletedTask'
import { useStore } from '../store/useStore'
import { useEffect, useState } from 'react'

function TodoListContainer() {
   const dispatch = useStore()[1]
   const fetchTasks = useStore()[2]
   const [modalValue, setModalValue] = useState({})
   const completedStatus = useCompletedTask()

   useEffect(() => {
      fetchTasks(completedStatus)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch, completedStatus])

   return (
      <div className="app">
         <div className="content-box">
            <SideBar />
            <div className="container-content">
               <TodoList
                  modalValue={modalValue}
                  setModalValue={setModalValue}
               />
            </div>
         </div>
      </div>
   )
}

export default TodoListContainer
