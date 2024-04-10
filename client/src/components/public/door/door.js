import "./styles.scss";
import "./stylesAnimations.scss"
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
            <Flames roman={roman} />

            

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
            <ul className="fireflies">
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
                <li></li> 
            </ul>        
        </div>

    )
}

export const Flames = (props) => {
    const [colorOne, setColorOne] = useState("")
    const [colorTwo, setColorTwo] = useState("")
    const [numberOfFlames, setNumberOfFlames] = useState()




    useEffect(() => {
        setNumberOfFlames(setRandomNumberOfFlames(10, 20))

        if(props.roman === "Lux Fero") {
            setColorOne("color-one-LF");
            setColorTwo("color-two-LF");
        }else {
            setColorOne("color-one-RM");
            setColorTwo("color-two-RM");
        }
    }, [props.roman])

    useEffect(() => {
        console.log(numberOfFlames)
    })

    

    return (
        <div className="body-flames">
            <ul className="flames">
                {Array.from({length:numberOfFlames}, () => <li className={`${colorOne}`}></li>) }
                {Array.from({length:numberOfFlames}, () => <li className={`${colorTwo}`}></li>) }              
            </ul>        
        </div>

    )
}

function setRandomNumberOfFlames (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}