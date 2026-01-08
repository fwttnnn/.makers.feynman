import { render, screen, act } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"

vi.mock("@/hooks/useAuth", () => ({
  default: () => ({
    user: {id: "..."},
  }),
}))

import store from "@/stores/zustand"
import Task from "@/components/Task"

import { Provider } from "react-redux"
import { store as reduxStore } from "@/stores/redux"

const Redux = {
  Provider,
  store: reduxStore
}

/**
 * 26.2 (testing)
 */
describe("task functionalities (zustand)", () => {
  it("renders task added via zustand store", () => {
    render(
      <Redux.Provider store={Redux.store}>
        <Task />
      </Redux.Provider>
    )

    const task = "Hello, from Vitest!"

    expect(screen.queryByText(task)).toBeNull()
    act(() => store.task.getState().__in_mem_add(task))
    expect(screen.getByText(task)).toBeInTheDocument()
  })
})
