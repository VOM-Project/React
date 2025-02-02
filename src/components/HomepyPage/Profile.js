import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import "./Profile.css";
import "../../pages/homepy-styleguide.css";

import TouchpointList from "../TouchpointList.js";
import Toast from "../Toast";
import VomvomList from "../VomvomList.js";

import Ic_baseline_people from "../../assets/ic-baseline-people.svg";
import Ic_outline_email from "../../assets/ic-outline-email.svg";
import Mingcute_birthday from "../../assets/mingcute-birthday-2-line.svg";
import Fluent_person from "../../assets/fluent-person-12-regular.svg";
import Mingcute_location from "../../assets/mingcute-location-line.svg";
import Mdi_heart from "../../assets/mdi-heart.svg";
import Ic_baseline_people_white from "../../assets/ic-baseline-people-white.svg";
import ProfileEditModal from "./ProfileEditModal";
import userImg from "../../assets/profile.png"; //기본프로필 이미지를 위함


export default function Profile({ memberId }) {
  /*
   * Authorization
   */
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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

  /*
   * Modal State
   */
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
        setProfile_nickname(response.data.nickname);
        setProfile_vomvomCount(response.data.vomVomCount);
        setProfile_email(response.data.email);
        setProfile_birth(response.data.birth);
        setProfile_region(response.data.region);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*
   * Touchpoint
   */
  const [touchpoints, setTouchpoints] = useState([]);
  const [showTouchpoints, setShowTouchpoints] = useState(false);
  const [showTouchpointToast, setShowTouchpointToast] = useState(false);
  const localMemberId = localStorage.getItem("memberId");

  const handleTouchpointButtonClick = async () => {
    try {
      if (memberId != localMemberId) {
        axios.post(`/api/touchpoint/${memberId}`, null, {
          params: {
            from_member_id: localStorage.getItem("memberId")
          }, headers: config.headers,
        })
          .then(response => {
            if (response.status === 200) {
              console.log('터치포인트가 성공적으로 전송되었습니다');
              setShowTouchpointToast(true);
            } else {
              throw new Error('터치포인트 전송 실패');
            }
          })
      } else {
        axios.get(`/api/touchpoint/${memberId}`, config)
          .then(response => {
            setTouchpoints(response.data);
            setShowTouchpoints(true);
          })
          .catch(error => {
            console.error('오류:', error);
          });
      }
    } catch (error) {
      console.error("Error fetching touchpoints:", error);
    }
  };
  const handleCloseTouchpoints = () => {
    setShowTouchpoints(false);
  }

  /*
   * VomvomList
   */
  const [vomvomList, setVomvomList] = useState([]); // 친구 목록 상태 추가
  const [showVomvomList, setShowVomvomList] = useState(false); // 친구 목록 표시 상태 추가

  const handleVomvomList = () => {
    axios
      .get(`/api/vomvom`, config)
      .then((response) => {
        console.log(response.data.memberDtoList);
        setVomvomList(response.data.memberDtoList); // 응답 데이터 저장
        setShowVomvomList(true); // 친구 목록 표시
      })
      .catch((error) => {
        console.error("Error fetching vomvom list:", error);
      });
  };

  // 봄봄 친구 목록 닫기 핸들러 - 추가된 부분
  const handleCloseVomvomList = () => {
    setShowVomvomList(false); // 친구 목록 숨기기
  };

  /*
   * VomvomToast
   */
  const [showVomvomToast, setShowVomvomToast] = useState(false);

  const handleRequestVomvom = async () => {
    const data = {
      toMemberId: memberId,
      nickname: profile_nickname,
    };

    try {
      const response = await axios.post(
        "/api/vomvom/request",
        data,
        config
      );
      setShowVomvomToast(true);
      console.log("Vomvom request sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending Vomvom request:", error);
    }
  };


  /*
   * Render
   */
  return (
    <div className="profile">
      <div className="frame">
        <img
          className="profile-img"
          alt="profile-img"
          src={profile_profileImgUrl}
        />
        <div className="pink-frame">
          <div className="profile-name">{profile_nickname}</div>
          <div className="vomvom" onClick={handleVomvomList}>
            <div className="vomvom-label">
              <img
                className="people-svg"
                alt="people-svg"
                src={Ic_baseline_people}
              />
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
              <div className="item-label-text">생년월일</div>
            </div>
            <div className="item-value">{profile_birth}</div>
          </div>
          <div className="item">
            <div className="item-label">
              <img className="svg" alt="location-svg" src={Mingcute_location} />
              <div className="item-label-text">지역</div>
            </div>
            <div className="item-value">{profile_region}</div>
          </div>
        </div>
      </div>

      {/* Interaction Section */}
      <div className="interaction">
        <button className="button-white" onClick={handleTouchpointButtonClick}>
          <img className="svg-2" alt="heart-svg" src={Mdi_heart} />
          <div className="button-white-text">터치포인트</div>
        </button>

        {showTouchpoints && (
          <TouchpointList
            touchpoints={touchpoints} // 모달에 touchpoints 전달
            onClose={() => setShowTouchpoints(false)} // 모달 닫기 핸들러
          />
        )}

        {memberId === localMemberId ? (
          <div>
            <button className="button-pink" onClick={() => setModalIsOpen(true)}>
              <div className="button-pink-text">프로필 편집</div>
            </button>
            <ProfileEditModal
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              memberId={memberId}
            />
          </div>
        ) : (
          <button className="button-pink" onClick={handleRequestVomvom}>
            <img
              className="svg-2"
              alt="people_svg"
              src={Ic_baseline_people_white}
            />
            <div className="button-pink-text">봄봄 신청</div>
          </button>
        )}
        {showVomvomToast && (
          <Toast setToast={setShowVomvomToast} text={`
          ${profile_nickname} 님에게 봄봄 신청을 보냈습니다.
        `} />
        )}
      </div>

      {showVomvomList && (
        <VomvomList
          vomvomList={vomvomList}
          onClose={handleCloseVomvomList}
        />
      )}

      {showTouchpointToast && <Toast setToast={setShowTouchpointToast} text={`
    ${profile_nickname} 님에게 터치포인트를 보냈습니다.
  `} />}
    </div>
  );
}
