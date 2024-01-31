import { useState, useEffect } from "react";


export const Accueil = () => {
    const [isDesktop, setDesktop] = useState(window.innerWidth > 901);
    const [isTablet, setTablet] = useState(window.innerWidth > 500 && window.innerWidth < 900);
    const [isMobile, setMobile] = useState(window.innerWidth < 500);
  
    const updateMedia = () => {
      setDesktop(window.innerWidth > 901);
      setTablet(window.innerWidth > 500 && window.innerWidth < 900);
      setMobile(window.innerWidth < 500);
    };
  
    useEffect(() => {
      window.addEventListener("resize", updateMedia);
      return () => window.removeEventListener("resize", updateMedia);
    });

    console.log(`ordinateur : ${isDesktop}, tablette : ${isTablet}, téléphone : ${isMobile}`)

    return (
        <section>
            <nav></nav>
            <main>
                <article>
                    <h1>Encyclopédie</h1>
                    <p>Introduction</p>
                </article>
                <article>
                    <p>links</p>
                </article>
            </main>
            <footer>mentions légales</footer>
        </section>
    )
}