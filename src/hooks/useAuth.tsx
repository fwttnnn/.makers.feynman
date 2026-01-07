import { useContext } from "react"
import Auth from "@/contexts/Auth"

/**
 * 31.1 (custom hooks)
 */
export default () => {
  const context = useContext(Auth.Context)
  if (!context) throw new Error("component `Auth.Provider` is not deployed")

  return context
}
