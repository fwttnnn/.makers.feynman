import useAuth from "@/hooks/useAuth"

import Login from "@/components/Auth/Login"
import Logout from "@/components/Auth/Logout"

const Header = () => {
  const {user} = useAuth()

  return (
    <header>
      <div>
        <span>.makers.feynman (to-do list)</span>
      </div>
      {/**
        * 12.2 (conditional rendering & lists)
        */}
      {user
        && (
          <div>
            <span>welcome back {user?.name.first}!</span>
          </div>
        )}
      <div>
        {/**
          * 12.2 (conditional rendering & lists)
          */}
        {user
          ? <Logout/>
          : <Login />}
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <footer>
      {/* © 2026 fattan */}
    </footer>
  )
}

/**
 * 9.1 (components)
 * 9.2 (props/state)
 */ 
export default ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main
        className="my-4"
      >
        {/**
         * 17.4 (HOC) ver. modern
         */}
        {children}
      </main>
      <Footer />
    </>
  )
}
