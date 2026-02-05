import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger"

import { useRef } from "react";

import Button from "./elements/Button";

gsap.registerPlugin(ScrollTrigger);

export default function About({frameCount, images}) {

    const sectionRef = useRef(null);
    const canvasRef = useRef(null);

    useGSAP(()=> {
        if(!images || !frameCount) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const videoData = {
            frame: 0
        };

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
        const aboutTl = gsap.timeline({
            scrollTrigger: {
                id: 'about',
                trigger: sectionRef.current,
                start: "top top",
                end: "+=600%",
                scrub: 1,
                pin: true,
            },
            onUpdate: render
        });

        
        aboutTl 
            .to(videoData, {
                frame: frameCount - 1,
                snap: "frame",
                ease: "none",
                duration: 1 // Duración relativa
            });
        
        // Paragraphs animation 

        const pTl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=600%",
                scrub: 1,
                ease: 'back.out'
            }
        })
        
        const paragraphs = gsap.utils.toArray('.slide-text p');
        let step = 0;
        
        paragraphs.forEach((p, i) => {
            
            
            
            const target = i === 0 ? 0 : -(step);
            
            pTl
                .to('.slide-text', {
                    y: target
                }, i === 0 ? '<' : '>')
                .to(p, {
                    opacity: 1,
                    onComplete: () => {
                        p.classList.add('active')
                    },
                    duration: 0.5
                }, '<')

                if(i === (paragraphs.length - 1)) {
                    pTl.to('button', {
                        opacity: 1,
                        duration: 0.5
                    }, '<')
                }
            
            step += (p.offsetHeight + 50);
        })
    
        // Dibujar el primer frame al iniciar
        if(images.length > 0) render();

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
        scope: sectionRef,
        dependencies: [images]
    })

    return (
        <>
            <section ref={sectionRef} id='about'>
                <div className="fade-in"></div>
                <div className="fade-out"></div>
                <div className="side-container">
                    <div className="slide-text">
                        <p className="active">El té es el lenguaje del alma en silencio.</p>
                        <p>En cada gota, el reflejo de un bosque que respira.</p>
                        <p>No buscamos la taza perfecta, sino el momento presente.</p>
                        <p>Nuestra ceremonia no es un acto, es una pausa necesaria en un mundo que corre.</p>
                        <p>De la tierra a la brasa, del agua al espíritu.</p>
                        <p><span>Komorebi:</span> Donde la luz baila entre las hojas y el tiempo se detiene.</p>
                        <Button to={'#menu'} text={'Conoce el menú'} />
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