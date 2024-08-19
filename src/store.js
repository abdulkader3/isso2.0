import { configureStore } from '@reduxjs/toolkit'
import redux from './Slices/Redux'
export default configureStore({
  reducer: {
    prity: redux,
  },
})
