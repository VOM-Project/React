import React from "react";
import axios from "axios";
import "./Touchpoint.css";
import "../../pages/homepy-styleguide.css";

import Icon_24 from "../../assets/icon_24.svg";

export default function Touchpoint({ onClose, touchpoints }) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    };

    async function getProfile(fromMemberId) {
        await axios
            .get(`/api/homepy/${fromMemberId}/profile`, config)
            .then((response) => {
                console.log(response.data);
                return response.data.nickname;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="touchpoint">
            <img className="icon-modal" alt="Icon" src={Icon_24} onClick={onClose} />
            <div className="overlap-group">
                <div className="menu">
                    {touchpoints.map((touchpoint, index) => (
                        <div key={index} className="menu-item">
                            <div className="div">
                                <img className="profile-img" alt={`Profile of member ${touchpoint.fromMemberId}`} src={touchpoint.fromMemberProfileImgUrl} />
                                <div className="text-wrapper">Member ID: {(touchpoint.fromMemberId)}</div>
                                <div className="text-wrapper">{new Date(touchpoint.createdAt).toLocaleString()}</div>
                                <div className="text-wrapper"></div>
                            </div>
                        </div>
                    ))}
                    {/* <div className="menu-item">
                        <div className="div">
                            <img className="ellipse" alt="Ellipse" src="image.png" />
                            <div className="text-wrapper">최수빈</div>
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="div">
                            <img className="ellipse" alt="Ellipse" src="ellipse-1495.svg" />
                            <div className="text-wrapper">박서아</div>
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="div">
                            <img className="ellipse" alt="Ellipse" src="image.svg" />
                            <div className="text-wrapper">윤하린</div>
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="div">
                            <img className="ellipse" alt="Ellipse" src="ellipse-1495-2.svg" />
                            <div className="text-wrapper">오민준</div>
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="div">
                            <img className="ellipse" alt="Ellipse" src="ellipse-1495-3.svg" />
                            <div className="text-wrapper">김지윤</div>
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="div">
                            <img className="ellipse" alt="Ellipse" src="ellipse-1495-4.svg" />
                            <div className="text-wrapper">오지윤</div>
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="div">
                            <img className="ellipse" alt="Ellipse" src="ellipse-1495-5.svg" />
                            <div className="text-wrapper">박은서</div>
                        </div>
                    </div> */}
                </div>
                <div className="rectangle" />
            </div>
        </div>
    );
};
