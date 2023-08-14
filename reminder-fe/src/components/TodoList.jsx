/* eslint-disable react/prop-types */
import DateCard from './DateCard'
import { useStore } from '../store/useStore'

function TodoList({ modalValue, setModalValue }) {
   const state = useStore()[0]
   const { todoList } = state
   console.log('render TodoList: ', todoList)

   return (
      <div className="todo-list">
         {todoList?.map(task => {
            const { date, tasks } = task
            return (
               <DateCard
                  key={date}
                  listInDate={tasks}
                  date={date}
                  modalValue={modalValue}
                  setModalValue={setModalValue}
               />
            )
         })}
      </div>
   )
}

export default TodoList
