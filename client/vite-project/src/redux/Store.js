import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../feature/counter/CounterSlice.jsx'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})