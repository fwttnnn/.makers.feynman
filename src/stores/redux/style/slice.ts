import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Style = "round"
                  | "block"

/**
 * 22.1 (redux core concepts)
 * 22.2 (redux toolkit)
 */
export const slice = createSlice({
  name: "style",
  initialState: ("round" as Style),
  reducers: {
    change: (style: Style, action: PayloadAction<Style>) => {
      style = action.payload
      return style
    }
  }
})

export const { change } = slice.actions
export default slice.reducer
