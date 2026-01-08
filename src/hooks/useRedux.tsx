import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import type { State, Dispatch } from "@/stores/redux"

export default () => {
  /**
   * NOTE: redefine `useSelector()`
   */
  const selector: TypedUseSelectorHook<State> = useSelector

  /**
   * 22.2 (redux toolkit)
   */
  return {
    dispatch: useDispatch<Dispatch>(),
    style: selector((state) => state.style)
  }
}
