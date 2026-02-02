import Nav from "./components/Nav"
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import PageLoader from "./components/PageLoader.jsx";
import { useState } from "react"
import { useEffect } from "react";

//Preload resources
import imgTexture from "/textures/texture.webp";
import teaLeaf1 from "/images/tea-leaf.webp";
import teaLeaf2 from "/images/tea-leaf-2.webp";
import icon from "/icon.webp";
import teaCup from "/images/tea-cup.webp";
import Sakuna from "/fonts/SAKUNA.ttf";
import Japanese from "/fonts/Japanese.ttf";

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  
  useEffect(() => {
    
    const prepareContent = async () => {
      try {
        const fontsToLoad = [
          new FontFace('Sakuna', `url(${Sakuna})`),
          new FontFace('Japanese', `url(${Japanese})`)
        ];
        
        const imagesToLoad = [
          teaLeaf1,
          teaLeaf2,
          imgTexture,
          icon,
          teaCup
        ];
        
        const loadFonts = fontsToLoad.map(async font => {
          const loadedFont = await font.load();
          document.fonts.add(loadedFont);
          return loadedFont;
        })

        const loadImages = imagesToLoad.map((image) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = image;
            img.onload = resolve;
            img.onerror = resolve;
          });
        });
        
        await Promise.all([...loadFonts, ...loadImages])

        window.scrollTo(0, 0);
        setContentLoaded(true);
      } catch(error) {
        console.error('Error cargando recursos:', error);
        setContentLoaded(false);
      } 
    }

    prepareContent();

  }, [])
  
  return (
    <>
      {
        showLoader && (
          <PageLoader ready={contentLoaded} onFinish={()=>setShowLoader(false)}  />
        )
      }
      
      <main className={`${showLoader ? '!overflow-y-hidden' : ''} texture`} >
        {
          showLoader ? <></> :
          <>
            <Nav start={showLoader} />
            <Hero start={showLoader} />
            <About />
          </>
        }
      </main>
      
    </>
  )
}
