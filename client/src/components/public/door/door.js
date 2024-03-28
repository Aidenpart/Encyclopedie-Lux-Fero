import "./styles.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


export const Door = (props) => {
    const roman = `${props.roman}`;
    const [doorColor, setDoorColor] = useState("");
    const [panelColor, setPanelColor] = useState("");

    useEffect(() => {
        if(roman === "Lux Fero") {
            setPanelColor("linear-gradient(green, yellow)")
            setDoorColor("linear-gradient(blue, green)")
        }else {
            setPanelColor("linear-gradient(#9198e5, #e66465)")
            setDoorColor("linear-gradient(#e66465, #9198e5)")
        }
    }, [roman])


    return (
        <Link to={`/accueil-${roman.replace(/\s/, "-")}`} state={{roman:roman}}>
            <div className="lintel">
                <img src={`/images/link_${roman.replace(/\s/, "-")}.jpg`} alt="image_lien"/>
                <div id="left-door" className="door"  style={{background: doorColor}}>
                    <div className="shape" style={{background: panelColor}}></div>
                    <div className="shape" style={{background: panelColor}}></div>
                    <div id="left-knob" className="knob"></div>
                </div>
                <div id="right-door" className="door"  style={{background: doorColor}}>
                    <div className="shape" style={{background: panelColor}}></div>
                    <div className="shape" style={{background: panelColor}}></div>
                    <div id="right-knob" className="knob"></div>
                </div>
            </div>
        </Link>
    )
}