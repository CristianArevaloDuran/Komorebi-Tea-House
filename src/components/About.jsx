import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {

    const sectionRef = useRef(null);
    const canvasRef = useRef(null);

    const frameCount = 300;
    const currentFrame = (index) => 
        `/Komorebi-Tea-House/videos/tea-video/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`

    useGSAP(()=> {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const videoData = {
            frame: 0
        };

        const images = [];

        for(let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        const render = () => {
            const img = images[Math.round(videoData.frame)];
            if (img) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                 
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;
                
                context.drawImage(
                    img, 0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
                );
            }
        };

        // 3. Timeline de GSAP
        gsap.to(videoData, {
            id: 'about',
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=500%", // Scroll de 2 pantallas de duración
                scrub: 1,
                pin: true,
            },
            onUpdate: render,
        });

        // Dibujar el primer frame al iniciar
        images[0].onload = render;

        // Ajustar tamaño del canvas internamente
        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            render();
        };
        window.addEventListener('resize', resize);
        resize();

        return () => window.removeEventListener('resize', resize);
    }, {
        scope: sectionRef
    })

    return (
        <>
            <section ref={sectionRef} id='about'>
                <div className="fade-in"></div>
                <div className="fade-out"></div>
                <div className="side-text">
                    <div>
                        <p>El té es el lenguaje del alma en silencio.</p>
                        <p>En cada gota, el reflejo de un bosque que respira.</p>
                        <p>No buscamos la taza perfecta, sino el momento presente.</p>
                        <p>Nuestra ceremonia no es un acto, es una pausa necesaria en un mundo que corre.</p>
                        <p>De la tierra a la brasa, del agua al espíritu.</p>
                        <p>Komorebi: Donde la luz baila entre las hojas y el tiempo se detiene.</p>
                    </div>
                </div>
                <div className="side-video">
                    <canvas 
                        ref={canvasRef}
                    />
                </div>
            </section>    
        </>
    )
}