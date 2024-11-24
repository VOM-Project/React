import React from "react";
import "./VomvomModal.css";
import userImg from "../assets/profile.png";

export default function VomvomModal({
    profileUrl,
    nickname,
    onAccept,
    onReject,
    onClose,
}) {
    return (
        <div className="vomvom-modal">
            <div className="modal-content">
                <img
                    src={profileUrl || userImg}
                    alt={`${nickname}'s profile`}
                    className="modal-profile-img"
                />
                <p>{`${nickname} 님께서 봄봄 요청을 보냈습니다.`}</p>
                <button className="pink-button" onClick={onAccept}>
                    수락
                </button>
                <button className="white-button" onClick={onClose}>
                    거절
                </button>
                {/* 거절 기능 추가 */}
            </div>
        </div>
    );
}