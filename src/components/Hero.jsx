import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import teaLeaf1 from "/images/tea-leaf.png";
import teaLeaf2 from "/images/tea-leaf-2.png";


gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Hero({start}) {

    const sectionRef = useRef(null);
    
    useGSAP(()=>{
        if(start) return;

        const split = SplitText.create('h1', {
            type: 'chars words'
        })

        split.chars.forEach((char) => char.classList.add('gradient-text'))

        const titleTl = gsap.timeline({
            immediateRender: true
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
                delay: 0.4,
                ease: 'back.out'
            }, '-=0.3')
            .from('p', {
                y: 30,
                duration: .7,
                autoAlpha: 0,
                delay: 0.4
            }, '<')

        const scrollTl = gsap.timeline({
            scrollTrigger: {
                invalidateOnRefresh: true,
                scrub: 2,
                start: 'top top',
                end: '+=500vh'
            }
        })

        scrollTl
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
        
        ScrollTrigger.refresh()
    }, {
        scope: sectionRef,
        dependencies: [start]
    })

    return (
        <>
            <section ref={sectionRef} id="home" className={`texture hero`}>
                {
                    start ? <></> :
                    <>
                        <img className='left-leaf' src={teaLeaf1} alt="tea-leaf" draggable={false} />
                        <img className='right-leaf' src={teaLeaf2} alt="tea-leaf" draggable={false} />
                        <h1>木漏れ日</h1>
                        <p>Komorebi Tea House</p>
                    </>
                }
                
            </section>
        </>
    )
}