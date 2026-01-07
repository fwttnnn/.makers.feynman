import useAuth from "@/hooks/useAuth"

export default () => {
  /**
   * 31.1 (custom hooks)
   */
  const {logout} = useAuth()

  return (
    <>
      {/**
        * 12.3 (forms & controlled components)
        */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          logout()
        }}
      >
        <button
          type="submit"
          className="underline decoration-wavy"
        >
          Logout
        </button>
      </form>
    </>
  )
}
