import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Icon from "../../assets/icon-50.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VideoCamera from "../../assets/videocamera.png";
import Mute from "../../assets/microphone.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 95%;
  width: 95%;
`;

const VideoWrapper = styled.div`
  display: flex;
  position: relative;
`;
const MyVideoWrapper = styled.div`
transform: scaleX(-1);
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
`;

const ButtonMute = styled.button`
  all: unset;
  align-items: center;
  background-color: rgba(236, 129, 144, 1);
  border-radius: 8px;
  box-sizing: border-box;
  display: inline-flex;
  gap: 10px;
  height: 40px;
  overflow: hidden;
  justify-content: center;
  /* left: 1200px; */
  /* overflow: hidden; */
  padding: 16px 24px;
  /* position: absolute; */
  /* bottom: 10px; */
  /* top: 800px; */
  cursor: pointer;
`;

const ButtonCamera = styled.button`
  all: unset;
  align-items: center;
  background-color: rgba(236, 129, 144, 1);
  border-radius: 8px;
  box-sizing: border-box;
  display: inline-flex;
  gap: 10px;
  height: 40px;
  overflow: hidden;
  justify-content: center;
  /* left: 1200px; */
  /* overflow: hidden; */
  padding: 16px 24px;
  /* position: absolute; */
  /* bottom: 10px; */
  /* top: 800px; */
  cursor: pointer;
`;

const ButtonLeave = styled.button`
  all: unset;
  align-items: center;
  background-color: rgba(236, 129, 144, 1);
  border-radius: 8px;
  box-sizing: border-box;
  display: inline-flex;
  gap: 10px;
  height: 40px;
  justify-content: flex-end;
  overflow: hidden;
  padding: 0px 24px;
  margin-left: 350px;
  cursor: pointer;
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

function PeerConfig({ webcamId, connectHeaders, setRemoteMemberId }) {
  const localStreamRef = useRef(null); //내비디오
  const remoteStreamRef = useRef(null); //상대 비디오
  const muteBtn = useRef(null); //음소거 버튼
  const cameraBtn = useRef(null); //카메라 버튼
  const camerasSelect = useRef(null);
  const cameraOption = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState("none"); //filter 설정
  const canvasRef = useRef(null);
  const filteredStreamRef = useRef(null);
  const videoTracks = useRef([]);

  let muted = false;
  let cameraOff = false;
  let stream; //내 local 미디어 스트림
  let myPeerConnection; //peer connect 변수
  const client = useRef({}); //stomp
  const sender = localStorage.getItem("memberId");
  const navigate = useNavigate();

  //  클릭하면 카메라 끄기 핸들러
  function onClickCameraOffHandler() {
    stream = localStreamRef.current.srcObject;
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
    stream = localStreamRef.current.srcObject;
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

  /* filter 설정 */
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    localStreamRef.current.className = event.target.value;
    // applyFilter();
  };
  // const handleSuccess = (stream) => {
  //   window.stream = stream;
  //   localStreamRef.current.srcObject = stream;
  // };
  // const handleError = (error) => {
  //   console.error(
  //     "navigator.MediaDevices.getUserMedia error: ",
  //     error.message,
  //     error.name
  //   );
  // };

  // const applyFilter = () => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");

  //   const drawFrame = () => {
  //     if (localStreamRef.current.readyState === "playing") {
  //       canvas.width = localStreamRef.current.videoWidth;
  //       canvas.height = localStreamRef.current.videoHeight;
  //       context.filter = selectedFilter === "blur" ? "blur(5px)" : "none";
  //       context.drawImage(
  //         localStreamRef.current,
  //         0,
  //         0,
  //         canvas.width,
  //         canvas.height
  //       );
  //     }
  //     requestAnimationFrame(drawFrame);
  //   };

  //   drawFrame();

  //   const filteredStream = canvas.captureStream(30); // 30 fps
  //   filteredStreamRef.current.srcObject = filteredStream;

  //   const videoTrack = filteredStream.getVideoTracks()[0];
  //   if (videoTracks.current.length > 0) {
  //     videoTracks.current.forEach((track) => track.stop());
  //   }
  //   videoTracks.current = [videoTrack];

  //   const senders = myPeerConnection.getSenders();
  //   senders.forEach((sender) => {
  //     if (sender.track.kind === "video") {
  //       sender.replaceTrack(videoTrack);
  //     }
  //   });
  // };

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
        const option = document.createElement("option");
        option.value = camera.deviceId;
        option.innerText = camera.label;
        if (currentCamera.label === camera.label) {
          option.selected = true;
        }
        camerasSelect.current.appendChild(option);
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
      return stream;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  //카메라 옵션 변화 있을때(노트북, 외장캠 등)..
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
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
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
    const socket = new SockJS("http://52.79.109.10:8080/signaling");
    client.current = Stomp.over(socket);
    client.current.debug = () => { }; //디버그 안보이게
    client.current.connect(connectHeaders, () => {
      console.log("2. Connected to WebRTC 시그널링 server");
      // 소켓 연결 설정 완료 후에 피어 간 연결 설정
      //처음 연결하면 일단 다 구독해두기

      //iceCandidate peer 교환을 위한 subscribe

      console.log("2-0. ice 구독");
      client.current.subscribe(
        `/topic/peer/iceCandidate/${webcamId}`,
        ({ body }) => {
          const data = JSON.parse(body);
          if (data.sender !== sender) {
            //현재 로그인 유저가 보낸게 아니라면 ice 수신
            console.log("2-0-1.ice 수신 시작 ");
            myPeerConnection.addIceCandidate(data.ice);
          }
        }
      );

      //offer/enter peer 교환을 위한 subscribe
      console.log("2-1.offer인지 enter인지 구독");
      client.current.subscribe(
        `/topic/peer/offer/${webcamId}`,
        async ({ body }) => {
          const data = JSON.parse(body);
          if (data.sender !== sender) {
            //현재 로그인 유저가 보낸게 아니라면 수신
            console.log("2-1-1. data를 보내는 사람:", data.sender);
            console.log("2-2-1. 현재 사람:", sender);
            if (data.type === "ENTER") {
              console.log("2-1-2.(방에 들어왔을 때) enter 수신 중...");
              const offer = await myPeerConnection.createOffer();
              myPeerConnection.setLocalDescription(offer);
              console.log("2-1-2. 생성된 offer:", offer);
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
                "2-1-3.(방에 들어왔을 때) enter 수신 후 offer 전송 완료..."
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

      console.log("2-4. leaveRoom 구독");
      client.current.subscribe(
        `/topic/peer/leaveRoom/${webcamId}`,
        ({ body }) => {
          const data = JSON.parse(body);
          if (data.sender !== sender) {
            console.log("상대방 나가는 것 감지");
            remoteStreamRef.current.srcObject = null;
            alert("상대방이 나갔습니다. 내 홈페이지로 나갑니다");
            disconnect();
            navigate(`/homepy/${localStorage.getItem("memberId")}`);
            window.location.reload();
          }
        }
      );
      //send enter
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
      // sendOffer(); // 피어 간 연결 설정 완료 후에 offer 전송
      // client.current.activate();
    });
  };

  let sendOffer = () => {
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
    if (myPeerConnection) {
      myPeerConnection.close();
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const leaveRoom = async () => {
    disconnect();
    const data = { roomId: `${webcamId}` };
    const memberId = localStorage.getItem("memberId");
    client.current.send(
      `/app/peer/leaveRoom/${webcamId}`,
      connectHeaders,
      JSON.stringify({
        type: "LEAVE",
        webcamId,
        sender,
      })
    );
    console.log("나가기 메세지 전송 완료");
    await axios({
      method: "DELETE",
      url: `/api/webcam`,
      data,
      headers: connectHeaders,
    })
      .then((res) => {
        navigate(`/homepy/${memberId}`);
        window.location.reload();
      })
      .catch((error) => {
        navigate(`/homepy/${memberId}`);
        window.location.reload();
      });
  };

  //들어오자마자 캠 + 웹소켓 실행
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      axios
        .get(`/api/webcam/${webcamId}/remote`, { headers: connectHeaders })
        .then((res) => {
          console.log("webcam 상대방 memberId:", res.data);
          setRemoteMemberId(res.data.memberId);
        })
        .catch((error) => {
          console.log(error);
        });
      await getUserMedia();
      await makeConnection();
      await connectSocket();
    } catch (error) {
      console.error("Error during fetchData:", error);
      // 오류 처리
    }
  }

  return (
    <Wrapper>
      <VideoWrapper>
        {/* 상대방 비디오 */}
        <video
          autoPlay
          playsInline
          width={400}
          // height={300}
          controls
          ref={remoteStreamRef}
        >
        </video>
      </VideoWrapper>
      {/* <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        <video ref={filteredStreamRef} style={{ display: "none" }}></video> */}
      <ButtonWrapper>
        <ButtonMute ref={muteBtn} onClick={onClickMuteHandler}>
          <IconImg src={Mute} />
          <TextWrapper4>mute</TextWrapper4>
        </ButtonMute>
        <ButtonCamera ref={cameraBtn} onClick={onClickCameraOffHandler}>
          <IconImg src={VideoCamera} />
          <TextWrapper4>camera OFF</TextWrapper4>
        </ButtonCamera>
        <select ref={camerasSelect} onInput={onInputCameraChange}>
          <option>기본</option>
          <option ref={cameraOption} value="device" />
        </select>
        <label for="filter">필터</label>
        <select value={selectedFilter} onChange={handleFilterChange}>
          <option value="none">None</option>
          <option value="blur">Blur</option>
        </select>
      </ButtonWrapper>
      <MyVideoWrapper>
        {/* 내 비디오 */}
        <video
          id="localStream"
          autoPlay
          playsInline
          width={200}
          // height={400}
          ref={localStreamRef}
        >
        </video>
      </MyVideoWrapper>
      <div style={{ color: 'blue' }}>
        <ButtonLeave onClick={leaveRoom}>
          <IconImg src={Icon} />
          <TextWrapper4>방 나가기</TextWrapper4>
        </ButtonLeave>
      </div>
    </Wrapper>
  );
}

export default PeerConfig;
