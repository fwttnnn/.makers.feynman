import { StrictMode, lazy } from "react"
import { createRoot } from "react-dom/client"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { BrowserRouter, Routes, Route } from "react-router-dom"

/**
 * 22.1 (redux core concepts)
 * 22.2 (redux toolkit)
 */
import { Provider } from "react-redux"
import { store } from "@/stores/redux"

const Redux = {
  Provider,
  store
}

/**
 * 12.5 (pure css)
 */
import "@/main.css"

import Auth from "@/contexts/Auth"
import Boundary from "@/components/Boundary"

/**
 * 17.5 (performance opt.)
 */
const Layout   = lazy(() => import("@/components/Layouts"))
const Task     = lazy(() => import("@/components/Task"))
const Settings = lazy(() => import("@/components/Settings"))

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
      <Redux.Provider store={Redux.store}>
        <Auth.Provider>
          <HelmetProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path={"/"}
                  element={
                    <>
                      {/**
                        * 31.4 (SEO)
                        */}
                      <Helmet>
                        <title>task tracker | home</title>
                        <meta
                          name="description"
                          content="a task tracker app "
                        />
                      </Helmet>

                      <Layout>
                        <Settings />
                        <Task />
                      </Layout>
                    </>
                  }
                />
                <Route
                  path={"*"}
                  element={
                    <>
                      {/**
                        * 31.4 (SEO)
                        */}
                      <Helmet>
                        <title>task tracker | not found</title>
                        <meta
                          name="description"
                          content="whoops! manage your tasks on the homepage!"
                        />
                      </Helmet>
                      <Layout>
                        <p>
                          Oops! the page you are looking for is not found. <a href="/">Go back!</a>
                        </p>
                      </Layout>
                    </>
                  }
                />
              </Routes>
            </BrowserRouter>
          </HelmetProvider>
        </Auth.Provider>
      </Redux.Provider>
    </Boundary.Error>
  </StrictMode>,
)
