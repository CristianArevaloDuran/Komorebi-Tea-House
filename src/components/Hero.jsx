import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useEffect } from "react"
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import teaLeaf1 from "/images/tea-leaf.webp";
import teaLeaf2 from "/images/tea-leaf-2.webp";
import Button from "./elements/Button.jsx";


gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Hero() {

    const sectionRef = useRef(null);
    
    useGSAP(()=>{

        const split = SplitText.create('h1', {
            type: 'chars'
        })

        split.chars.forEach((char) => char.classList.add('gradient-text'))

        const splitP = SplitText.create('.subtitle', {
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
            .from('.subtext-container', {
                opacity: 0,
                autoAlpha: 0,
                y: 20,
                delay: .4,
                ease: 'power1.in'
            }, '<')

        const homeTl = gsap.timeline({
            scrollTrigger: {
                id: 'home',
                scrub: 2,
                pin: true,
                pinSpacing: true,
                start: 'top top',
                end: '+=800vh',
                snap: {
                    snapTo: [0, 1],
                    duration: 2, 
                    delay: .01
                },
                trigger: sectionRef.current
            }
        })

        homeTl
            .fromTo('.left-leaf', {
                y: 0,
                x: 0
            }, {
                y: -100,
                x: -80,
                duration: 1.7
            })
            .fromTo('.right-leaf', {
                y: 0,
                x: 0
            }, {
                y: 100,
                x: 80,
                duration: 1.7
            }, '<')
            .fromTo(split.chars, {
                y:0,
                opacity: 1
            }, {
                y:-100,
                opacity: 0,
                stagger: .05,
                duration: 1.5
            }, '<')
            .fromTo(splitP.words, {
                y: 0,
                opacity: 1
            }, {
                y: -100,
                stagger: .05,
                opacity: 0,
                duration: 1.5
            }, '<')
            .fromTo('.subtext-container', {
                y: 0,
                scale: 1
            }, {
                y:-125,
                scale: 2,
                ease: 'sine.inOut',
                duration: 1.7
            }, '<')
            .fromTo('.subtext', {
                opacity: .5
            }, {
                opacity: 1
            }, '<')
        
        ScrollTrigger.refresh()
    }, {
        scope: sectionRef,
    })

    return (
        <>
            <section ref={sectionRef} id="home" className={`hero`}>
                <img className='left-leaf' src={teaLeaf1} alt="tea-leaf" draggable={false} />
                <img className='right-leaf' src={teaLeaf2} alt="tea-leaf" draggable={false} />
                <h1>木漏れ日</h1>
                <p className="subtitle">Komorebi Tea House</p>
                <div className="subtext-container">
                    <p className="subtext">El arte del té, <br /> filtrado por la luz de los árboles.</p>
                    <Button />
                </div>
            </section>
        </>
    )
}