import { useEffect, useState } from "react"

import db from "@/database"
import type { Task as DBTask,
              Label as DBLabel,
              Theme as DBTheme } from "@/database"

export type Task = DBTask & {
  labels: Array<Label>
}

export type Label = Pick<DBLabel, "id" | "name"> & { theme: Pick<DBTheme, "bg" | "fg"> }

/**
 * 31.1 (custom hooks)
 */
export default (): Array<Task> => {
  /**
   * 12.1 (lifecycle/hooks)
   */
  const [tasks, setTasks] = useState<Array<Task>>([])

  /**
   * 12.1 (lifecycle/hooks)
   */
  useEffect(() => {
    (async () => {
      const labels = await db.labels.toArray()
      const themes = await db.themes.toArray()

      setTasks((await db.tasks.toArray())
                .map((task: DBTask) => {
                  return {
                    ...task,
                    labels: labels.filter((l: DBLabel) => l.taskId === task.id)
                                  .map((l: DBLabel) => {
                                    const theme = themes.find((t: DBTheme) => l.themeId ===  t.id)!!
                                    return {
                                      id: l.id,
                                      name: l.name,
                                      theme: {
                                        bg: theme.bg,
                                        fg: theme.fg,
                                      },
                                    }
                                  }),
                  }
                }))
    })()
  }, [])

  return tasks
}
