import Dexie from "dexie"
import type { Table } from "dexie"

export type Task = {
  id?: number,
  name: string,
}

export type Step = {
  id?: number,
  taskId: number,
  name: string,
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
  steps!: Table<Step, number>
  labels!: Table<Label, number>
  themes!: Table<Theme, number>

  constructor() {
    super("tasks@makers")

    this.version(1).stores({
      tasks: "++id, name, completed",
      steps: "++id, taskId, name, completed",
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
        { id: 1, name: "Makers Web App" },
        { id: 2, name: "Todo App" },
      ])

      await this.steps.bulkAdd([
        { id: 1, taskId: 1, completed: false, name: "Document `camera.capture()`" },
        { id: 2, taskId: 1, completed: false, name: "Image Preloading" },
        { id: 3, taskId: 1, completed: false, name: "Logout Page" },
        { id: 4, taskId: 1, completed: false, name: "Stress Test" },
        { id: 5, taskId: 2, completed: false, name: "Backup Tasks" },
      ])

      await this.labels.bulkAdd([
        { id: 1, taskId: 1, themeId: 4, name: "Documentation" },
        { id: 2, taskId: 1, themeId: 3, name: "Web" },
        { id: 3, taskId: 1, themeId: 1, name: "Feature" },
        { id: 4, taskId: 1, themeId: 5, name: "Testing" },
        { id: 5, taskId: 2, themeId: 1, name: "Feature" },
        { id: 6, taskId: 2, themeId: 5, name: "Testing" },
      ])
    })
  }
}

export default (new DB())
