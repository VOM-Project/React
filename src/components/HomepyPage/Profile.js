import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import "./Profile.css";
import "../../pages/homepy-styleguide.css";

// import Touchpoint from "../HomepyPage/Touchpoint.js";

import Ic_baseline_people from "../../assets/ic-baseline-people.svg";
import Ic_outline_email from "../../assets/ic-outline-email.svg";
import Mingcute_birthday from "../../assets/mingcute-birthday-2-line.svg";
import Fluent_person from "../../assets/fluent-person-12-regular.svg";
import Mingcute_location from "../../assets/mingcute-location-line.svg";
import Mdi_heart from "../../assets/mdi-heart.svg";
import Ic_baseline_people_white from "../../assets/ic-baseline-people-white.svg";
import ProfileModal from "./ProfileModal";

const ModalButtonContainer = styled.div`
  display: inline-flex;
  position: relative;
  top: 750px;
  right: 95px;
  align-items: flex-start;
`;

const ModalButton = styled.button`
  color: white;
  background-color: rgba(236, 129, 144, 1);
  border-radius: 8px;
  border-color: rgba(236, 129, 144, 0.2);
  width: 150px;
  height: 50px;
`;



export default function Profile({ memberId }) {


    // var visitingMemberId = 1;
    var memberId = 1;


    /*
     * Authorization
     */
    const config = {
        headers: {
            // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            Authorization: `Bearer eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBleGFtcGxlLmNvbSIsInN1YiI6InRlc3QxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE3Nzg5ODA5LCJleHAiOjE3MjA0NjgyMDl9.dSVUDBi7AD6HKJqp5t-HIvsTHA97znaJvDVpBdbWSuM`,
        },
    };

    /*
     * Member Profile
     */
    const [profile_profileImgUrl, setProfile_profileImgUrl] = useState();
    const [profile_nickname, setProfile_nickname] = useState();
    const [profile_vomvomCount, setProfile_vomvomCount] = useState();
    const [profile_email, setProfile_email] = useState();
    const [profile_birth, setProfile_birth] = useState();
    const [profile_region, setProfile_region] = useState();

    useEffect(() => {
        getProfile();
    }, []);

    async function getProfile() {
        await axios
            .get(`/api/homepy/${memberId}/profile`, config)
            .then(response => {
                console.log(response.data);
                setProfile_profileImgUrl(response.data.profileImgUrl);
                setProfile_nickname(response.data.nickname);
                setProfile_vomvomCount(response.data.vomVomCount);
                setProfile_email(response.data.email);
                setProfile_birth(response.data.birth);
                setProfile_region(response.data.region);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    /* 
     * Touchpoint
     */
    const [touchpoints, setTouchpoints] = useState([]);
    const [showTouchpoints, setShowTouchpoints] = useState(false);

    const handleButtonClick = async () => {
        try {
            const response = await axios.get(`/api/touchpoint/${memberId}`, config);
            setTouchpoints(response.data);
            setShowTouchpoints(true);
        } catch (error) {
            console.error('Error fetching touchpoints:', error);
        }
    };

    /*
     * Render
     */
    return (
        <div className="profile" >
            <div className="frame">
                <img className="profile-img" alt="profile-img" src={profile_profileImgUrl} />
                <div className="pink-frame">
                    <div className="profile-name">{profile_nickname}</div>
                    <div className="vomvom">
                        <div className="vomvom-label">
                            <img className="people-svg" alt="people-svg" src={Ic_baseline_people} />
                            <div className="vomvom-label-text">봄봄</div>
                        </div>
                        <div className="vomvom-count">{profile_vomvomCount}</div>
                    </div>
                </div>
                <div className="info">
                    <div className="item">
                        <div className="item-label">
                            <img className="svg" alt="email-svg" src={Ic_outline_email} />
                            <div className="item-label-text">이메일</div>
                        </div>
                        <div className="item-value">{profile_email}</div>
                    </div>
                    <div className="item">
                        <div className="item-label">
                            <img className="svg" alt="birthday-svg" src={Mingcute_birthday} />
                            <div className="item-label">생년월일</div>
                        </div>
                        <div className="item-value">{profile_birth}</div>
                    </div>
                    <div className="item">
                        <div className="item-label">
                            <img className="svg" alt="location-svg" src={Mingcute_location} />
                            <div className="item-label">지역</div>
                        </div>
                        <div className="item-value">{profile_region}</div>
                    </div>
                </div>
            </div>
            <div className="interaction">
                <button className="button-white" onClick={handleButtonClick}>
                    <img className="svg-2" alt="heart-svg" src={Mdi_heart} />
                    <div className="button-white-text">터치포인트</div>
                </button>

                {/* {showTouchpoints && (
                            <Touchpoint touchpoints={touchpoints} />
                        )} */}

                <button className="button-pink">
                    <img className="svg-2" alt="people_svg" src={Ic_baseline_people_white} />
                    <div className="button-pink-text">봄봄 신청하기</div>
                </button>
            </div>
        </div >
    );
}
