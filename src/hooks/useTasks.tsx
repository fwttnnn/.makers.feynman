/**
 * NOTE: DEPRECATED
 */

import { useLiveQuery } from "dexie-react-hooks"

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
  const tasks: DBTask[] = useLiveQuery(() => db.tasks.toArray(), []) ?? []
  const labels: DBLabel[] = useLiveQuery(() => db.labels.toArray(), []) ?? []
  const themes: DBTheme[] = useLiveQuery(() => db.themes.toArray(), []) ?? []

  return tasks.map((task: DBTask) => {
    return {
      ...task,
      labels: labels.filter((l) => l.taskId === task.id)
        .map((l) => {
          const theme = themes.find((t) => t.id === l.themeId)!
          return {
            id: l.id,
            name: l.name,
            theme: {
              bg: theme.bg,
              fg: theme.fg,
            },
          }
        })
    }
  })
}
