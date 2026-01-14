import useAuth from "@/hooks/useAuth"

import Login from "@/components/Auth/Login"
import Logout from "@/components/Auth/Logout"

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"

const queryClient = new QueryClient()

const Header = () => {
  const {user} = useAuth()

  return (
    <header>
      <div>
        <span>.makers.feynman</span>
      </div>
      {/**
        * 12.2 (conditional rendering & lists)
        */}
      {user
        && (
          <div>
            <span>welcome back, {user?.name.first}!</span>
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
  /**
   * 22.4 (server/async)
   */
  const { error, data } = useQuery({
    queryKey: ["repo"],
    queryFn: () =>
      fetch("https://api.github.com/repos/fwttnnn/.makers.feynman").then((res) =>
        res.json(),
      ),
  })

  /**
   * 12.2 (conditional rendering & lists)
   */
  if (error) return "an error has occurred: " + error.message

  return (
    <footer
      className="border-t py-3 my-4"
    >
      <p>
        about the app: {data?.description}
      </p>
      <p>
        © {(new Date(data?.updated_at)).getFullYear() || ""} {data?.owner?.login}
      </p>
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
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </>
  )
}
