import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import "./homepy-style.css";
import "./homepy-styleguide.css";
import Search from "../assets/search.svg";
import Ph_bell_light from "../assets/ph-bell-light.svg";
import Icon from "../assets/icon-50.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Profile from "../components/HomepyPage/Profile.js";
import CalleProfile from "../components/WebCam/CalleeProfile.js";
import axios from "axios";
import "./webcam-style.css";
import PeerConfig from "../components/WebCam/PeerConfig.js";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
const WrapperContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
const Header = styled.header`
  background-color: rgba(255, 255, 255, 1);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: rgba(196, 200, 212, 0.5);
  border-left-style: none;
  border-right-style: none;
  border-top-style: none;
  height: 80px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Frame = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  left: 1458px;
  position: absolute;
  top: 16px;
`;
const InputNoLabel = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  width: 100%;
`;

const InputNoLabel2 = styled.div`
  align-items: flex-start;
  align-self: stretch;
  border: 1px solid;
  border-color: var(--brown-30);
  border-radius: 40px;
  display: flex;
  flex: 0 0 auto;
  gap: 8px;
  padding: 12px 16px;
  position: relative;
  width: 270px;
`;
const Label = styled.input`
  color: rgba(84, 69, 73, 0.3);
  flex: 1;
  font-family: "Pretendard-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  height: 24px;
  letter-spacing: 0;
  line-height: 24px;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  border-width: 0;
`;
const InputNoLabel3 = styled.div`
  align-items: center;
  align-self: stretch;
  border: 1px solid;
  border-color: rgba(84, 69, 73, 0.3);
  border-radius: 40px;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  padding: 9px 18px;
  position: relative;
  width: fit-content;
  height: fit-content;
`;
const TextWrapper = styled.div`
  color: rgba(236, 129, 144, 1);
  font-family: "Pretendard-Bold", Helvetica;
  font-size: 32px;
  font-weight: 700;
  height: 38px;
  left: 42px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 20px;
  white-space: nowrap;
`;
const Background = styled.div`
  height: 90%;
  width: 100%;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Body = styled.div`
background-color: var(--background);
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  height: 95%;
  width: 60%;
  min-width: 1020px;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
`;
const Webcam = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  height: 90%;
  overflow: hidden;
  width: 60%;
  min-width: 610px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;
const WebcamFrame = styled.div`
display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 95%;
  width: 95%;
`;
const ButtonLeave = styled.button`
  all: unset;
  align-items: center;
  background-color: rgba(236, 129, 144, 1);
  border-radius: 8px;
  box-sizing: border-box;
  display: inline-flex;
  gap: 10px;
  height: 55px;
  justify-content: center;
  left: 1200px;
  overflow: hidden;
  padding: 16px 24px;
  position: absolute;
  bottom: 10px;
  top: 800px;
`;

const TextWrapper4 = styled.div`
  color: #ffffff;
  font-family: "Pretendard", Helvetica;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.48px;
  line-height: 120.00000476837158%;
  position: relative;
  text-align: right;
  white-space: nowrap;
  width: fit-content;
`;

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-around;
`;

function WebCamPage() {
  const navigate = useNavigate();
  // const client = useRef({});
  const connectHeaders = {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };
  const { webcamId } = useParams(); //webcamId 받아오기
  const [remoteMemberId, setRemoteMemberId] = useState(null);

  return (
    <Wrapper>
      <div className="wrapper-container">
        {/* <Header>
          <Frame>
            <InputNoLabel>
              <InputNoLabel2>
                <img className="ic-baseline-people" alt="Search" src={Search} />
                <Label type="text" placeholder="닉네임을 검색해보세요" />
              </InputNoLabel2>
            </InputNoLabel>
            <InputNoLabel3>
              <img className="img" alt="Ph bell light" src={Ph_bell_light} />
            </InputNoLabel3>
            <img
              className="mask-group"
              alt="Mask group"
              src={require("../assets/Mask-group.png")}
            />
          </Frame>
          <TextWrapper>VOM</TextWrapper>
        </Header> */}
        <Background>
          <Body>
            {remoteMemberId ? (
              <Profile memberId={remoteMemberId} />
            ) : (
              <div>로딩 중...</div>
            )}
            <Webcam>
              <WebcamFrame>
                <PeerConfig
                  webcamId={webcamId}
                  connectHeaders={connectHeaders}
                  setRemoteMemberId={setRemoteMemberId}
                />
              </WebcamFrame>
            </Webcam>
            {/* <CalleProfile
              remoteMemberId={remoteMemberId}
              connectHeaders={connectHeaders}
            /> */}
          </Body>
        </Background>
      </div>
    </Wrapper>
  );
}
export default WebCamPage;
