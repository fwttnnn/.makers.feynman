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
        { id: 3, name: "Movie App (Final)" },
      ])

      await this.steps.bulkAdd([
        { id: 1, taskId: 1, completed: false, name: "Document `camera.capture()`" },
        { id: 2, taskId: 1, completed: false, name: "Image Preloading" },
        { id: 3, taskId: 1, completed: false, name: "Logout Page" },
        { id: 4, taskId: 1, completed: false, name: "Stress Test" },
        { id: 5, taskId: 2, completed: false, name: "Backup Tasks" },
        { id: 6, taskId: 3, completed: false, name: "Backgroud Image with Opacity of 0.6" },
        { id: 7, taskId: 3, completed: false, name: "Search Film: GET (http://www.omdbapi.com/?s=${search}&apikey=d592fe1a)" },
        { id: 8, taskId: 3, completed: false, name: "View on the left is historical, inputs on the right. After input: view historical is shown, and the right view is auto-refreshed" },
        { id: 9, taskId: 3, completed: false, name: "Date input auto connect with Ticket Entry Fee (by the day). HTM can be edited" },
        { id: 10, taskId: 3, completed: false, name: "Jml: Jumlah tiket yang dipesan berdasarkan judul film" }, 
        { id: 11, taskId: 3, completed: false, name: "Total: Jumlah `tiket * HTM` berdasarkan judul film" }, 
        { id: 12, taskId: 3, completed: false, name: "Total Tiket Terjual: Jumlah tiket yang dibeli di hari itu" }, 
        { id: 13, taskId: 3, completed: false, name: "Total Pendapatan: Total berdasarkan harga jumlah tiket yang dibeli di hari itu" }, 
        { id: 14, taskId: 3, completed: false, name: "Desain di buat sekreatif mungkin dan mudah dipahami" }, 
        { id: 15, taskId: 3, completed: false, name: "Judul film hanya ada satu saja berdasarkan pemilihan judul film di hari itu" }, 
      ])

      await this.labels.bulkAdd([
        { id: 1, taskId: 1, themeId: 4, name: "Documentation" },
        { id: 2, taskId: 1, themeId: 3, name: "Web" },
        { id: 3, taskId: 1, themeId: 1, name: "Feature" },
        { id: 4, taskId: 1, themeId: 5, name: "Testing" },
        { id: 5, taskId: 2, themeId: 1, name: "Feature" },
        { id: 6, taskId: 2, themeId: 5, name: "Testing" },
        { id: 7, taskId: 3, themeId: 3, name: "Web" },
        { id: 8, taskId: 3, themeId: 1, name: "Feature" },
      ])
    })
  }
}

export default (new DB())
