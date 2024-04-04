import "./styles.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


export const Door = (props) => {
    const roman = `${props.roman}`;
    const [doorColor, setDoorColor] = useState("");
    const [panelColor, setPanelColor] = useState("");

    useEffect(() => {
        if(roman === "Lux Fero") {
            setPanelColor("darkred, yellow")
            setDoorColor("linear-gradient(darkgrey, black)")
        }else {
            setPanelColor("#020024 0%, #dae7f9 80%")
            setDoorColor("linear-gradient(#e66465, #9198e5)")
        }
    }, [roman])


    return (
        <div className="lintel">
            <Link to={`/accueil-${roman.replace(/\s/, "-")}`} state={{roman:roman}}>
                <img src={`/images/link_${roman.replace(/\s/, "-")}.jpg`} alt="image_lien"/>
            </Link>
            <div id="left-door" className="door"  style={{background: doorColor}}>
                <div className="shape" style={{background: setStylePanel("135", panelColor)}}></div>
                <div className="shape" style={{background: setStylePanel("45", panelColor)}}></div>
                <div id="left-knob" className="knob"></div>
            </div>
            <div id="right-door" className="door"  style={{background: doorColor}}>
                <div className="shape" style={{background: setStylePanel("225", panelColor)}}></div>
                <div className="shape" style={{background: setStylePanel("315", panelColor)}}></div>
                <div id="right-knob" className="knob"></div>
            </div>
        </div>
    )
}


function setStylePanel (orientation, colors) {
    let style = `linear-gradient(${orientation}deg, ${colors}`

    return  style
}


export const Fireflies = () => {


    return (
        <div className="body-fireflies">
            <ul class="fireflies"> 
                <li className="red"></li> 
                <li className="red"></li> 
                <li className="yellow"></li> 
                <li className="red"></li> 
                <li className="yellow"></li> 
                <li className="red"></li> 
                <li className="yellow"></li> 
                <li className="yellow"></li> 
                <li className="red"></li> 
                <li className="yellow"></li> 
                <li className="yellow"></li> 
                <li className="yellow"></li> 
                <li className="red"></li> 
                <li className="yellow"></li> 
                <li className="yellow"></li> 
                <li className="red"></li> 
                <li className="yellow"></li> 
                <li className="yellow"></li> 
                <li className="red"></li> 
                <li className="yellow"></li> 
            </ul>        
        </div>

    )
}