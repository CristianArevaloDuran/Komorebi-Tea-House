import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { useRef } from "react"

export default function Button() {

    const buttonRef = useRef(null);

    const { contextSafe } = useGSAP({
        scope: buttonRef
    })
    
    
    const handleMouseMove = contextSafe((e) => {
        const btn = e.currentTarget;
        
        const rect = btn.getBoundingClientRect();
        
        const container = document.querySelector('.subtext-container');
        
        const currentScale = gsap.getProperty(container, 'scale');
        
        const x = (e.clientX - rect.left) / currentScale;
        const y = (e.clientY - rect.top) / currentScale;
        

        gsap.to('.button-bg', {
            x: x,
            y: y,
            xPercent: -65,
            yPercent: -65,
            duration: 0
        })
    })

    const handleMouseEnter = contextSafe(() => {
        gsap.to('.button-bg', {
            scale: 20,
            duration: .5
        })
    })

    const handleMouseLeave = contextSafe(() => {
        gsap.to('.button-bg', {
            scale: 0,
            duration: .5
        })
    })

    const scrollTo = contextSafe(() => {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: '#about',
                autoKill: true
            }
        })
    })

    return (
        <button ref={buttonRef} className="animated-bt"
            onClick={scrollTo}
            onMouseMove={(e)=>handleMouseMove(e)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span>Conoce más</span>
            <div className="button-bg"></div>
        </button>
    )
}