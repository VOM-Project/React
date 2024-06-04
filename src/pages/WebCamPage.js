import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import "./homepy-style.css";
import "./homepy-styleguide.css";
import Search from "../assets/search.svg";
import Ph_bell_light from "../assets/ph-bell-light.svg";
import Icon from "../assets/icon-50.svg";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import styled from "styled-components";
import CalleProfile from "../components/WebCam/CalleeProfile.js";

const Wrapper = styled.div`
  background-color: #f5e1e1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
const WrapperContainer = styled.div`
  background-color: rgba(245, 225, 225, 1);
  height: 1080px;
  position: relative;
  width: 1920px;
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
const Frame2 = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  height: 916px;
  left: 508px;
  overflow: hidden;
  position: absolute;
  top: 122px;
  width: 1386px;
`;
const Frame3 = styled.div`
  align-items: flex-start;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  left: 40px;
  position: absolute;
  top: 40px;
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
function WebCamPage() {
  // const videoRef = useRef(null); //내비디오
  // const anotherVideoRef = useRef(null); //상대 비디오
  // const muteBtn = useRef(null); //음소거 버튼
  // const cameraBtn = useRef(null); //카메라 버튼
  // const camerasSelect = useRef(null);
  // const cameraOption = useRef(null);
  const navigate = useNavigate();
  // const client = useRef({});
  // const connectHeaders = {
  //   Authorization: localStorage.getItem("accessToken"),
  // };
  // const param = useParams();
  // const [messages, setMessages] = useState([]);
  // const messageArray = [];
  // let muted = false;
  // let cameraOff = false;
  // let stream;
  // let myPeerConnection;

  // const sender = localStorage.getItem("userId");
  // console.log("sender: ", sender);
  // const subscribe = () => {
  //   client.current.subscribe(
  //     `/sub/gameroom/${param.roomId}`,
  //     async ({ body }) => {
  //       const data = JSON.parse(body);
  //       // console.log(data);
  //       switch (data.type) {
  //         case "ENTER":
  //           if (data.sender !== sender) {
  //             console.log(data);
  //             const offer = await myPeerConnection.createOffer();
  //             myPeerConnection.setLocalDescription(offer);
  //             client.current.publish({
  //               destination: `/sub/gameroom/${param.roomId}`,
  //               body: JSON.stringify({
  //                 type: "OFFER",
  //                 roomId: param.roomId,
  //                 sender,
  //                 offer,
  //               }),
  //             });
  //             console.log("오퍼전송");
  //           }
  //           break;

  //         case "OFFER":
  //           if (data.sender !== sender) {
  //             console.log("오퍼수신");
  //             myPeerConnection.setRemoteDescription(data.offer);
  //             const answer = await myPeerConnection.createAnswer();
  //             myPeerConnection.setLocalDescription(answer);
  //             client.current.publish({
  //               destination: `/sub/gameroom/${param.roomId}`,
  //               body: JSON.stringify({
  //                 type: "ANSWER",
  //                 roomId: param.roomId,
  //                 sender,
  //                 answer,
  //               }),
  //             });
  //             console.log("엔서전송");
  //           }
  //           break;
  //         case "ANSWER":
  //           if (data.sender !== sender) {
  //             console.log("엔서수신");
  //             myPeerConnection.setRemoteDescription(data.answer);
  //           }
  //           break;
  //         case "ICE":
  //           if (data.sender !== sender) {
  //             console.log("아이스수신");
  //             myPeerConnection.addIceCandidate(data.ice);
  //           }
  //           break;
  //         default:
  //       }
  //     }
  //   );
  // };
  // const connect = () => {
  //   client.current = new StompJs.Client({
  //     webSocketFactory: () => new SockJs(`http://13.209.84.31:8080/ws-stomp`),
  //     connectHeaders,
  //     debug() {},
  //     onConnect: () => {
  //       subscribe();
  //       client.current.publish({
  //         destination: `/sub/gameroom/${param.roomId}`,
  //         body: JSON.stringify({
  //           type: "ENTER",
  //           roomId: param.roomId,
  //           sender,
  //         }),
  //       });
  //     },
  //     onStompError: (frame) => {
  //       console.log(`Broker reported error: ${frame.headers.message}`);
  //       console.log(`Additional details: ${frame.body}`);
  //     },
  //   });
  //   client.current.activate();
  // };
  // const disconnect = () => {
  //   client.current.deactivate();
  // };
  // const leaveRoom = async () => {
  //   disconnect();
  //   await instance
  //     .delete(`rooms/${param.roomId}/exit`)
  //     .then((res) => {
  //       navigate("/rooms");
  //     })
  //     .catch((error) => {
  //       alert(error.data.message);
  //       navigate("/rooms");
  //     });
  // };
  // function onClickCameraOffHandler() {
  //   stream.getVideoTracks().forEach((track) => {
  //     track.enabled = !track.enabled;
  //   });
  //   if (!cameraOff) {
  //     cameraBtn.current.innerText = "OFF";
  //     cameraOff = !cameraOff;
  //   } else {
  //     cameraBtn.current.innerText = "ON";
  //     cameraOff = !cameraOff;
  //   }
  // }
  // function onClickMuteHandler() {
  //   stream.getAudioTracks().forEach((track) => {
  //     track.enabled = !track.enabled;
  //   });
  //   if (!muted) {
  //     muteBtn.current.innerText = "Unmute";
  //     muted = !muted;
  //   } else {
  //     muteBtn.current.innerText = "Mute";
  //     muted = !muted;
  //   }
  // }

  // async function getCameras() {
  //   try {
  //     // 유저의 장치를 얻어옵니다
  //     const devices = await navigator.mediaDevices.enumerateDevices();
  //     // 얻어온 유저의 장치들에서 카메라장치만 필터링 합니다
  //     const cameras = devices.filter((device) => device.kind === "videoinput");
  //     // 현재내가 사용중인 카메라의 label명을 셀렉트란에 보여주기위한 과정입니다.
  //     //  아래의 if문과 이어서 확인 해주세요
  //     const currentCamera = stream.getVideoTracks()[0];
  //     cameras.forEach((camera) => {
  //       cameraOption.current.value = camera.deviceId;
  //       cameraOption.current.innerText = camera.label;
  //       if (currentCamera.label === camera.label) {
  //         cameraOption.current.selected = true;
  //       }
  //       camerasSelect.current.appendChild(cameraOption.current);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function getUserMedia(deviceId) {
  //   const initialConstrains = {
  //     video: { facingMode: "user" },
  //     audio: true,
  //   };
  //   const cameraConstrains = {
  //     audio: true,
  //     video: { deviceId: { exact: deviceId } },
  //   };
  //   try {
  //     stream = await navigator.mediaDevices.getUserMedia(
  //       deviceId ? cameraConstrains : initialConstrains
  //     );
  //     videoRef.current.srcObject = stream;
  //     if (!deviceId) {
  //       await getCameras();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async function onInputCameraChange() {
  //   await getUserMedia(camerasSelect.current.value);
  //   if (myPeerConnection) {
  //     const videoTrack = stream.getVideoTracks()[0];
  //     const videoSender = myPeerConnection
  //       .getSenders()
  //       .find((sender) => sender.track.kind === "video");
  //     videoSender.replaceTrack(videoTrack);
  //   }
  // }

  // function handleIce(data) {
  //   client.current.publish({
  //     destination: `/sub/gameroom/${param.roomId}`,
  //     body: JSON.stringify({
  //       type: "ICE",
  //       roomId: param.roomId,
  //       sender,
  //       ice: data.candidate,
  //     }),
  //   });
  //   console.log("아이스전송");
  // }

  // function handleAddStream(data) {
  //   anotherVideoRef.current.srcObject = data.stream;
  //   console.log("got an stream from my peer");
  //   console.log("Peer's Stream", data.stream);
  //   console.log("My stream", stream);
  // }
  // function makeConnection() {
  //   myPeerConnection = new RTCPeerConnection({
  //     iceServers: [
  //       {
  //         urls: [
  //           "stun:stun.l.google.com:19302",
  //           "stun:stun1.l.google.com:19302",
  //           "stun:stun2.l.google.com:19302",
  //           "stun:stun3.l.google.com:19302",
  //           "stun:stun4.l.google.com:19302",
  //         ],
  //       },
  //     ],
  //   });
  //   myPeerConnection.addEventListener("icecandidate", handleIce);
  //   myPeerConnection.addEventListener("addstream", handleAddStream);
  //   stream.getTracks().forEach((track) => {
  //     myPeerConnection.addTrack(track, stream);
  //   });
  // }

  // async function fetchData() {
  //   await getUserMedia();
  //   await makeConnection();
  //   await connect();
  // }
  // useEffect(() => {
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const leaveRoom = () => {
    navigate("/homepy");
  };
  return (
    <Wrapper>
      <WrapperContainer>
        <Header>
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
        </Header>
        <Frame2>
          <Frame3>
            <ButtonLeave onClick={leaveRoom}>
              <img className="img-2" alt="Icon" src={Icon} />
              <TextWrapper4>방 나가기</TextWrapper4>
            </ButtonLeave>
          </Frame3>
        </Frame2>
        <CalleProfile />
      </WrapperContainer>
    </Wrapper>
  );
}
export default WebCamPage;
