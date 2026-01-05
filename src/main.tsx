import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@/main.css"

import Layout from "@/components/layouts"
import Task from "@/components/Task"

/**
  * 17.4 (HOC) from React itself.
  */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <Task />
    </Layout>
  </StrictMode>,
)
