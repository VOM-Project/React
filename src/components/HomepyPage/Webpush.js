import React from "react";
import "./Webpush.css";
import Icon_24 from "../../assets/icon_24.svg";

const Webpush = ({ onClose, onEnter, fromMemberNickname, createdAt }) => {
    return (
        <div className="modal">
            <div className="text-wrapper-modal">
                봄봄이 당신을 기다려요!
            </div>
            <img className="icon-modal" alt="Icon" src={Icon_24} onClick={onClose} />
            <div className="div-modal">
                <span>{fromMemberNickname}</span>님이 {new Intl.DateTimeFormat('ko-KR', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                }).format(new Date(createdAt))}에 생성한 채팅방
            </div>
            <button className="button-modal" onClick={onEnter}>
                <div className="text-wrapper-2-modal">입장</div>
            </button>
            <button className="div-wrapper-modal" onClick={onClose}>
                <div className="text-wrapper-3-modal">거절</div>
            </button>
        </div>
    );
};

export default Webpush