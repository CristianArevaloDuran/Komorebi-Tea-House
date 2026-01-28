import Nav from "./components/Nav"
import PageLoader from "./components/PageLoader.jsx";
import { Suspense } from "react"
import { useState } from "react"
import { useEffect } from "react";
import { lazy } from "react";

const Hero = lazy(() => import('./components/Hero.jsx'))

export default function App() {
  const [contentReady, setContentReady] = useState(true);

  useEffect(() => {
    const handleFullyLoaded = () => {
      setTimeout(() => {
        setContentReady(false);
      }, 1000)
    }

    if (document.readyState === 'complete') {
      handleFullyLoaded();
    } else {
      window.addEventListener('load', handleFullyLoaded);
      return () => window.removeEventListener('load', handleFullyLoaded)
    }

  }, [])

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <main>
          <Nav />
          <Hero />
        </main>
      </Suspense>
    </>
  )
}
