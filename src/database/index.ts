import Dexie from "dexie"
import type { Table } from "dexie"

export type Group = {
  id?: number,
  name: string,
  completed: boolean,
}

export type Task = {
  id?: number,
  groupId: number,
  name: string,
  completed: boolean,
}

export type Label = {
  id?: number,
  groupId: number,
  themeId: number,
  name: string,
}

export type Theme = {
  id?: number,
  bg: string,
  fg: string,
}

export class DB extends Dexie {
  groups!: Table<Group, number>
  tasks!: Table<Task, number>
  labels!: Table<Label, number>
  themes!: Table<Theme, number>

  constructor() {
    super("DB")

    this.version(1).stores({
      groups: "++id, name, completed",
      tasks: "++id, groupId, name, completed",
      labels: "++id, groupId, themeId, name",
      themes: "++id, bg, fg",
    })

    this.on("populate", async () => {
      await this.themes.bulkAdd([
        { id: 1, bg: "#ef4b3c", fg: "#000000" },
        { id: 2, bg: "#ffbd17", fg: "#000000" },
        { id: 3, bg: "#1973c0", fg: "#000000" },
        { id: 4, bg: "#1da849", fg: "#000000" },
        { id: 5, bg: "#f9b6b1", fg: "#000000" },
      ])

      await this.groups.bulkAdd([
        { id: 1, completed: false, name: "Makers Web App" },
        { id: 2, completed: false, name: "Todo App" },
      ])

      await this.tasks.bulkAdd([
        { id: 1, groupId: 1, completed: false, name: "Document `camera.capture()`" },
        { id: 2, groupId: 1, completed: false, name: "Image Preloading" },
        { id: 3, groupId: 1, completed: false, name: "Logout Page" },
        { id: 4, groupId: 1, completed: false, name: "Stress Test" },
        { id: 5, groupId: 2, completed: false, name: "Backup Tasks" },
      ])

      await this.labels.bulkAdd([
        { name: "Documentation", groupId: 1, themeId: 4 },
        { name: "Web", groupId: 1, themeId: 3 },
        { name: "Feature", groupId: 1, themeId: 1 },
        { name: "Testing", groupId: 1, themeId: 5 },
        { name: "Feature", groupId: 2, themeId: 1 },
        { name: "Testing", groupId: 2, themeId: 5 },
      ])
    })
  }
}

export default (new DB())
