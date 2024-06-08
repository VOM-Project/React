import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

import "./homepy-style.css";
import "./homepy-styleguide.css";

import Profile from "../components/HomepyPage/Profile.js";
import Greeting from "../components/HomepyPage/Greeting.js";
import Album from "../components/HomepyPage/Album.js";
import Webpush from '../components/Webpush.js';

import Search from "../assets/search.svg";
import Ph_bell_light from "../assets/ph-bell-light.svg";
import Icon from "../assets/icon-50.svg";


export default function Homepy() {
    const { memberId } = useParams();

    /*
     * Authorization
     */
    const config = {
        headers: {
            // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            Authorization: `Bearer eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBleGFtcGxlLmNvbSIsInN1YiI6InRlc3QxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE3NzgyNzU2LCJleHAiOjE3MTc3ODUzNDh9.Oc9EfoTQsq3cFRuBLmBIrGDF7wvrJmcsUdEn13fcFMo`,
        },
    };

    /*
     * Webpush
     */
    const [data, setData] = useState([]); // API 응답 데이터 저장 상태
    const [showModal, setShowModal] = useState(false); // 모달창 표시 여부 상태

    // useEffect(() => {
    //     // Axios GET 요청 및 응답 처리
    //     axios.get('http://13.125.102.76:8080/api/webpush/2', config)
    //         .then(response => {
    //             setData(response.data);
    //             // 데이터가 있다면 모달창 표시
    //             if (response.data.length > 0) {
    //                 setShowModal(true);
    //             }
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, []);

    // axios.get('http://localhost:8080/api/webpush/2', config)
    //     .then(response => {
    //         setData(response.data);
    //         // 데이터가 있다면 모달창 표시
    //         if (response.data.length > 0) {
    //             setShowModal(true);
    //         }
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });

    /*
     * Webcam
     */
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
    const webcamRoom = () => {
        navigate("/webcam");
        /*
        api 연결 
        */
    };
    const handleSearchNickname = (e) => {
        if (e.key === "Enter") {
            /*
              검색 post api 연결, 결과 데이터 받아서 넘기기
              */
            navigate("/search"); /*state 값 넘기기 */
        }
    };

    /*
     * Render
     */
    return (
        <div className="main">
            <div className="background">
                <header className="header">
                    <div className="header-frame">
                        <div className="header-search">
                            <img className="search-svg" alt="Search" src={Search} />
                            <input
                                className="label"
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                onKeyDown={(e) => handleSearchNickname(e)}
                                placeholder="닉네임을 검색해보세요"
                            />
                        </div>
                        <div className="header-notification">
                            <img className="notification-svg" alt="Ph bell light" src={Ph_bell_light} />
                        </div>
                        <img
                            className="header-profile"
                            alt="Mask group"
                            src={require("../assets/Mask-group.png")}
                        />
                    </div>
                    <div className="header-home">VOM</div>
                </header>
                <Profile memberId={memberId} />
                <div className="homepy">
                    <div className="homepy-frame">
                        <Greeting memberId={memberId} />
                        <div className="keyword">
                            <div className="text-wrapper-3">관심 키워드</div>
                            <div className="frame-7">
                                <div className="frame-8">
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#개발</div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#IT</div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#운동</div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">
                                            #테니스
                                        </div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">
                                            #맛집 탐방
                                        </div>
                                    </div>
                                </div>
                                <div className="frame-8">
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">
                                            #강아지
                                        </div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#여행</div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">
                                            #영화 감상
                                        </div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#산책</div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#러닝</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Album memberId={memberId} />
                    </div>
                    <button className="button" onClick={webcamRoom}>
                        <img className="img-2" alt="Icon" src={Icon} />
                        <div className="text-wrapper-4">화상채팅 시작하기</div>
                    </button>
                </div>

            </div>
        </div>
    );
}
