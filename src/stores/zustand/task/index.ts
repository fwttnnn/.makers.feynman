import db from "@/database"
import { liveQuery } from "dexie"
import { create } from "zustand"

import type { Group as DBGroup,
              Task as DBTask,
              Label as DBLabel,
              Theme as DBTheme } from "@/database"

export type Task = DBGroup & { tasks: Array<DBTask>, labels: Array<Label> }
export type Label = Pick<DBLabel, "id" | "name"> & { theme: Pick<DBTheme, "bg" | "fg"> }

export type Store = {
  tasks: Task[]

  isSorted: boolean,
  sortDir: "asc" | "desc",

  sort(): void

  /**
   * NOTE: this is actually not what zustand
   *       is for, should've been in a `services/` folder
   */
  add(title: string): Promise<void>
  delete(id: number): Promise<void>
  toggle(id: number, completed?: boolean): Promise<void>

  /**
   * NOTE: in-memory (for testing)
   */
  __in_mem_add(title: string): void
}

/**
 * 22.3 (zustand)
 * 26.5 (zustand global state)
 */
export default create<Store>((set, get) => {
  liveQuery(async () => {
    const [groups, tasks, labels, themes] = await Promise.all([
      db.groups.toArray(),
      db.tasks.toArray(),
      db.labels.toArray(),
      db.themes.toArray(),
    ])

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
  }).subscribe({
    next: (tasks) => {
      set({ tasks })

      /**
       * TODO: a hack for preseving index after deleting
       *       please remove this, or do something else
       */
      const { sortDir, isSorted } = get()
      if (isSorted) {
        const sorted = [...tasks].sort((a, b) => {
          const result = a.name.localeCompare(b.name)
          return sortDir === "asc" ? result : -result
        })

        set({ tasks: sorted })
      }
    }
  })

  return {
    tasks: [],

    isSorted: false,
    sortDir: "asc",

    sort: () => {
      const { tasks, sortDir } = get()
      const nextDir = sortDir === "asc" ? "desc" : "asc"

      const sorted = [...tasks].sort((a, b) => {
        const result = a.name.localeCompare(b.name)
        return nextDir === "asc" ? result : -result
      })

      set({
        isSorted: true,
        tasks: sorted,
        sortDir: nextDir,
      })
    },

    add: async (name: string) => {
      await db.groups.add({ name,
                            completed: false })
    },

    delete: async (id: number) => {
      await db.groups.delete(id)
    },

    toggle: async (id: number, completed?: boolean) => {
      const task = await db.tasks.get(id)
      if (!task) return

      const _completed = completed ? completed : !task.completed
      await db.tasks.update(id, { completed: _completed })
    },

    __in_mem_add: (name: string) => {
      const {tasks} = get()
      set({
        tasks: [...tasks, { id: 0, name: name, completed: false, tasks: [], labels: [] }]
      })
    }
  }
})
