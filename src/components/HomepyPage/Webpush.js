import React from "react";
import "./Webpush.css";
import "../../pages/homepy-styleguide.css";
import Icon_24 from "../../assets/icon_24.svg";

const Webpush = ({ onClose, onEnter, fromMemberNickname, createdAt }) => {
    return (
        <div className="webpush-modal">
            <div className="modal-content">
                <div className="modal-title">
                    봄봄이 당신을 기다려요!
                </div>
                {/* <img className="icon-modal" alt="Icon" src={Icon_24} onClick={onClose} /> */}
                <div className="modal-text">
                    <span>{fromMemberNickname}</span>님이 {new Intl.DateTimeFormat('ko-KR', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                    }).format(new Date(createdAt))}에 생성한 채팅방
                </div>
                <div>
                    <button className="pink-button" onClick={onEnter}>
                        입장
                    </button>
                    <button className="white-button" onClick={onClose}>
                        거절
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Webpush