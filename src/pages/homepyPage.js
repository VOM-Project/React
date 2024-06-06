import React, { useState, useEffect } from 'react';
import axios from "axios";

import "./homepy-style.css";
import "./homepy-styleguide.css";
// import Toast from "./components/Toast";
import Profile from "../components/HomepyPage/Profile.js";
import Greeting from "../components/HomepyPage/Greeting.js";
import Album from "../components/HomepyPage/Album.js";
import Webpush from '../components/Webpush.js';
// import SVGInline from 'react-svg-inline'

import Search from "../assets/search.svg";
import Ph_bell_light from "../assets/ph-bell-light.svg";
import Icon from "../assets/icon-50.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Homepy() {

    /*
     * Authorization
     */
    const config = {
        headers: {
            // Authorization: `${localStorage.getItem("access_token")}`,
            Authorization: `Bearer eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJpZCI6MiwiZW1haWwiOiJqaW1pbkBlbWFpbC5jb20iLCJzdWIiOiJqaW1pbkBlbWFpbC5jb20iLCJpYXQiOjE3MTcyNjkyNzEsImV4cCI6MTcxNzI3MTg2M30.g2hqVzxlrhIzn60EvAppaA2RVywRq3Km1L6mI882B1M`,
        },
    };
    // axios.get('/try', config)
    //     .then(function (response) {
    //         console.log("access_token 값 : " + response.data);
    //         // alert(userId + "님 환영합니다.");
    //         window.location.href = "/";
    //     })
    //     .catch(function (error) {
    //         console.log("오류 " + error);
    //     });

    /*
     * Webpush
     */
    const [data, setData] = useState([]); // API 응답 데이터 저장 상태
    const [showModal, setShowModal] = useState(false); // 모달창 표시 여부 상태

    useEffect(() => {
        // Axios GET 요청 및 응답 처리
        axios.get('http://localhost:8080/api/webpush/2', config)
            .then(response => {
                setData(response.data);
                // 데이터가 있다면 모달창 표시
                if (response.data.length > 0) {
                    setShowModal(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

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
  return (
    <div className="main">
      <div className="div-2">
        <header className="header">
          <div className="frame">
            <div className="input-no-label">
              <div className="input-no-label-2">
                <img className="ic-baseline-people" alt="Search" src={Search} />
                <input
                  className="label"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onKeyDown={(e) => handleSearchNickname(e)}
                  placeholder="닉네임을 검색해보세요"
                />
              </div>
            </div>
            <div className="input-no-label-3">
              <img className="img" alt="Ph bell light" src={Ph_bell_light} />
            </div>
            <img
              className="mask-group"
              alt="Mask group"
              src={require("../assets/Mask-group.png")}
            />
          </div>
          <div className="text-wrapper">VOM</div>
        </header>
        <div className="frame-2">
          <div className="frame-3">
            <Greeting />
            <div className="frame-6">
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
            <Album />
          </div>
          <button className="button" onClick={webcamRoom}>
            <img className="img-2" alt="Icon" src={Icon} />
            <div className="text-wrapper-4">화상채팅 시작하기</div>
          </button>
        </div>
        <Profile />
      </div>
    </div>
  );
}
