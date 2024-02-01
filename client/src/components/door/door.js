import "./styles.scss";

export const Door = () => {

    return (
        <div className="lintel">
            <img src="/images/link_Regina-Magicae.jpg" alt="link_RM"/>
            <div id="left-door" className="door">
                <div className="shape"></div>
                <div className="shape"></div>
                <div id="left-knob" className="knob"></div>
            </div>
            <div id="right-door" className="door">
                <div className="shape"></div>
                <div className="shape"></div>
                <div id="right-knob" className="knob"></div>
            </div>
        </div>
    )
}