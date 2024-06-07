import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import userImg from "../../assets/profile.png"; //기본프로필 이미지를 위함
import styled from "styled-components";
import Modal from "react-modal";
// import { upload } from '@testing-library/user-event/dist/upload';
const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalButton = styled.button`
  margin-left: 100px;
  color: white;
  background-color: rgba(236, 129, 144, 0.8);
  border-radius: 10px;
  border-color: rgba(236, 129, 144, 0.5);
`;

const ModalContainer = styled.div`
  display: flex;
`;

const ProfileImage = styled.div`
  float: left;
  margin: 10px;
  width: 15vh;
  height: "auto";
`;

const ProfileImagevalue = styled.img`
  border-radius: 12.5vh;
  width: 25vh;
  height: "auto";
`;

Modal.setAppElement("#root");

function ProfileModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    /*프로필 조회시 받아올 profile data*/
    image: "",
    nickname: "",
  });
  const [uploadImage, setUploadImage] = useState(null); //업로드할 파일객체
  const imageInputRef = useRef(); //input 태그 숨기기 위함

  /* 프로필 조회 */
  useEffect(() => {
    setModalIsOpen(true);
    if (modalIsOpen) {
      fetchUserProfile();
    }
  }, [modalIsOpen]);

  // const memberId = localStorage.getItem("memberId");

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`/api/members/profile/${memberId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bear ${localstorage.getItem("accessToken")}`,
        },
      });
      console.log("프로필 조회 성공");
      setProfileData({
        ...profileData,
        nickname: response.data.nickname,
        image: response.data.profileImgUrl
          ? response.data.profileImgUrl
          : userImg, //profile img url이 null이면 기본이미지로 조회
      });
    } catch (error) {
      console.error("프로필 정보를 가져오는 중 오류 발생:", error);
    }
  };

  if (!modalIsOpen) return null;

  const handleImageChange = (e) => {
    //업로드
    // 이미지를 업로드 및 상태 업데이트
    const uploadedImage = e.target.files[0];
    setUploadImage(uploadedImage); //파일객체로 저장
    setProfileData({
      ...profileData,
      image: URL.createObjectURL(uploadedImage),
    }); //미리보기 이미지 저장
  };

  const handleUploadClick = () => {
    imageInputRef.current.click();
  };

  //닉네임 변경
  const handleNicknameChange = (event) => {
    setProfileData({ ...profileData, nickname: event.target.value });
  };
  //프로필 수정 백엔드 전송
  const handleProfileUpdate = () => {
    //확인용
    const updateProfile = {
      memberId: memberId,
      name: profileData.nickname,
      file: uploadImage,
    };

    //백엔드로 전송
    const formData = new FormData();
    formData.append("image", uploadImage);
    axios
      .post(
        `/profiles?memberId=${memberId}&name=${profileData.nickname}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log("성공");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    setModalIsOpen(false); //모달 닫기
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onReqeustClose={() => setModalIsOpen(false)}
        style={customModalStyles}
        contentLable="Profile Change"
      >
        <div className="imgSection">
          <span className="imgSection_right">
            <p className="imageline">
              <b>프로필 이미지</b>
            </p>
            <div className="ProfileImage">
              {profileData.image && (
                <img
                  className="ProfileImagevalue"
                  alt="profileimage"
                  src={profileData.image}
                />
              )}
            </div>
          </span>
          <span className="imgSection_left">
            {/*이미지 업로드 버튼*/}
            <input
              type="file"
              id="input-file"
              ref={imageInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
            <button
              for="input-file"
              className="imgBtn"
              onClick={handleUploadClick}
            >
              <b>이미지 업로드</b>
            </button>
            {/*이미지 삭제*/}
            {/* <button onClick={handleImageDelete} className="imgBtn"> */}
              <b>이미지 삭제</b>
            </button>
            <p style={{ color: "gray", fontSize: "small", marginTop: "20px" }}>
              확장자: png,jpg,jpeg/용량:1MB 이하
            </p>
          </span>
        </div>
        <div>
          <p style={{ textAlign: "left" }}>
            <b>닉네임</b>
          </p>
          <p style={{ color: "gray", fontSize: "small", textAlign: "left" }}>
            한글,영문(대소문자),숫자 조합/2~18자 이하
          </p>
          <input
            type="text"
            value={profileData.nickname}
            onChange={handleNicknameChange}
            className="nicknameInput"
          />
        </div>

        <span>
          <p style={{ textAlign: "left" }}>
            <b>연동 e-mail</b>
          </p>
          <div
            style={{
              backgroundColor: "rgba(252, 226, 219, 0.5)",
              height: "30px",
              borderRadius: "5px",
              textAlign: "left",
              width: "100%",
            }}
          >
            <p>{profileData.email}</p>
          </div>
        </span>

        <button onClick={handleProfileUpdate} className="imgBtn">
          <b>저장</b>
        </button>
      </Modal >
    </div >
  );
}
export default ProfileModal;
