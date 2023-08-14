export const initialValue = {
   user: {},
   todoList: [],
}

const SET_USER = 'SET_USER'
const LOG_OUT = 'LOG_OUT'
const SET_TODO_LIST = 'SET_TODO_LIST'

export const styleModal = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 600,
   bgcolor: 'background.paper',
   border: 'none',
   boxShadow: 24,
   p: 4,
}

export { SET_USER, LOG_OUT, SET_TODO_LIST }
