const Header = () => {
  return (
    <header>
      <span>.makers.feynman (to-do list)</span>
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
 * 9.1 (functional)
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
