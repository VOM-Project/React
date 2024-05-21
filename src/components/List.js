import { useEffect } from "react";
import "../homepy-style.css";
import "../homepy-styleguide.css";


const List = (props) => {
    return (
        <div className="frame-vomvom">
            <div className="overlap-group-vomvom">
                <div className="menu-vomvom">
                    <div className="menu-item-vomvom">
                        <div className="div-vomvom">
                            <img className="ellipse-vomvom" alt="Ellipse" src={require("./assets/ellipse-1495.png")} />
                            <div className="text-wrapper-vomvom">오수아</div>
                        </div>
                    </div>
                    <div className="menu-item-vomvom">
                        <div className="div-vomvom">
                            <img className="ellipse-vomvom" alt="Ellipse" src={require("./assets/ellipse-1496.png")} />
                            <div className="text-wrapper-vomvom">최수빈</div>
                        </div>
                    </div>
                </div>
                <div className="rectangle-vomvom" />
            </div>
        </div>
    )
}

export default Modal