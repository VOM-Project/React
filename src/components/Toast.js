import { useEffect } from "react";
import "../homepy-style.css";
import "../homepy-styleguide.css";

import Mdi_heart from "../assets/mdi-heart.svg";

function Toast({ setToast, text }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            setToast(false);
        }, 1500);
        return () => {
            clearTimeout(timer);
        };
    }, [setToast]);

    return (
        <div className="toast">
            <div className="frame-toast">
                <img className="mdi-heart-toast" alt="Mdi heart" src={Mdi_heart} />
                <div className="div-wrapper-toast">
                    <div className="text-wrapper-2-toast">박서현 님에게 관심을 보냈습니다</div>
                </div>
            </div>
        </div>
    );
}

export default Toast;