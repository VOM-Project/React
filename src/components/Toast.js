import { useEffect } from "react";
import "./Toast.css";
import "../pages/homepy-styleguide.css";

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
            <img className="mdi-heart-toast" alt="Mdi heart" src={Mdi_heart} />
            <div className="text-wrapper-toast">{text}</div>
        </div>
    );
}

export default Toast;