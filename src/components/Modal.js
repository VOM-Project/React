import { useEffect } from "react";
import "../pages/homepy-style.css";
import "../pages/homepy-styleguide.css";

import Icon_24 from "../assets/icon_24.svg";

const Modal = (props) => {
    return (
        <div className="modal">
            <div className="text-wrapper-modal">봄봄 신청</div>
            <img className="icon-modal" alt="Icon" src={Icon_24} />
            <div className="div-modal">박서현 님에게 봄봄을 신청할까요?</div>
            <button className="button-modal">
                <div className="text-wrapper-2-modal">신청</div>
            </button>
            <button className="div-wrapper-modal">
                <div className="text-wrapper-3-modal">취소</div>
            </button>
        </div>
    )
}

export default Modal