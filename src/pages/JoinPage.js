import styled from "styled-components";
import window from "../assets/window.png";
import cursor from "../assets/cursor.png";
import LogoBox from "../components/Join/LogoBox";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputNickname from "../components/Join/InputNickname";
import InputRegion from "../components/Join/InputRegion";
import InputBirth from "../components/Join/InputBirth";
import InputKeyword from "../components/Join/InputKeyword";

const StyledJoinPage = styled.div`
  background-color: rgb(229, 229, 229, 0.8); /* 배경색 지정 */
  height: 120vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CenterBox = styled.div`
  position: relative;
  text-align: center;
`;
const WindowImg = styled.img`
  width: 100%;
  height: 100%;
  max-width: 700px;
`;
const CursorImageWrapper = styled.div`
  position: absolute; //배치기준이 상위요소 기준, 상위요소는 relative로 설정
  bottom: 0;
  right: 0;
  transform: translate(
    50%,
    50%
  ); //이미 만들어진 태그, 혹은 이미지를 늘리거나 회전시킬 때 사용함
`;
const CursorImg = styled.img`
  width: 200px;
  height: 200px;
`;
const BoxContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(
    -50%,
    -50%
  ); //레이아웃 배치를 바꾸는게 아니라 보이는 것만 이동시킴
`;

const ButtonCheck = styled.button`
  width: 20%;
  height: 30px;
  background-color: rgba(236, 129, 144, 0.8);
  position: relative;
  bottom: 30px;
  border-radius: 12px;
  border-color: rgba(236, 129, 144, 0.5);
  color: white;
`;

function JoinPage() {
  const [nickname, setNickname] = useState("");
  const [region, setRegion] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [keyword, setKeyword] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const birth = `${birthYear}-${birthMonth}-${birthDay}`;
    const memberId = localStorage.getItem("memberId");
    const memberData = { memberId, nickname, region, birth, keyword };
    try {
      const response = await axios.post("/api/members/join", memberData);
      //서버 응답 처리
      console.log("Success : ", response.data);
      alert("회원가입이 성공적으로 완료되었습니다");
      navigate("/homepy");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <StyledJoinPage>
      <CenterBox>
        <WindowImg src={window} />
        <CursorImageWrapper>
          <CursorImg src={cursor} />
        </CursorImageWrapper>
        <BoxContent>
          <LogoBox />
          <InputNickname nickname={nickname} setNickname={setNickname} />
          <InputRegion region={region} setRegion={setRegion} />
          <InputBirth
            birthYear={birthYear}
            setBirthYear={setBirthYear}
            birthMonth={birthMonth}
            setBirthMonth={setBirthMonth}
            birthDay={birthDay}
            setBirthDay={setBirthDay}
          />
          <InputKeyword keyword={keyword} setKeyword={setKeyword} />
          <div>
            <ButtonCheck onClick={handleSubmit}>확인</ButtonCheck>
          </div>
        </BoxContent>
      </CenterBox>
    </StyledJoinPage>
  );
}

export default JoinPage;
