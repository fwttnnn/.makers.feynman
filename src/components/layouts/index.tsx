import "@/components/layouts/index.css"

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
      © 2026 fattan
    </footer>
  )
}

/**
 * 9.1 (functional)
 */ 
export default ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}
