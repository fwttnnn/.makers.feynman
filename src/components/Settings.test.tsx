import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"

import Settings from "@/components/Settings"
import styles from "@/stores/redux/style/constants"

import { Provider } from "react-redux"
import { store } from "@/stores/redux"

const Redux = {
  Provider,
  store
}

/**
 * 26.2 (testing)
 */
describe("every settings option should be rendered", () => {
  it("should render all options", () => {
    render(
      <Redux.Provider store={Redux.store}>
        <Settings />
      </Redux.Provider>
    )

    for (const style in styles) {
      const capitalized = style[0].toUpperCase()
      expect(screen.getByText(capitalized)).toBeInTheDocument()
    }
  })
})
