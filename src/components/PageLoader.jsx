import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(SplitText)

export default function PageLoader({ onFinish, ready }) {
    const containerRef = useRef(null)
    const textRef = useRef(null)

    useGSAP(()=>{
        if(ready) {
            const tl = gsap.timeline({
                onComplete: onFinish
            })

            const split = SplitText.create(textRef.current, {
                type: 'chars, words'
            })
        
            tl
            .to(split.chars, {
                y: -50,
                opacity: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: "power4.in"
            })
            .to(containerRef.current, {
                yPercent: -100, 
                duration: 1.2,
                ease: "power4.inOut",
                // Opcional: Al final lo ocultamos del todo para que no interfiera con clicks
                onComplete: () => gsap.set(containerRef.current, { display: "none" })
            }, "-=0.3");
        }

    }, [ready])

    return (
        <>
            <div ref={containerRef} className="fixed inset-0 z-100 flex items-center justify-center bg-[#1a1a1a]">
              <div className="text-white font-serif italic animate-pulse">
                <p ref={textRef}>Komorabi Tea House...</p>
              </div>
            </div>
        </>
    )
}