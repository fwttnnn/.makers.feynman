import useTasks from "@/hooks/useTasks"
import type { Label, Task } from "@/hooks/useTasks"

export default () => {
  /**
   * 31.1 (custom hooks)
   * 12.2 (conditional rendering)
   */
  const tasks = useTasks()
  if (!tasks) return <></>

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

/**
 * 9.2 (props)
 */ 
export const List = ({ tasks }: { tasks: Array<Task> }) => {
  return (
    <ul>
      {tasks.map((task: Task) => (
        /**
         * 26.4 (tailwind)
         */
        <li
          className="py-1.5 my-2"
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
                {task.labels.map((label: Label) => (
                  <div key={`--label-${label.id}`}>
                    <span
                      title={label.name}
                      /**
                       * 12.5 (pure css)
                       */
                      style={{ background: label.theme.bg,
                               color: label.theme.fg, }}
                      className="rounded-full px-2 py-1"
                    >
                      {label.name[0].toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
