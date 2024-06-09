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
import CalleProfile from "../components/WebCam/CalleeProfile.js";
import axios from "axios";
import "./webcam-style.css";

/*roomId도 같이 받기*/
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
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
  left: 30px;
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

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-around;
`;

function WebCamPage() {
  // const reconnect = 0;
  const videoRef = useRef(null); //내비디오
  const anotherVideoRef = useRef(null); //상대 비디오
  const muteBtn = useRef(null); //음소거 버튼
  const cameraBtn = useRef(null); //카메라 버튼
  const camerasSelect = useRef(null);
  const cameraOption = useRef(null);

  const navigate = useNavigate();
  const client = useRef({});
  const connectHeaders = {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };
  const { webcamId } = useParams(); //webcamId 받아오기
  const [selectedFilter, setSelectedFilter] = useState("none"); //filter 설정
  let muted = false;
  let cameraOff = false;
  let stream;
  let myPeerConnection;

  const sender = localStorage.getItem("memberId");
  console.log("현재 보내는 sender id: ", sender);
  /*클라이언트가 수행하는 주고받는 과정*/
  const subscribe = () => {
    client.current.subscribe(
      `/topic/peer/offer/${webcamId}`, //구독하고있는 주소
      async ({ body }) => {
        const data = JSON.parse(body);
        // console.log(data);
        switch (data.type) {
          //3)다른 peer가 입장시 기존 방장(sender)가 offer 생성
          case "ENTER":
            if (data.sender !== sender) {
              //보낸 사람이 현재 클라이언트가 아닌지 확인
              //memberId로 비교,
              console.log(data);
              const offer =
                await myPeerConnection.createOffer(); /*sender(방장)이 offer 생성*/
              myPeerConnection.setLocalDescription(offer); //4)sender의 localdescription을 자신이 생성한 offer로 설정
              client.current.publish({
                destination: `/app/peer/offer/${webcamId}`, //5)offer를 전달할 api 주소,해당 주소로 자신의 offer을 전송한다. 어떤 방에 전달해야하는지도 알려줘야함
                body: JSON.stringify({
                  //5)offer이란 타입과 roomId를 전달함
                  type: "OFFER",
                  webcamId,
                  sender,
                  offer,
                }),
                headers: connectHeaders,
              }); //5) 서버가 이걸 받고 해야할일:  전달받은 roomId를 구독하고 있는 클라이언트들에게 offer란 타입으로 전달받은 offer을 전송
              console.log("오퍼전송");
            }
            break;
          //offer를 수신할 클라이언트들이 실행할 부분 => 오퍼 수신 후 앤서전송
          case "OFFER":
            if (data.sender !== sender) {
              //보낸 사람이 현재 클라이언트가 아닌지 확인
              console.log("오퍼수신");
              myPeerConnection.setRemoteDescription(data.offer); //6) offer를 수신받은 클라이언트는 해당 offer을 remoteDescription으로 설정
              //6)이때, 새로 들어온 클라이언트는 오류가 날수 있음. 왜? peerconnection이 존재하지 않기 때문, 따라서 useEffect로 페이지 입장하자마자 실행할 수 있도록 설정
              const answer = await myPeerConnection.createAnswer(); //7)createAnswer를 생성, 이걸 localDescription으로 설정
              myPeerConnection.setLocalDescription(answer);
              client.current.publish({
                //7) answer을 서버에게 전달
                destination: `/app/peer/answer/${webcamId}`,
                body: JSON.stringify({
                  type: "ANSWER",
                  webcamId,
                  sender,
                  answer,
                }),
                headers: connectHeaders,
              });
              console.log("엔서전송");
            }
            break;
          case "ANSWER":
            if (data.sender !== sender) {
              //방장이 answer 수신
              console.log("엔서수신");
              myPeerConnection.setRemoteDescription(data.answer); // 7) 해당주소를 구독하고 있던 클라이언트(방장)은 answer을 받아 remoteDescription으로 설정
            }
            break;
          case "ICE":
            if (data.sender !== sender) {
              console.log("아이스수신");
              myPeerConnection.addIceCandidate(data.ice);
            }
            break;
          default:
        }
      }
    );
  };
  // 서버와 소켓 연결
  const connect = () => {
    // console.log("webcamId: " + webcamId);
    const socket = new SockJS("https://localhost:8080/signaling");
    client.current = Stomp.over(socket);
    console.log("!!!소켓 연결!!!!");
    client.current.connect(connectHeaders, () => {
      subscribe();
      client.current.publish(
        `/app/peer/offer/${webcamId}`,
        {},
        JSON.stringify({
          type: "ENTER",
          webcamId,
          sender,
        })
      );
    });
    client.current.activate();
  };
  //서버와 소켓 끊음
  const disconnect = () => {
    client.current.deactivate();
  };
  /*방 나가기 핸들러*/
  // 추후 상대방 클라이언트 처리도 생각해야할듯
  const leaveRoom = async () => {
    disconnect();
    const data = { roomId: `${webcamId}` };
    await axios({
      method: "DELETE",
      url: `/api/webcam`,
      data,
      connectHeaders,
    })
      .then((res) => {
        navigate("/homepy");
        // navigate(`/homepy/${memberId}`); //homepy url 바뀌면 수정하기
      })
      .catch((error) => {
        alert(error.data.message);
        navigate("/homepy");
        // navigate(`/homepy/${memberId}`);  //homepy url 바뀌면 수정하기
      });
  };

  //클릭하면 카메라 끄기 핸들러
  function onClickCameraOffHandler() {
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    if (!cameraOff) {
      cameraBtn.current.innerText = "OFF";
      cameraOff = !cameraOff;
    } else {
      cameraBtn.current.innerText = "ON";
      cameraOff = !cameraOff;
    }
  }
  //클릭하면 음소거 핸들러
  function onClickMuteHandler() {
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    if (!muted) {
      muteBtn.current.innerText = "Unmute";
      muted = !muted;
    } else {
      muteBtn.current.innerText = "Mute";
      muted = !muted;
    }
  }
  //카메라 정보 받아오기 함수
  async function getCameras() {
    try {
      // 유저의 장치를 얻어옵니다
      const devices = await navigator.mediaDevices.enumerateDevices();
      // 얻어온 유저의 장치들에서 카메라장치만 필터링 합니다
      const cameras = devices.filter((device) => device.kind === "videoinput");
      // 현재내가 사용중인 카메라의 label명을 셀렉트란에 보여주기위한 과정입니다.
      //  아래의 if문과 이어서 확인 해주세요
      const currentCamera = stream.getVideoTracks()[0];
      cameras.forEach((camera) => {
        cameraOption.current.value = camera.deviceId;
        cameraOption.current.innerText = camera.label;
        if (currentCamera.label === camera.label) {
          cameraOption.current.selected = true;
        }
        camerasSelect.current.appendChild(cameraOption.current);
      });
    } catch (error) {
      console.log(error);
    }
  }
  //클라이언트의 미디어 정보 받아오기 함수
  async function getUserMedia(deviceId) {
    const initialConstrains = {
      video: { facingMode: "user" },
      audio: true,
    };
    const cameraConstrains = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      stream = await navigator.mediaDevices.getUserMedia(
        //webRtc api의 media access 하는 함수
        deviceId ? cameraConstrains : initialConstrains
      );
      videoRef.current.srcObject = stream;
      if (!deviceId) {
        await getCameras();
      }
    } catch (err) {
      console.log(err);
    }
  }
  //
  async function onInputCameraChange() {
    await getUserMedia(camerasSelect.current.value);
    if (myPeerConnection) {
      const videoTrack = stream.getVideoTracks()[0];
      const videoSender = myPeerConnection
        .getSenders()
        .find((sender) => sender.track.kind === "video");
      videoSender.replaceTrack(videoTrack);
    }
  }
  /*makeConnection 함수에 쓰이는 ice 정보를 핸들러하는 함수*/
  function handleIce(data) {
    client.current.publish({
      destination: `/app/peer/iceCandidate/${webcamId}`, //8) 해당 주소를 구독하고 있는 클라이언트들에게 icecandidate를 주고받을 수 있게 전송
      body: JSON.stringify({
        type: "ICE",
        webcamId,
        sender,
        ice: data.candidate,
      }),
      headers: connectHeaders,
    });
    console.log("아이스전송");
  }
  /*makeConnection 함수에 쓰이는 stream 추가 함수*/
  // 상대 클라이언트의 stream을 얻어온 것을 콘솔로 확인
  function handleAddStream(data) {
    anotherVideoRef.current.srcObject = data.stream;
    console.log("got an stream from my peer");
    console.log("Peer's Stream", data.stream);
    console.log("My stream", stream);
  }
  // RTC Peer 커넥션 생성
  function makeConnection() {
    myPeerConnection = new RTCPeerConnection({
      //webRTC API 중 하나
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
          ],
        },
      ],
    });
    myPeerConnection.addEventListener("icecandidate", handleIce); //8)iceCandidate를 주고 받음
    myPeerConnection.addEventListener("addstream", handleAddStream); //9) 상대 클라이언트의 stream을 얻어온다. 연결 끝!
    stream.getTracks().forEach((track) => {
      //2)peer to peer 연결 안에 미디어를 집어 넣어야함.
      myPeerConnection.addTrack(track, stream);
    }); //2) 얻어온 유저의 영상과 오디오 데이터를 스트림에 할당해 주고 getTrack함수를 사용해 저장된 오디오, 비디오 트랙을 가져오고 가져온 각각의 트랙을 mypeerconnection에 넣어줌.
    console.log("peer와 연결 완료");
  }
  // 0) 페이지 넘어가면 바로 미디어 받아오고 RTC Peer 커넥션을 형성, 웹소켓 연결 진행
  async function fetchData() {
    await getUserMedia(); //1)미디어를 얻어오고
    await makeConnection(); //1)RTC peer 커넥션을 생성
    await connect(); //1) 서버와 웹소켓 연결 진행
  }
  useEffect(() => {
    fetchData();
    if (anotherVideoRef.current !== null) {
      // ref가 null이 아닌 경우에 실행할 코드
      console.log("anotherVideoRef is not null");
    } else {
      // ref가 null인 경우에 실행할 코드
      console.log("anotherVideoRef is null");
    }
  }, []);
  /* filter 설정 */
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    videoRef.current.className = event.target.value;
  };
  const handleSuccess = (stream) => {
    window.stream = stream;
    videoRef.current.srcObject = stream;
  };
  const handleError = (error) => {
    console.error(
      "navigator.MediaDevices.getUserMedia error: ",
      error.message,
      error.name
    );
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
            <div>
              <video
                ref={videoRef}
                id="myFace"
                autoPlay
                playsInline
                width={500}
                height={500}
              >
                내비디오
              </video>
              <button ref={muteBtn} onClick={onClickMuteHandler}>
                mute
              </button>
              <button ref={cameraBtn} onClick={onClickCameraOffHandler}>
                camera OFF
              </button>
              <select ref={camerasSelect} onInput={onInputCameraChange}>
                <option>기본</option>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <option ref={cameraOption} value="device" />
              </select>
              <label for="filter">Filter: </label>
              <select
                id="filter"
                value={selectedFilter}
                onChange={handleFilterChange}
              >
                <option value="none">None</option>
                <option value="blur">Blur</option>
              </select>
            </div>
            <div>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                ref={anotherVideoRef}
                id="myFace"
                autoPlay
                playsInline
                width={400}
                height={400}
              >
                상대방 비디오
              </video>
            </div>
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
