import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import userImg from "../../assets/profile.png"; //기본프로필 이미지를 위함
import styled from "styled-components";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { findByLabelText } from "@testing-library/react";
// import { upload } from '@testing-library/user-event/dist/upload';
const customModalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)" /* 반투명한 배경 */,
  },
  content: {
    top: "50%",
    left: "50%",
    padding: "40px",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#FFFFFF",
    width: "30%",
    height: "50%",
  },
};

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.div`
  float: left;
  margin: 10px;
  width: 15vh;
  height: 15vh;
`;

const ProfileImagevalue = styled.img`
  border-radius: 12.5vh;
  width: 15vh;
  height: 15vh;
`;

const ImgBtn = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 10px;
  background-color: rgba(236, 129, 144, 1);
  color: white;
  /* margin: 5px; */
  /* margin-top: 20px; */
  border-color: rgba(236, 129, 144, 0.2);
`;
const ProfileNicknameInput = styled.input`
  width: 70%;
  background-color: rgba(252, 226, 219, 0.5);
  height: 50px;
  border-radius: 5px;
  text-align: left;
  border: none;
`;
const imgSection = styled.div`
  display: flex;
`;

const imgSectionLeft = styled.div`
  position: relative;
  left: 80px;
  top: 50px;
`;

// const NicknameWrapper = styled.div`
//   position: relative;
//   top: 50px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   right: 200px;
// `;

const NicknamePContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  position: relative;
  top: 40px;
  right: 180px;
`;

const Label = styled.p`
  text-align: left;
`;

const NicknameWrapper = styled.div`
  position: relative;
  top: 20px;
`;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  top: 10px;
`;

const CheckButtonContainer = styled.div`
  display: flex;
  align-item: flex-end;
  justify-content: center;
`;
const CheckButton = styled.button`
  position: relative;
  top: 70px;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  background-color: rgba(236, 129, 144, 1);
  color: white;
  margin: 5px;
  margin-top: 20px;
  border-color: rgba(236, 129, 144, 0.2);
`;

Modal.setAppElement("#root");

function ProfileEditModal({ modalIsOpen, setModalIsOpen, memberId }) {
  const [profileData, setProfileData] = useState({
    /*프로필 조회시 받아올 profile data*/
    image: "",
    nickname: "",
  });
  const [uploadImage, setUploadImage] = useState(null); //업로드할 파일객체
  const imageInputRef = useRef(); //input 태그 숨기기 위함
  const loginMemberId = localStorage.getItem("memberId"); //로그인한 memberID
  const navigate = useNavigate();

  /* 프로필 조회 */
  useEffect(() => {
    if (modalIsOpen) {
      if (memberId != loginMemberId) {
        alert("사용자 계정이 아니므로 프로필 편집이 불가능합니다");
        navigate(`/homepy/${memberId}`);
        setModalIsOpen(false);
      } else {
        fetchUserProfile();
      }
    }
  }, [modalIsOpen]);

  if (!modalIsOpen) return null;

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`/api/homepy/${loginMemberId}/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
  //프로필 닉네임 수정 백엔드 전송
  const handleProfileNicknameUpdate = () => {
    const upddateNickname = { nickname: `${profileData.nickname}` };
    axios
      .put("/api/members/nickname", upddateNickname, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        alert("닉네임을 변경했습니다.");
        console.log("닉네임 변경 완료");
      });
  };

  //프로필 이미지 수정 백엔드 전송
  const handleProfileImgUpdate = () => {
    //확인용
    const updateProfileImg = {
      file: uploadImage,
    };

    //백엔드로 전송
    const formData = new FormData();
    formData.append("multipartFile", uploadImage);
    axios
      .put(`/api/members/profileImg`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log("성공");
        alert("프로필 사진을 변경했습니다");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <ModalContainer>
      <Modal
        isOpen={modalIsOpen}
        onReqeustClose={() => setModalIsOpen(false)}
        style={customModalStyles}
        contentLable="Profile Change"
      >
        <imgSection>
          <span className="imgSection_right">
            <p className="imageline">
              <b>프로필 이미지</b>
            </p>
            <ProfileImage>
              {profileData.image && (
                <ProfileImagevalue alt="profileimage" src={profileData.image} />
              )}
            </ProfileImage>
          </span>
          <imgSectionLeft>
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
            <p style={{ color: "gray", fontSize: "small", marginTop: "20px" }}>
              확장자: png,jpg,jpeg/용량:1MB 이하
            </p>
            <ImgBtn onClick={handleProfileImgUpdate} className="imgBtn">
              <b>저장</b>
            </ImgBtn>
          </imgSectionLeft>
        </imgSection>
        <div>
          <NicknamePContainer>
            <Label>
              <b>닉네임</b>
            </Label>
          </NicknamePContainer>
          <NicknameWrapper>
            <p style={{ color: "gray", fontSize: "small", textAlign: "left" }}>
              한글,영문(대소문자),숫자 조합/10자 이하
            </p>
            <NicknameContainer>
              <ProfileNicknameInput
                type="text"
                value={profileData.nickname}
                onChange={handleNicknameChange}
              />
              <ImgBtn onClick={handleProfileNicknameUpdate}>
                <b>저장</b>
              </ImgBtn>
            </NicknameContainer>
          </NicknameWrapper>
        </div>
        <CheckButtonContainer>
          <CheckButton onClick={() => {
            setModalIsOpen(false);
            window.location.reload();
          }}>
            <b>확인</b>
          </CheckButton>
        </CheckButtonContainer>
      </Modal>
    </ModalContainer>
  );
}
export default ProfileEditModal;
