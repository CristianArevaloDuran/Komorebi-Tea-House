import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useRef } from "react"

// Import products

import { products } from "/constants"

gsap.registerPlugin(ScrollTrigger)

export default function Menu() {

    const menuRef = useRef(null)

    useGSAP(() => {

        // Intro animation for the menu

        const introTl = gsap.timeline({
            scrollTrigger: {
                trigger: menuRef.current,
                start: 'top 30%',
                end: 'top 30%',
                toggleActions: 'play none none none',
            }
        })

        introTl
            .from('.jap-title', {
                x: -200,
                autoAlpha: 0,
                duration: 0.8,
                ease: 'power2.out'
            })
            .from('.esp-title', {
                x: 200,
                autoAlpha: 0,
                duration: 0.8,
                ease: 'power2.out'
            }, '<')

    }, {
        scope: menuRef
    })

    return (
        <>
            <section ref={menuRef} id="menu" className="texture">
                <div className="fade-in"></div>
                <div className="fade-out"></div>
                <div className="title">
                    <h2 className="jap-title">メニュー</h2>
                    <h2 className="esp-title">Menú</h2>
                </div>
                <div className="menu-container">
                    {
                        products.map((product) =>( 
                            <div key={product.name} className="product">
                                <img draggable={false} src={product.img} alt="" />
                                <p>{product.name}</p>
                            </div>  
                        ))
                    }
                </div>
            </section>
        </>
    )
}