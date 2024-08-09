import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todoItems:[
        {
            id:1,
            name:"Hello"
        },
        {
            id:2,
            name:'RRR'
        }
    ],
    input:''
}

export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo:(state,action) => {
            state.todoItems.push(action.payload)
        },
        handleInput:(state,action) => {
            state.input = action.payload
        }
    }
})

export const {addTodo,handleInput} = todoSlice.actions
export default todoSlice.reducer