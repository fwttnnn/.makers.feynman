import { useLiveQuery } from "dexie-react-hooks"

import db from "@/database"
import type { Group as DBGroup,
              Task as DBTask,
              Label as DBLabel,
              Theme as DBTheme } from "@/database"

export type Task = DBGroup & {
  tasks: Array<DBTask>
  labels: Array<Label>
}

export type Label = Pick<DBLabel, "id" | "name"> & { theme: Pick<DBTheme, "bg" | "fg"> }

/**
 * 31.1 (custom hooks)
 */
export default (): Array<any> => {
  const groups: DBGroup[] = useLiveQuery(() => db.groups.toArray(), []) ?? []
  const tasks: DBTask[] = useLiveQuery(() => db.tasks.toArray(), []) ?? []
  const labels: DBLabel[] = useLiveQuery(() => db.labels.toArray(), []) ?? []
  const themes: DBTheme[] = useLiveQuery(() => db.themes.toArray(), []) ?? []

  return groups.map((group: DBGroup) => {
    return {
      ...group,
      tasks: tasks.filter((t) => t.groupId == group.id),
      labels: labels.filter((l) => l.groupId === group.id)
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
        }),
    }
  })
}
