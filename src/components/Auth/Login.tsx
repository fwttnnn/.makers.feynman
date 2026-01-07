import useAuth from "@/hooks/useAuth"
import { useState } from "react"

import type { User } from "@/contexts/Auth"

export default () => {
  /**
   * 31.1 (custom hooks)
   * 12.3 (forms & controlled components)
   */
  const {err, login} = useAuth()
  const [user, setUser] = useState<Omit<User, "id">>({
    name: {
      first: "",
      last: "",
    },
  })

  const capitalizeFirstLetter = (val: string) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    /**
     * 12.2 (conditional rendering & lists)
     * 12.3 (forms & controlled components)
     */
    <>
      {err && (
        <span>
          {err}
        </span>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          login(user)
        }}
      >
        <input
          value={user.name.first}
          onChange={(e) => setUser((prev) => ({
            ...prev,
            name: {
              ...prev.name,
              first: capitalizeFirstLetter(e.target.value.split(" ")[0]),
            },
          }))}
          placeholder="Your first name"
        />
        <input
          value={user.name.last}
          onChange={(e) => setUser((prev) => ({
            ...prev,
            name: {
              ...prev.name,
              last: capitalizeFirstLetter(e.target.value.split(" ")[0]),
            },
          }))}
          placeholder="Your last name"
        />
        <button
          type="submit"
          className="underline decoration-wavy"
        >
          Login
        </button>
      </form>
    </>
  )
}
