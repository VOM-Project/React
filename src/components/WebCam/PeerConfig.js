import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Icon from "../../assets/icon-50.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const IconImg = styled.img`
  height: 24px;
  margin-bottom: -0.5px;
  margin-top: -0.5px;
  position: relative;
  width: 24px;
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

function PeerConfig({ webcamId, connectHeaders }) {
  const localStreamRef = useRef(null); //내비디오
  const remoteStreamRef = useRef(null); //상대 비디오
  const muteBtn = useRef(null); //음소거 버튼
  const cameraBtn = useRef(null); //카메라 버튼
  const camerasSelect = useRef(null);
  const cameraOption = useRef(null);
  let stream; //내 local 미디어 스트림
  let myPeerConnection; //peer connect 변수
  const client = useRef({}); //stomp
  const sender = localStorage.getItem("memberId");
  const navigate = useNavigate();

  //  카메라 정보 받아오기 함수
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
    console.log("1.미디어 정보 받아오기 start");
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
      console.log("getUserMedia 함수에서 생성된 스트림:", stream);
      localStreamRef.current.srcObject = stream;
      console.log("현재 stream을 localStream에 추가합니다");
      if (!deviceId) {
        await getCameras();
      }
    } catch (err) {
      console.log(err);
    }
  }
  //카메라 옵션 변화 있을때
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
    if (client.current && client.current.connected && data.candidate) {
      client.current.send(
        `/app/peer/iceCandidate/${webcamId}`,
        connectHeaders,
        JSON.stringify({
          type: "ICE",
          webcamId: webcamId,
          sender: sender,
          ice: data.candidate,
        })
      );
      console.log("3.peer connect: ice 전송 + ", data.candidate);
    } else {
      console.warn(
        "STOMP 연결이 설정되지 않았거나 ICE 후보가 유효하지 않습니다."
      );
    }
  }

  /*makeConnection 함수에 쓰이는 stream 추가 함수*/
  // 상대 클라이언트의 stream을 얻어온 것을 콘솔로 확인
  function handleAddStream(data) {
    remoteStreamRef.current.srcObject = data.stream;
    console.log("3.peer connect: 상대 stream 받았습니다");
    console.log("3.peer connect: Peer's Stream + ", data.stream);
    console.log("3.peer connect: My stream + ", stream);
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
    console.log(
      "3.peer connect: peer connect 진행중, 위에 로그가 다 잘 뜨고 이것도 뜨면 ice 전송과 상대 stream이 잘 추가된 것임 "
    );
    stream.getTracks().forEach((track) => {
      //2)peer to peer 연결 안에 미디어를 집어 넣어야함.
      myPeerConnection.addTrack(track, stream);
    }); //2) 얻어온 유저의 영상과 오디오 데이터를 스트림에 할당해 주고 getTrack함수를 사용해 저장된 오디오, 비디오 트랙을 가져오고 가져온 각각의 트랙을 mypeerconnection에 넣어줌.
    console.log("3.peer connect: (위에로그가 다 잘 뜨면) peer와 연결 완료");
  }

  //웹소켓 연결을 위한 함수
  const connectSocket = () => {
    const socket = new SockJS("http://13.125.102.76:8080/signaling");
    client.current = Stomp.over(socket);
    client.current.debug = () => {}; //디버그 안보이게
    client.current.connect(connectHeaders, () => {
      console.log("2. Connected to WebRTC 시그널링 server");
      // 소켓 연결 설정 완료 후에 피어 간 연결 설정
      //처음 연결하면 일단 다 구독해두기
      //iceCandidate peer 교환을 위한 subscribe

      //offer peer 교환을 위한 subscribe
      console.log("2-1.offer 구독");
      client.current.subscribe(
        `/topic/peer/offer/${webcamId}`,
        async ({ body }) => {
          const data = JSON.parse(body);
          if (data.sender !== sender) {
            //현재 로그인 유저가 보낸게 아니라면 수신
            console.log("2-1-1. data를 보내는 사람:", data.sender);
            console.log("2-2-1. 현재 사람:", sender);
            if (data.type === "ENTER") {
              console.log("1.(방에 들어왔을 때) enter 수신 중...");
              const offer = await myPeerConnection.createOffer();
              myPeerConnection.setLocalDescription(offer);
              console.log("생성된 offer:", offer);
              client.current.send(
                `/app/peer/offer/${webcamId}`,
                connectHeaders,
                JSON.stringify({
                  type: "OFFER",
                  webcamId,
                  sender,
                  offer: offer,
                })
              );
              console.log(
                "2.(방에 들어왔을 때) enter 수신 후 offer 전송 완료..."
              );
            }
            if (data.type === "OFFER") {
              console.log("2-2-1.offer 수신 시작 ");
              myPeerConnection.setRemoteDescription(data.offer);
              const answer = await myPeerConnection.createAnswer();
              myPeerConnection.setLocalDescription(answer);
              client.current.send(
                `/app/peer/answer/${webcamId}`,
                connectHeaders,
                JSON.stringify({
                  type: "ANSWER",
                  webcamId,
                  sender,
                  answer: answer,
                })
              );
              console.log(
                "2-2-2. answer을 localdescription으로 설정하고 answer 전송시작"
              );
            }
          }
        }
      );
      //answer peer 교환을 위한 subscribe
      console.log("2-3. answer 구독");
      client.current.subscribe(`/topic/peer/answer/${webcamId}`, ({ body }) => {
        const data = JSON.parse(body); // 해당 key에 해당되는 Peer 에 받은 정보를 setRemoteDescription 해준다.
        if (data.sender !== sender) {
          console.log("2-3-1. answer 수신 및 remoteDescription으로 설정");
          myPeerConnection.setRemoteDescription(data.answer);
        }
      });

      console.log("2-4. ice 구독");
      client.current.subscribe(
        `/topic/peer/iceCandidate/${webcamId}`,
        ({ body }) => {
          const data = JSON.parse(body);
          if (data.sender !== sender) {
            //현재 로그인 유저가 보낸게 아니라면 ice 수신
            console.log("2-4-1.ice 수신 시작 ");
            myPeerConnection.addIceCandidate(data.ice);
          }
        }
      );
      sendOffer(); // 피어 간 연결 설정 완료 후에 offer 전송
      // client.current.activate();
    });
  };

  //send enter
  let sendOffer = async () => {
    client.current.send(
      `/app/peer/offer/${webcamId}`,
      connectHeaders,
      JSON.stringify({
        type: "ENTER",
        webcamId,
        sender,
      })
    );
    console.log("3.(방에 들어왔을 때) enter 전송 중...");
  };

  const disconnect = () => {
    client.current.deactivate();
  };
  const leaveRoom = async () => {
    disconnect();
    const data = { roomId: `${webcamId}` };
    const memberId = localStorage.getItem("memberId");
    await axios({
      method: "DELETE",
      url: `/api/webcam`,
      data,
      headers: connectHeaders,
    })
      .then((res) => {
        navigate(`/homepy/${memberId}`);
      })
      .catch((error) => {
        navigate(`/homepy/${memberId}`);
      });
  };

  //들어오자마자 캠 + 웹소켓 실행
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      await getUserMedia();
      await makeConnection();
      await connectSocket();
    } catch (error) {
      console.error("Error during fetchData:", error);
      // 오류 처리
    }
  }

  return (
    <div>
      <video
        id="localStream"
        autoPlay
        playsInline
        width={500}
        height={500}
        ref={localStreamRef}
      >
        내 비디오
      </video>
      <div id="remoteStreamDiv">
        <video
          autoPlay
          playsInline
          width={500}
          height={500}
          controls
          ref={remoteStreamRef}
        >
          상대방 비디오
        </video>
      </div>
      <ButtonLeave onClick={leaveRoom}>
        <IconImg src={Icon} />
        <TextWrapper4>방 나가기</TextWrapper4>
      </ButtonLeave>
    </div>
  );
}

export default PeerConfig;
