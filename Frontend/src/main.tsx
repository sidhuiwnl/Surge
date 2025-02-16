import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ClerkProvider} from "@clerk/clerk-react";
import { BrowserRouter,Routes,Route } from "react-router";
import InputDemo from "./pages/Input.tsx";
import Recordings from "./pages/Recordings.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import Layout from "@/components/Layout.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import RecordingPage from "@/pages/Recording.tsx";
import About from "@/pages/About.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ClerkProvider
          publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
          <BrowserRouter>
              <Layout>
              <Routes>
                  <Route path={"/"} element={ <App/>}/>
                  <Route
                          path="/add"
                          element={
                              <ProtectedRoute>
                                <InputDemo/>
                              </ProtectedRoute>
                          }
                  />
                  <Route
                          path="/recordings"
                          element={
                            <ProtectedRoute>
                              <Recordings />
                            </ProtectedRoute>

                          }
                  />
                  <Route
                      path="/recordings/:id"
                      element={
                          <ProtectedRoute>
                              <RecordingPage />
                          </ProtectedRoute>

                      }
                  />
                  <Route path={"/about"} element={<About/>}  />
              </Routes>
              </Layout>
          </BrowserRouter>
      </ClerkProvider>
      <Toaster/>
  </StrictMode>,
)
