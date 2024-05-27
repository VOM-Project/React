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
  position: absolute; //배치기준이 상위요소 기준
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
`;
const CursorImg = styled.img`
  width: 200px;
  height: 200px;
`;
const BoxContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ButtonCheck = styled.button`
  width: 500px;
  height: 55px;
  color: rgba(236, 129, 144, 0.9);
`;

function JoinPage() {
  const [nickname, setNickname] = useState("");
  const [region, setRegion] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const birthDate = `${birthYear}-${birthMonth}-${birthDay}`;
    const memberData = { nickname, region, birthDate, keyword };
    try {
      const response = await axios.post("서버 주소 쓰셍", memberData);
      //서버 응답 처리
      console.log("Success : ", response.data);
      alert("회원가입이 성공적으로 완료되었습니다");
      navigate("/hompy");
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
          <InputKeyword />
          <div>
            <button onClick={handleSubmit}>확인</button>
          </div>
        </BoxContent>
      </CenterBox>
    </StyledJoinPage>
  );
}

export default JoinPage;
