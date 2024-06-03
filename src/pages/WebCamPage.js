import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import "./homepy-style.css";
import "./homepy-styleguide.css";
import Profile from "../components/HomepyPage/Profile.js";
import Search from "../assets/search.svg";
import Ph_bell_light from "../assets/ph-bell-light.svg";
import Icon from "../assets/icon-50.svg";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

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
    <div className="main">
      <div className="div-2">
        <header className="header">
          <div className="frame">
            <div className="input-no-label">
              <div className="input-no-label-2">
                <img className="ic-baseline-people" alt="Search" src={Search} />
                <div className="label">닉네임을 검색해보세요</div>
              </div>
            </div>
            <div className="input-no-label-3">
              <img className="img" alt="Ph bell light" src={Ph_bell_light} />
            </div>
            <img
              className="mask-group"
              alt="Mask group"
              src={require("../assets/Mask-group.png")}
            />
          </div>
          <div className="text-wrapper">VOM</div>
        </header>
        <div className="frame-2">
          <div className="frame-3"></div>
          <button className="button" onClick={leaveRoom}>
            <img className="img-2" alt="Icon" src={Icon} />
            <div className="text-wrapper-4">방 나가기</div>
          </button>
        </div>
        <Profile />
      </div>
    </div>
  );
}
export default WebCamPage;
