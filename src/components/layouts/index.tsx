const Header = () => {
  return (
    <header>
      <span>.makers.feyman (to-do list)</span>
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
 * 9.2 (props)
 */ 
export default ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main
        className="my-4"
      >
        {children}
      </main>
      <Footer />
    </>
  )
}
