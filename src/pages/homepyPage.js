import React, { useState, useEffect } from "react";
import axios from "axios";

import "./homepy-style.css";
import "./homepy-styleguide.css";
// import Toast from "./components/Toast";
import Profile from "../components/HomepyPage/Profile.js";
import Greeting from "../components/HomepyPage/Greeting.js";
import Album from "../components/HomepyPage/Album.js";
import Webpush from "../components/Webpush.js";
// import SVGInline from 'react-svg-inline'

import Search from "../assets/search.svg";
import Ph_bell_light from "../assets/ph-bell-light.svg";
import Icon from "../assets/icon-50.svg";
import { useNavigate, useParams } from "react-router-dom";

export default function Homepy() {
  /*
   * Authorization
   */
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //   Authorization: `Bearer eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJpZCI6MiwiZW1haWwiOiJqaW1pbkBlbWFpbC5jb20iLCJzdWIiOiJqaW1pbkBlbWFpbC5jb20iLCJpYXQiOjE3MTcyNjkyNzEsImV4cCI6MTcxNzI3MTg2M30.g2hqVzxlrhIzn60EvAppaA2RVywRq3Km1L6mI882B1M`,
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
  const [searchNickname, setSearchNickname] = useState(""); //닉네임 검색
  const navigate = useNavigate();
  const { homepyMemberId } = useParams(); //추후, 상대방 memberId 갖고오기

  useEffect(() => {
    // Axios GET 요청 및 응답 처리
    axios
      .get("http://localhost:8080/api/webpush/2", config)
      .then((response) => {
        setData(response.data);
        // 데이터가 있다면 모달창 표시
        if (response.data.length > 0) {
          setShowModal(true);
        }
      })
      .catch((error) => {
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

  /* 웹캠 방 생성 - 추후 상대방 homepy 완성되면 수정*/
  const handleCreateWebcam = () => {
    // const toMemberId = homepyMemberId; //homepy 모두 완성되면 수정
    const toMemberId = localStorage.getItem("memberId");
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
        console.err(err);
      });
  };
  /*닉네임 검색 결과 페이지 호출 및 연결*/
  const handleSearchNickname = (e) => {
    if (e.key === "Enter") {
      axios
        .get(`api/members/search?nickname=${searchNickname}`, config)
        .then((res) => {
          const isExisted = res.data.existed;
          if (!isExisted) {
            alert("존재하지 않은 유저입니다");
            navigate("/homepy");
            // navigate(-1);
          } else {
            const searchMemberId = res.data.findMemberId;
            const memberNickname = res.data.nickname;
            const memberProfileImgUrl = res.data.profileImgUrl;
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
                  value={searchNickname}
                  onChange={(e) => setSearchNickname(e.target.value)}
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
          <button className="button" onClick={handleCreateWebcam}>
            <img className="img-2" alt="Icon" src={Icon} />
            <div className="text-wrapper-4">화상채팅 시작하기</div>
          </button>
        </div>
        <Profile />
      </div>
    </div>
  );
}
