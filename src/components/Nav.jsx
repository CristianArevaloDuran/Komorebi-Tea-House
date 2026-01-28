import { sections } from "/constants"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import SplitText from "gsap/SplitText"
import ScrollTrigger from "gsap/ScrollTrigger"
import logo from '/icon.webp'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Nav({start}) {
    
    const navRef = useRef(null)
    
    useGSAP(() => {
        
        if(start) return
        
        SplitText.create(navRef.current.querySelector('a p'), {
            type: "chars, words",
        })

        
        gsap.from('ul li', {
            y: 10,
            ease: 'back.out(1.7)',
            opacity: 0,
            stagger: .05,
            delay: 0.5,
        })
        gsap.from('.font-japanese div', {
            y: 10,
            opacity: 0,
            duration: .7,
            ease: "back.out",
            stagger: 0.03,
            delay: 0.5,
        })
        gsap.from('img', {
            scale: 0,
            duration: .5,
            ease: "back.out(1.7)",
            delay: 0.5,
        })
        
        const navTl = gsap.timeline({
            scrollTrigger: {
                scrub: 1.5,
                pin: true,
                start: 'top top',
                end: '+=200vh',
            }
        })

        navTl
            .to(navRef.current, {
                y: 30
            })
            .to(navRef.current, {
                scale: .95
            }, '<')
    }, {
        scope: navRef,
        dependencies: [start]
    })

    const onMouseEnter = () => {
        gsap.timeline()
        .to('.font-japanese div', {
            y: -4,
            color: "#ffacd1",
            duration: 0.3,
            ease: "back.out",
            stagger: 0.03
        }, '<')
        .to('a p.font-sakuna', {
            opacity: 1,
            duration: 0.3,
            y: 10,
            ease: "back.out",
        }, "<")
        .to('img', {
            scale: 1.2,
            duration: 0.4,
            ease: "back.out",
            rotate: 15,
        }, "<")
    }

    const onMouseLeave = () => {
        gsap.timeline()
        .to('.font-japanese div', {
            y: 0,
            color: "#ffffff",
            duration: 0.3,
            ease: "back.in",
            stagger: 0.05
        })
        .to('a p.font-sakuna', {
            opacity: 0,
            duration: 0.3,
            delay: 0.1,
            y: 0,
            ease: "power1.out",
        }, "<")
        .to('img', {
            scale: 1,
            duration: 0.4,
            ease: "back.out",
            rotate: 0,
        }, "<")
    }

    const onMouseEnterButton = (e) => {
        
        if(gsap.isTweening(e.target)) return

        let prev = e.target.querySelector('.pre');
        let pos = e.target.querySelector('.pos');

        const buttonTl = gsap.timeline();

        buttonTl
        .to(pos, {
            y: 20,
            clearProps: 'y',
            duration: .5,
            ease: 'back.out',
            onComplete: () => {
                pos.classList.add('pre');
                pos.classList.remove('pos');
            }
        })
        .to(prev, {
            y: 20,
            duration: .5,
            clearProps: 'y',
            ease: 'back.out',
            onComplete: () => {
                prev.classList.remove('pre');
                prev.classList.add('pos');
            }
        }, '<')
        
    }

    return (
        <nav className={start ? 'opacity-0':'opacity-100'}>
            <div id="nav" ref={navRef}>
                <a href="#home" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onFocus={onMouseEnter} onBlur={onMouseLeave}>
                    <img draggable={false} src={logo} alt="icon" />
                    <div className="relative">
                        <p className="font-japanese text-white">木漏れ日</p>
                        <p className="text-sm font-sakuna absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] opacity-0">Komorebi</p>
                    </div>
                </a>
                <ul>
                    {sections.map((section) => (
                        <li key={section.id} onMouseEnter={onMouseEnterButton}>
                            <a className="relative overflow-hidden" href={`#${section.id}`}>
                                <p className="pre">{section.title}</p>
                                <p className="pos">{section.title}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}