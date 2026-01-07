import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

/**
 * 12.5 (pure css)
 */
import "@/main.css"

import Layout from "@/components/Layouts"
import Task from "@/components/Task"

import Auth from "@/contexts/Auth"
import Boundary from "@/components/Boundary"

/**
 * 17.4 (HOC) from React itself.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/**
      * 17.3 (error boundaries)
      * 17.1 (Context API)
      * 12.4 (React Router)
      */}
    <Boundary.Error>
      <Auth.Provider>
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
      </Auth.Provider>
    </Boundary.Error>
  </StrictMode>,
)
