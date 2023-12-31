import { createContext, useReducer } from "react";

export const TodoContext = createContext();
export const TodoReducer = (state, action) => {
    switch(action.type){
        case 'SET_TODO':
            return {
                todos: action.payload
            }
        case 'CREATE_TODO':
            return { 
                todos: [action.payload, ...state.todos]
            }
        case 'DELETE_TODO':
            return{
                todos: state.todos.filter((t)=> t._id !== action.payload._id)
            }
            case 'UPDATE_TODO':
                const updatedTodo = action.payload;
                const updatedTodos = state.todos.map((todo) =>
                  todo._id === updatedTodo._id ? updatedTodo : todo
                );
                return {
                  ...state,
                  todos: updatedTodos
                };
        default:
            return state
    }
}
export const TodoContextProvider = ({children}) =>{
    
    const [state, dispatch] = useReducer(TodoReducer,{
        todos: null
    })
    
    
    return(
        <TodoContext.Provider value={{...state, dispatch}}>
            { children }
        </TodoContext.Provider>
    )
}