/* eslint-disable no-case-declarations */
import { SET_USER, LOG_OUT, SET_TODO_LIST } from './constants'

export const reducer = (state, action) => {
   switch (action.type) {
      case SET_USER:
         return {
            ...state,
            user: action.payload,
         }
      case SET_TODO_LIST:
         return {
            ...state,
            todoList: action.payload,
         }
      default:
         break
   }
}
