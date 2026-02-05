import gsap from "gsap";
import { useGSAP } from "@gsap/react"

import { useRef } from "react"

export default function Button({to, text}) {

    const buttonRef = useRef(null);
    const bgRef = useRef(null);

    const { contextSafe } = useGSAP({
        scope: buttonRef
    })
    
    
    const handleMouseMove = contextSafe((e) => {
        const btn = buttonRef.current;
        const bg = bgRef.current;
        if (!btn || !bg) return;

        const rect = btn.getBoundingClientRect();
        
        // Calcula la escala comparando dimensiones visuales vs locales
        const scaleX = rect.width / btn.offsetWidth || 1;
        const scaleY = rect.height / btn.offsetHeight || 1;
        
        const x = (e.clientX - rect.left) / scaleX;
        const y = (e.clientY - rect.top) / scaleY;

        gsap.to(bg, {
            x: x,
            y: y,
            xPercent: -65,
            yPercent: -65,
            duration: 0
        })
    })

    const handleMouseEnter = contextSafe(() => {
        gsap.to(bgRef.current, {
            scale: 20,
            duration: .5
        })
    })

    const handleMouseLeave = contextSafe(() => {
        gsap.to(bgRef.current, {
            scale: 0,
            duration: .5
        })
    })

    const scrollTo = contextSafe(() => {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: to,
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
            <span>{text}</span>
            <div ref={bgRef} className="button-bg"></div>
        </button>
    )
}