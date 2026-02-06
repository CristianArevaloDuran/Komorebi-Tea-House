import { useState, lazy, useEffect, Suspense } from "react";

//Import sections
import Nav from "./components/Nav";
import Hero from "./components/Hero.jsx";
import PageLoader from "./components/PageLoader.jsx";

const About = lazy(() => import('./components/About.jsx'));
const Menu = lazy(() => import('./components/Menu.jsx'));

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
  

  //About section video animation setup
  const frameCount = 300;
  const currentFrame = (index) => 
    `/Komorebi-Tea-House/videos/tea-video/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;
  const [images] = useState([])

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


        const videoFramesPromises = [];
          for (let i = 0; i < frameCount; i++) {
              const img = new Image();
              img.src = currentFrame(i);
              
              // Creamos una promesa por cada frame
              const framePromise = new Promise((resolve) => {
                  img.onload = () => {
                      images[i] = img; // Guardamos la imagen cargada en su posición exacta
                      resolve();
                  };
                  img.onerror = () => {
                      console.error(`Error cargando frame: ${i}`);
                      resolve(); // Resolvemos de todos modos para no bloquear el loader infinito si falla uno
                  };
              });
              videoFramesPromises.push(framePromise);
        }
        
 
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
        
        await Promise.all([...loadFonts, ...loadImages, ...videoFramesPromises])

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
            <Suspense fallback={null}>
              <About images={images} frameCount={frameCount} />
            </Suspense>
              <Menu />
          </>
        }
      </main>
      
    </>
  )
}
