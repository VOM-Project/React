import { useEffect } from "react";
import "../pages/homepy-style.css";
import "../pages/homepy-styleguide.css";

import Icon_24 from "../assets/icon_24.svg";

const Webpush = (props) => {
    return (
        <div className="modal">
            <div className="text-wrapper-modal">봄봄이 당신을 기다려요!</div>
            <img className="icon-modal" alt="Icon" src={Icon_24} />
            <div className="div-modal">박서현 님이 생성한 채팅방</div>
            <button className="button-modal">
                <div className="text-wrapper-2-modal">입장</div>
            </button>
            <button className="div-wrapper-modal">
                <div className="text-wrapper-3-modal">거절</div>
            </button>
        </div>
    )
}

export default Webpush