import Nav from "./components/Nav"
import PageLoader from "./components/PageLoader.jsx";
import { useState } from "react"
import { useEffect } from "react";
import { lazy } from "react";
import Hero from "./components/Hero.jsx";

export default function App() {
  const [contentLoading, setContentLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const handleFullyLoaded = () => {
      setTimeout(() => {
        setContentLoading(false);
      }, 500)
    }

    if (document.readyState === 'complete') {
      const img = new Image();
      img.src = '/icon.webp';
      img.onload = () => {
        setImgLoaded(true)
        handleFullyLoaded();
      }
    } else {
      window.addEventListener('load', handleFullyLoaded);
      return () => window.removeEventListener('load', handleFullyLoaded)
    }

  }, [])

  return (
    <>
      {
        contentLoading ? (
          <PageLoader />
        ) : (
          <main>
            <Nav />
            <Hero />
          </main>
        )
      }
    </>
  )
}
