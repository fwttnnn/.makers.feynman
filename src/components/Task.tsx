import store from "@/stores/zustand"
import type { Task, Label } from "@/stores/zustand/task"

import useAuth from "@/hooks/useAuth"
import useRedux from "@/hooks/useRedux"

import styles from "@/stores/redux/style/constants"

import { useLayoutEffect, useReducer, useRef } from "react"
import gsap from "gsap"
import db from "@/database"

import { FiPlus,
         FiFilter,
         FiTrash,
         FiEdit2 } from "react-icons/fi"

export default () => {
  /**
   * 22.3 (zustand)
   * 31.1 (custom hooks)
   */
  const tasks = store.task((s) => s.tasks)
  const {user} = useAuth()

  console.log(tasks)

  /**
   * 12.2 (conditional rendering & lists)
   */
  if (!user) return <></>

  return (
    <>
      <Toolbar />
      <List tasks={tasks} />
    </>
  )
}

const Toolbar = () => {
  type Menu =
  | "NONE"
  | "TASK/ADD"
  | "SORT/UPDATE"

  type State = {
    menu: Menu
  }

  type Action =
  | { type: "NONE" }
  | { type: "TASK/ADD" }
  | { type: "SORT/UPDATE" }

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "NONE":
      case "TASK/ADD":
      case "SORT/UPDATE":
        return {
          ...state,
          menu: (state.menu !== action.type
                  ? action.type
                  : "NONE")
        }

      default: {
        return state
      }
    }
  }

  /**
   * 17.2 (hooks deep dive)
   * 22.3 (zustand)
   * 26.5 (zustand global state)
   */
  const [state, dispatch] = useReducer(reducer, { menu: "NONE" })
  const tasks = store.task()

  return (
    <div>
      <div>
        <button
          onClick={() => {
            dispatch({ type: "TASK/ADD" })
          }}
        >
          <FiPlus />
        </button>
        <button
          onClick={() => {
            dispatch({ type: "SORT/UPDATE" })
          }}
        >
          <FiFilter />
        </button>
      </div>
      <div>
        {state.menu === "TASK/ADD" && (
          <form
            onSubmit={async (e) => {
              e.preventDefault()

              const form = e.currentTarget
              const data = new FormData(form)

              let title = data.get("--form-title")
              if (typeof title !== "string") return

              title = title.trim()
              if (!title) return

              await tasks.add(title)
              form.reset()
            }}
          >
            <input
              type="text"
              name="--form-title"
              placeholder="Title"
            />
            <button
              type="submit"
              className="underline decoration-wavy"
            >
              OK
            </button>
          </form>
        )}
        {state.menu === "SORT/UPDATE" && (
          <>
            <button
              onClick={() => {
                tasks.sort()
              }}
              className="underline decoration-wavy"
            >
              by title
            </button>
          </>
        )}
      </div>
    </div>
  )
}

/**
 * 9.2 (props/state)
 */ 
const Item = ({ task }: { task: Task }) => {
  /**
   * 12.1 (lifecycle/hooks)
   */
  const {style} = useRedux()
  const root = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  const tasks = store.task()

  /**
   * 12.1 (lifecycle/hooks)
   */
  useLayoutEffect(() => {
    if (!buttonsRef.current) return

    const ctx = gsap.context(() => {
      gsap.set(buttonsRef.current, {
        x: 22.5,
        opacity: 0,
      })
    }, root)

    return () => {
      ctx.revert()
    }
  }, [])

  const onEnter = () => {
    gsap.to(buttonsRef.current, {
      x: 45,
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    })
  }

  const onLeave = () => {
    gsap.to(buttonsRef.current, {
      x: 22.5,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      overwrite: "auto",
    })
  }

  return (
    /**
     * 26.4 (tailwind)
     * 9.3 (event handling)
     */
    <div className="py-1 my-1">
      <div
        ref={root}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="relative flex items-center justify-between gap-2"
      >
        <div
          className="flex gap-2"
        >
          <div>
            <span
                className={`${task.steps.every((t) => t.completed)
                              && "text-neutral-400 line-through"}`}
            >
              {task.name}
            </span>
          </div>
        </div>
        <div
          className="flex gap-2"
        >
          <div
            className="flex gap-2 mx-1"
          >
            {/**
            * 12.2 (conditional rendering & lists)
            */}
            {task.labels.map((label: Label) => (
              <div key={`--label-${label.id}`}>
                <span
                  title={label.name}
                  /**
                   * 12.5 (pure css)
                   */
                  style={{
                    background: label.theme.bg,
                    color: label.theme.fg,
                    ...styles[style],
                  }}
                  className="rounded-full px-2 py-1"
                >
                  {label.name[0].toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="absolute -right-3 flex gap-3"
          ref={buttonsRef}
        >
          <button
            onClick={async () => {
              await db.tasks.delete(task.id!)
            }}
          >
            <FiTrash />
          </button>
          <button>
            <FiEdit2 />
          </button>
        </div>
      </div>
      <div className="ml-5">
        {task.steps.map((t) => (
          <div key={`--task-${t.name}`}>
            <label htmlFor="vehicle1">
              <input
                type="checkbox"
                checked={t.completed}
                name={`--checkbox-${t.name}`}
                className="rounded-none mr-2"
                onChange={(e) => {
                  const checked = e.currentTarget.checked
                  tasks.toggle(t.id!, checked)
                }}
              />
              <span
                className={`${t.completed
                              && "text-neutral-400 line-through"}`}
              >
                {t.name}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * 9.2 (props/state)
 */ 
export const List = ({ tasks }: { tasks: Array<Task> }) => {
  return (
    <ul>
      {/**
        * 12.2 (conditional rendering & lists)
        */}
      {tasks.map((task: Task) => (
        <li
          key={`--list-${task.id}`}
        >
          <Item
            task={task}
           />
        </li>
      ))}
    </ul>
  )
}
