import Nav from "./components/Nav"
import PageLoader from "./components/PageLoader.jsx";
import { useState } from "react"
import { useEffect } from "react";
import Hero from "./components/Hero.jsx";
import imgTexture from "/textures/texture.jpg"

export default function App() {
  const [contentLoading, setContentLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    const handleFullyLoaded = () => {
      setContentLoading(false)
      setContentLoaded(true)
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
        showLoader && (
          <PageLoader ready={contentLoaded} onFinish={()=>setShowLoader(false)}  />
        )
      }
      
      <main className={showLoader ? 'overflow-hidden' : ''}>
        <Nav start={showLoader} />
        <Hero start={showLoader} />
      </main>
      
    </>
  )
}
