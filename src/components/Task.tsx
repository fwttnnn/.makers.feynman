import useTasks from "@/hooks/useTasks"
import type { Label, Task } from "@/hooks/useTasks"

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import db from "@/database";

import { FiPlus,
         FiTrash,
         FiEdit2 } from "react-icons/fi";

export default () => {
  /**
   * 31.1 (custom hooks)
   */
  const tasks = useTasks()

  return (
    <>
      <Toolbar />
      <List tasks={tasks} />
    </>
  )
}

export const Toolbar = () => {
  return (
    <>
    </>
  )
}

const Item = ({ task }: { task: Task }) => {
  /**
   * 12.1 (lifecycle/hooks)
   */
  const root = useRef<HTMLLIElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

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
      console.log("rev")
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
    <li
      ref={root}
      className="relative py-1.5 my-2"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        className="flex items-center justify-between gap-2"
      >
        <div
          className="flex gap-2"
        >
          <div>
            <span>{task.title}</span>
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
              await db.tasks.delete(task.id!!)
            }}
          >
            <FiTrash />
          </button>
          <button>
            <FiEdit2 />
          </button>
        </div>
      </div>
    </li>
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
        <Item task={task} />
      ))}
    </ul>
  )
}
