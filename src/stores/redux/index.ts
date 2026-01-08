import { configureStore } from "@reduxjs/toolkit"

/**
 * NOTE: store (slice/reducer) imports
 */
import style from "@/stores/redux/style/slice"

export const store = configureStore({
  reducer: {
    style,
  },
})

export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export default {
  store,
}
