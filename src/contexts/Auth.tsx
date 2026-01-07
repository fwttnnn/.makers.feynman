import { createContext, useEffect, useState } from "react"

export type User = {
  id: string,
  name: {
    first: string,
    last: string,
  },
}

export type AuthContext = {
  err: string,
  user: User | null,
  login:  (user: Omit<User, "id">) => boolean,
  logout: ()                       => boolean,
}

/**
 * 17.1 (Context API)
 */
export const Context = createContext<AuthContext | null>(null)

export const Provider = ({ children }: {children: React.ReactNode}) => {
  const [err, setErr] = useState<string>("")
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const data = localStorage.getItem(".makers.feynman/user")
    if (!data) return

    setUser((_) => JSON.parse(data))
  }, [])

  const login = (user: Omit<User, "id">): boolean => {
    if (user.name.first.length < 3) {
      setErr("first name must have at least 3 or more characters")
      return false
    }

    if (user.name.last.length < 3) {
      setErr("last name must have at least 3 or more characters")
      return false
    }

    /**
     * NOTE: disini harusnya juga cek simbol (+ - * &)
     *       tapi karena cuma dummy, jadi kita skip
     */
    if (user.name.first.includes(" ")) {
      setErr("first name must not include spaces")
      return false
    }

    if (user.name.last.includes(" ")) {
      setErr("last name must not include spaces")
      return false
    }

    const _user: User = {
      id: crypto.randomUUID(),
      ...user
    }

    localStorage.setItem(".makers.feynman/user", JSON.stringify(_user))
    setUser(_user)
    return true
  }

  const logout = (): boolean => {
    localStorage.removeItem(".makers.feynman/user")
    setUser(null)
    return true
  }

  return (
    /**
     * 17.1 (Context API)
     */
    <Context.Provider value={{ err, user, login, logout }}>
      {children}
    </Context.Provider>
  )
}

export default {
  Provider,
  Context,
}
