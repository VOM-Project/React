import React, { useState, useEffect } from "react";
import axios from "axios";

import "./homepy-style.css";
import "./homepy-styleguide.css";

import Profile from "../components/HomepyPage/Profile.js";
import Header from "../components/Header/Header.js";
import Greeting from "../components/HomepyPage/Greeting.js";
import Keyword from "../components/HomepyPage/Keyword.js";
import Album from "../components/HomepyPage/Album.js";
import FCM from "../components/Notification/fcm.js";
import VomvomModal from "../components/VomvomModal.js";
import Webpush from "../components/HomepyPage/Webpush.js";

import Icon from "../assets/icon-50.svg";
import userImg from "../assets/profile.png"; //기본프로필 이미지를 위함
import { useNavigate, useParams } from "react-router-dom";

export default function Homepy() {
  const { memberId } = useParams();
  const [searchNickname, setSearchNickname] = useState("");

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
  // const ref = useRef();
  const myMemberId = localStorage.getItem("memberId");
  const [profile_profileImgUrl, setProfile_profileImgUrl] = useState();

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    await axios
      .get(`/api/homepy/${myMemberId}/profile`, config)
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
  * Vomvom 요청 처리
  */
  const [vomvomRequests, setVomvomRequests] = useState([]); // Vomvom 요청 데이터를 저장
  const [showVomvomModals, setShowVomvomModals] = useState([]); // 각 요청별 모달창 상태

  useEffect(() => {
    // Vomvom 요청 가져오기
    axios
      .get(`/api/vomvom/request`, config)
      .then((response) => {
        const requests = response.data.memberDtoList || []; // memberDtoList를 가져옴
        setVomvomRequests(requests);
        setShowVomvomModals(new Array(requests.length).fill(true)); // 요청 개수만큼 모달 상태 초기화
      })
      .catch((error) => {
        console.error("Error fetching vomvom requests:", error);
      });
  }, []);

  // 모달창 닫기 처리
  const handleCloseVomvomModal = (index) => {
    setShowVomvomModals((prevState) =>
      prevState.map((show, i) => (i === index ? false : show))
    );
  };

  // 수락 버튼 클릭 처리
  const handleAcceptRequest = (nickname) => {
    const data = { nickname }; // body에 nickname 포함

    axios
      .post(`/api/vomvom/accept`, data, config)
      .then((response) => {
        console.log(`${nickname} 님의 요청을 수락했습니다.`);
        setVomvomRequests((prevRequests) =>
          prevRequests.filter((request) => request.nickname !== nickname)
        );
        setShowVomvomModals((prevState) => prevState.slice(0, -1));
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error accepting request:", error);
        alert("요청을 수락하는 중 오류가 발생했습니다.");
      });
  };

  // 거절 버튼 클릭 처리
  const handleRejectRequest = (nickname) => {
    alert(`${nickname} 님의 요청을 거절했습니다.`);
    // TODO: 거절 API 호출 추가
  };

  /*
   * WebcamModal
   */
  const [webpushData, setWebpushData] = useState([]); // API 응답 데이터 저장 상태
  const [showWebcamModals, setShowWebcamModals] = useState([]); // 모달창 표시 여부 상태
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/webpush/${myMemberId}`, config)
      .then((response) => {
        setWebpushData(response.data);
        setShowWebcamModals(new Array(response.data.length).fill(true));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [myMemberId]);

  const handleCloseModal = (index) => {
    setShowWebcamModals((prevState) =>
      prevState.map((show, i) => (i === index ? false : show))
    );
  };

  const handleEnter = (webcamId) => {
    navigate(`/webcam/${webcamId}`);
    setShowWebcamModals((prevState) => prevState.fill(false));
  };

  /* 웹캠 방 생성*/
  const handleCreateWebcam = () => {
    const toMemberId = memberId;
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
  /*
   * Render
   */
  return (
    <div className="main">
      <FCM />

      {/* Vomvom 요청 모달 */}
      {vomvomRequests.map((request, index) => (
        showVomvomModals[index] && (
          <VomvomModal
            key={index}
            profileUrl={request.profileUrl}
            nickname={request.nickname}
            onAccept={() => handleAcceptRequest(request.nickname)}
            onReject={() => handleRejectRequest(request.nickname)}
            onClose={() => handleCloseVomvomModal(index)}
          />
        )
      ))}

      {/* Webpush 모달 */}
      {webpushData.map((item, index) => (
        <div key={index}>
          {showWebcamModals[index] && (
            <Webpush
              onClose={() => handleCloseModal(index)}
              onEnter={() => handleEnter(item.webcamId)}
              fromMemberNickname={item.fromMemberNickname} // Dto에서 데이터 전달
              createdAt={item.createdAt}
            />
          )}
        </div>
      ))}
      <Header
        searchNickname={searchNickname}
        setSearchNickname={setSearchNickname}
        handleSearchNickname={handleSearchNickname}
        profile_profileImgUrl={profile_profileImgUrl}
      />
      <div className="background">
        <div className="body">
          <Profile memberId={memberId} />
          <div className="homepy">
            <div className="homepy-frame">
              <Greeting memberId={memberId} />
              <Keyword />
              <Album memberId={memberId} />

              {/* 상대방 홈피에서만 화상채팅 버튼 표시 */}
              {memberId != myMemberId &&
                <div className="button-frame">
                  <button className="button-pink" onClick={handleCreateWebcam}>
                    <img className="img-2" alt="Icon" src={Icon} />
                    <div className="text-wrapper-4">화상채팅 시작</div>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
