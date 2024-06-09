import React, { useState, useEffect } from "react";
import axios from "axios";

import "./homepy-style.css";
import "./homepy-styleguide.css";

import Profile from "../components/HomepyPage/Profile.js";
import Greeting from "../components/HomepyPage/Greeting.js";
import Album from "../components/HomepyPage/Album.js";
import Webpush from "../components/Webpush.js";

import Search from "../assets/search.svg";
import Ph_bell_light from "../assets/ph-bell-light.svg";
import Icon from "../assets/icon-50.svg";
import userImg from "../assets/profile.png"; //기본프로필 이미지를 위함
import { useNavigate, useParams } from "react-router-dom";
import LogoutButton from "../components/LoginPage/Logout.js";

export default function Homepy() {
    const { memberId } = useParams();

    /*
     * Authorization
     */
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    };

    /*
     * My Profile
     */
    const [profile_profileImgUrl, setProfile_profileImgUrl] = useState();

    useEffect(() => {
        getProfile();
    }, []);

    async function getProfile() {
        await axios
            .get(`/api/homepy/${memberId}/profile`, config)
            .then((response) => {
                console.log(response.data);
                if (response.data.profileImgUrl == null) {
                    setProfile_profileImgUrl(userImg);
                } else {
                    setProfile_profileImgUrl(response.data.profileImgUrl);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /*
     * Webpush
     */
    const [data, setData] = useState([]); // API 응답 데이터 저장 상태
    const [showModal, setShowModal] = useState(false); // 모달창 표시 여부 상태
    const [searchNickname, setSearchNickname] = useState(""); //닉네임 검색
    const navigate = useNavigate();

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

    /* 웹캠 방 생성 - 추후 상대방 homepy 완성되면 수정*/
    const handleCreateWebcam = () => {
        const toMemberId = memberId; //homepy 모두 완성되면 수정
        // const toMemberId = localStorage.getItem("memberId");
        const data = { toMemberId };
        axios
            .post("/api/webcam", data, config)
            .then((res) => {
                console.log("화상채팅 방 생성 완료");
                const webcamId = res.data.webcamId;
                navigate(`/webcam/${webcamId}`);
            })
            .catch((err) => {
                alert("방을 생성할 수가 없습니다.");
                console.log(err);
            });
    };
    /*닉네임 검색 결과 페이지 호출 및 연결*/
    const handleSearchNickname = (e) => {
        if (e.key === "Enter") {
            axios
                .get(`/api/members/search?nickname=${searchNickname}`, config)
                .then((res) => {
                    const isExisted = res.data.existed;
                    if (!isExisted) {
                        alert("존재하지 않은 유저입니다");
                        navigate(`/homepy/${memberId}`);
                    } else {
                        const searchMemberId = res.data.findMemberId;
                        const memberNickname = res.data.nickname;
                        const memberProfileImgUrl =
                            res.data.profileImgUrl === null
                                ? userImg
                                : res.data.profileImgUrl;
                        const memberEmail = res.data.email;
                        const memberBirth = res.data.birth;
                        const memberRegion = res.data.region;

                        const searchResult = {
                            memberNickname,
                            memberProfileImgUrl,
                            memberEmail,
                            memberBirth,
                            memberRegion,
                        };
                        navigate(`/search/${searchMemberId}`, { state: searchResult });
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };
    const handleLogout = () => { };
    /*
     * Render
     */
    return (
        <div className="main">
            <div className="background">
                <header className="header">
                    <div className="header-frame">
                        <LogoutButton />
                        <div className="header-search">
                            <img className="search-svg" alt="Search" src={Search} />
                            <input
                                className="label"
                                type="text"
                                value={searchNickname}
                                onChange={(e) => setSearchNickname(e.target.value)}
                                onKeyDown={(e) => handleSearchNickname(e)}
                                placeholder="닉네임을 검색해보세요"
                            />
                        </div>
                        <div className="header-notification">
                            <img
                                className="notification-svg"
                                alt="Ph bell light"
                                src={Ph_bell_light}
                            />
                        </div>
                        <img
                            className="header-profile"
                            alt="Mask group"
                            src={profile_profileImgUrl}
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
                    <button className="button" onClick={handleCreateWebcam}>
                        <img className="img-2" alt="Icon" src={Icon} />
                        <div className="text-wrapper-4">화상채팅 시작하기</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
