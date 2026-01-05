import Dexie from "dexie"
import type { Table } from "dexie"

export type Task = {
  id?: number,
  title: string,
  completed: boolean,
}

export type Label = {
  id?: number,
  taskId: number,
  themeId: number,
  name: string,
}

export type Theme = {
  id?: number,
  bg: string,
  fg: string,
}

export class DB extends Dexie {
  tasks!: Table<Task, number>
  labels!: Table<Label, number>
  themes!: Table<Theme, number>

  constructor() {
    super("DB")

    this.version(1).stores({
      tasks: "++id, title, completed",
      labels: "++id, taskId, themeId, name",
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

      await this.tasks.bulkAdd([
        { id: 1, title: "Document `camera.capture()`", completed: false },
        { id: 2, title: "Image Preloading", completed: false },
        { id: 3, title: "Logout Page", completed: false },
        { id: 4, title: "Stress Test", completed: false },
      ])

      await this.labels.bulkAdd([
        { name: "Documentation", taskId: 1, themeId: 4 },
        { name: "Web", taskId: 1, themeId: 3 },
        { name: "Feature", taskId: 2, themeId: 1 },
        { name: "Feature", taskId: 3, themeId: 1 },
        { name: "Web", taskId: 4, themeId: 3 },
        { name: "Testing", taskId: 4, themeId: 5 },
      ])
    })
  }
}

export default (new DB())
