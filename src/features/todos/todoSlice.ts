
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    title: string;
    description?: string;
    deadline?: string;
    status: 'pending' | 'completed' | 'overdue' | 'removed';
}

interface TodosState {
    todos: Todo[];
    trash: Todo[];
}

const initialState: TodosState = {
    todos: [],
    trash: [],
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Omit<Todo, 'id' | 'status'>>) => {
            state.todos.push({
                ...action.payload,
                id: Date.now(),
                status: 'pending',
            });
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
                state.trash.push({ ...todo, status: 'removed' });
            }
        },
        restoreTodo: (state, action: PayloadAction<number>) => {
            const todoIndex = state.trash.findIndex(todo => todo.id === action.payload);
            if (todoIndex !== -1) {
                const restoredTodo = state.trash[todoIndex];
                state.trash.splice(todoIndex, 1);
                state.todos.push({ ...restoredTodo, status: 'pending' });
            }
        },
        permanentDeleteTodo: (state, action: PayloadAction<number>) => {
            state.trash = state.trash.filter(todo => todo.id !== action.payload);
        },
        markAsComplete: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.status = 'completed';
            }
        },
        markAsPending: (state, action: PayloadAction<number>) => { // Add this reducer
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.status = 'pending';
            }
        },
        checkOverdueTasks: (state) => {
            const now = new Date().toISOString();
            state.todos.forEach(todo => {
                if (todo.deadline && todo.status === 'pending' && new Date(todo.deadline) < new Date(now)) {
                    todo.status = 'overdue';
                }
            });
        },
        updateTodo: (state, action: PayloadAction<Todo>) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = { ...state.todos[index], ...action.payload };
            }
        },
    },
});

export const { addTodo, deleteTodo, restoreTodo, permanentDeleteTodo, markAsComplete, markAsPending, checkOverdueTasks, updateTodo } = todosSlice.actions;

export default todosSlice.reducer;

