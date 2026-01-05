import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

/**
 * 12.5 (pure css)
 */
import "@/main.css"

import Layout from "@/components/layouts"
import Task from "@/components/Task"

/**
 * 17.4 (HOC) from React itself.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/**
      * 12.4 (React Router)
      */}
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={
            <Layout>
              <Task />
            </Layout>
          }
        />
        <Route
          path={"*"}
          element={
            <Layout>
              <p>
                Oops! the page you are looking for is not found. <a href="/">Go back!</a>
              </p>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
