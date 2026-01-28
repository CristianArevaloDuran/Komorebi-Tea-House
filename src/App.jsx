import Nav from "./components/Nav"
import PageLoader from "./components/PageLoader.jsx";
import { useState } from "react"
import { useEffect } from "react";
import Hero from "./components/Hero.jsx";
import imgTexture from "/textures/paper.jpg"

export default function App() {
  const [contentLoading, setContentLoading] = useState(true);

  useEffect(() => {
    const handleFullyLoaded = () => {
      setTimeout(() => {
        setContentLoading(false);
      }, 500)
    }

    if (document.readyState === 'complete') {
      const img = new Image();
      img.src = imgTexture;
      img.onload = () => {
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
