import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Door } from "../../components/door/door";


export const Accueil = () => {
    const [isDesktop, setDesktop] = useState(window.innerWidth > 1081);
    const [isTablet, setTablet] = useState(window.innerWidth > 500 && window.innerWidth < 1080);
    const [isMobile, setMobile] = useState(window.innerWidth < 500);
  
    const updateMedia = () => {
      setDesktop(window.innerWidth > 1081);
      setTablet(window.innerWidth > 500 && window.innerWidth < 1080);
      setMobile(window.innerWidth < 500);
    };
  
    useEffect(() => {
      window.addEventListener("resize", updateMedia);
      return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <section>
            <nav></nav>
            <main>
                <article>
                    <h1>Encyclopédie</h1>
                    <p>Introduction</p>              
                </article>
                <article>
                    <Link to={"/accueil"}>
                        {isMobile && <p>links</p>}
                        {isTablet && <p>links</p>}
                        {isDesktop && <Door />}
                    </Link>
                </article>
            </main>
            <footer>mentions légales</footer>
        </section>
    )
}