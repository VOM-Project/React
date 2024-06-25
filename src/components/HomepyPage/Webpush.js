import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Webpush.css";

import Icon_24 from "../../assets/icon_24.svg";


const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
};

const Webpush = ({ onClose, onEnter, fromMemberId }) => {
    const [profile_nickname, setProfile_nickname] = useState();
    useEffect(() => {
        getProfile();
    }, []);

    async function getProfile() {
        await axios
            .get(`/api/homepy/${fromMemberId}/profile`, config)
            .then((response) => {
                console.log(response.data);
                setProfile_nickname(response.data.nickname);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className="modal">
            <div className="text-wrapper-modal">봄봄이 당신을 기다려요!</div>
            <img className="icon-modal" alt="Icon" src={Icon_24} onClick={onClose} />
            <div className="div-modal">{profile_nickname}님이 생성한 채팅방</div>
            <button className="button-modal" onClick={onEnter}>
                <div className="text-wrapper-2-modal">입장</div>
            </button>
            <button className="div-wrapper-modal" onClick={onClose}>
                <div className="text-wrapper-3-modal">거절</div>
            </button>
        </div>
    )
}

export default Webpush