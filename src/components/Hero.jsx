import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useEffect } from "react"
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import teaLeaf1 from "/images/tea-leaf.webp";
import teaLeaf2 from "/images/tea-leaf-2.webp";


gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Hero({start}) {

    const sectionRef = useRef(null);
    
    useGSAP(()=>{
        if(start) return;

        const split = SplitText.create('h1', {
            type: 'chars'
        })

        split.chars.forEach((char) => char.classList.add('gradient-text'))

        const splitP = SplitText.create('p', {
            type: 'chars words'
        })

        const titleTl = gsap.timeline({
            onComplete: ()=> {
                document.body.style.overflow = 'auto'
            }
        });

        titleTl
            .from('.left-leaf', {
                x: -100,
                rotate: 20,
                duration: .5,
                scale: .6,
                autoAlpha: 0,
                delay: 0.2,
                ease: 'back.out'
            })
            .from('.right-leaf', {
                x: 100,
                rotate: -50,
                duration: .5,
                scale: .6,
                autoAlpha: 0,
                ease: 'back.out'
            }, '<')
            .from(split.chars, {
                y:100,
                opacity: 0,
                duration: .8,
                stagger: .06,
                autoAlpha: 0,
                delay: 0.4,
                ease: 'back.out'
            }, '-=0.3')
            .from(splitP.words, {
                y: 30,
                duration: .7,
                autoAlpha: 0,
                stagger: .05,
                delay: 0.4
            }, '<')

        const homeTl = gsap.timeline({
            scrollTrigger: {
                id: 'home',
                scrub: 2,
                pin: true,
                start: 'top top',
                end: '+=900vh',
                trigger: sectionRef.current
            }
        })

        homeTl
            .fromTo('.left-leaf', {
                y: 0,
                x: 0
            }, {
                y: -100,
                x: 20
            })
            .fromTo('.right-leaf', {
                y: 0,
                x: 0
            }, {
                y: 100,
                x: -20
            }, '<')
            .fromTo(split.chars, {
                y:0,
                opacity: 1
            }, {
                y:-100,
                opacity: 0.5,
                stagger: .05
            }, '<')
            .fromTo(splitP.words, {
                y: 0,
                opacity: 1
            }, {
                y: -100,
                stagger: .05,
                opacity: 0.2
            }, '<')
        
        ScrollTrigger.refresh()
    }, {
        scope: sectionRef,
        dependencies: [start]
    })

    return (
        <>
            <section ref={sectionRef} id="home" className={`hero`}>
                {
                    start ? <></> :
                    <>
                        <img className='left-leaf' src={teaLeaf1} alt="tea-leaf" draggable={false} />
                        <img className='right-leaf' src={teaLeaf2} alt="tea-leaf" draggable={false} />
                        <h1>木漏れ日</h1>
                        <p>Komorebi Tea House</p>
                        <p className="subtext">El arte del té, filtrado por la luz de los árboles.</p>
                    </>
                }
                
            </section>
        </>
    )
}