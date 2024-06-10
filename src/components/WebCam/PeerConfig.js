import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useState, useRef, useEffect, useCallback } from "react";

function PeerConfig({ webcamId, connectHeaders }) {
  //   let localStreamElement = document.querySelector("#localStream");
  //자신을 식별하기위한 랜덤한 key
  const myKey = Math.random().toString(36).substring(2, 11);
  let pcListMap = new Map();
  //   let otherKeyList = [];
  const [otherKeyList, setOtherKeyList] = useState([]);
  const localStreamRef = useRef(null);
  //   const [localStream, setLocalStream] = useState(null);
  let localStream;
  const [remoteStreams, setRemoteStreams] = useState([]);
  const client = useRef({});
  const remoteStreamRef = useRef(null);

  const startCam = async () => {
    if (navigator.mediaDevices !== undefined) {
      console.log("1.cam start");
      await navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(async (stream) => {
          console.log("Stream found");
          console.log("getUserMedia 함수에서 생성된 스트림:", stream);
          //웹캠, 마이크의 스트림 정보를 글로벌 변수로 저장한다.
          localStream = stream;
          // Disable the microphone by default
          stream.getAudioTracks()[0].enabled = true;
          console.log("현재 stream을 localStream에 추가합니다");
          localStreamRef.current.srcObject = stream;
          // Connect after making sure that local stream is availble
        })
        .catch((error) => {
          console.error("Error accessing media devices:", error);
        });
    }
  };

  //웹소켓 연결을 위한 함수 추가
  const connectSocket = async () => {
    const socket = new SockJS("https://localhost:8080/signaling");
    client.current = Stomp.over(socket);
    client.current.debug = () => {};
    client.current.connect(connectHeaders, function () {
      console.log("2. Connected to WebRTC server");

      //iceCandidate peer 교환을 위한 subscribe
      console.log("2-1. ice 구독");
      client.current.subscribe(
        `/topic/peer/iceCandidate/${myKey}/${webcamId}`,
        (candidate) => {
          const key = JSON.parse(candidate.body).key;
          const message = JSON.parse(candidate.body).body;

          // 해당 key에 해당되는 peer 에 받은 정보를 addIceCandidate 해준다.
          pcListMap.get(key).addIceCandidate(
            new RTCIceCandidate({
              candidate: message.candidate,
              sdpMLineIndex: message.sdpMLineIndex,
              sdpMid: message.sdpMid,
            })
          );
        }
      );

      //offer peer 교환을 위한 subscribe
      console.log("2-2.offer 구독");
      client.current.subscribe(
        `/topic/peer/offer/${myKey}/${webcamId}`,
        (offer) => {
          const key = JSON.parse(offer.body).key;
          const message = JSON.parse(offer.body).body;

          // 해당 key에 새로운 peerConnection 를 생성해준후 pcListMap 에 저장해준다.
          pcListMap.set(key, createPeerConnection(key));
          // 생성한 peer 에 offer정보를 setRemoteDescription 해준다.
          pcListMap.get(key).setRemoteDescription(
            new RTCSessionDescription({
              type: message.type,
              sdp: message.sdp,
            })
          );
          //sendAnswer 함수를 호출해준다.
          console.log("2-3. answer 전송");
          sendAnswer(pcListMap.get(key), key);
        }
      );

      //answer peer 교환을 위한 subscribe
      console.log("2-4. answer 구독");
      client.current.subscribe(
        `/topic/peer/answer/${myKey}/${webcamId}`,
        (answer) => {
          const key = JSON.parse(answer.body).key;
          const message = JSON.parse(answer.body).body;

          // 해당 key에 해당되는 Peer 에 받은 정보를 setRemoteDescription 해준다.
          pcListMap
            .get(key)
            .setRemoteDescription(new RTCSessionDescription(message));
        }
      );

      //key를 보내라는 신호를 받은 subscribe
      console.log("2-5. camKey 전송");
      client.current.subscribe(`/topic/call/key`, (message) => {
        //자신의 key를 보내는 send
        client.current.send(
          `/app/send/key`,
          connectHeaders,
          JSON.stringify(myKey)
        );
        console.log("2-5. camKey 전송: ", message);
      });

      //상대방의 key를 받는 subscrib
      console.log("2-6. camKey 구독");
      client.current.subscribe(`/topic/send/key`, (message) => {
        const key = JSON.parse(message.body);

        //만약 중복되는 키가 ohterKeyList에 있는지 확인하고 없다면 추가해준다.
        setOtherKeyList((prevKeys) => {
          if (myKey !== key && !prevKeys.includes(key)) {
            return [...prevKeys, key];
          } //중복되면 key 추가 x
          return prevKeys;
        });
        console.log("2-6. camKey 구독:", message.body);
      });
    });
  };

  //iceCnadidate 함수
  function onIceCandidate(event, otherKey) {
    console.log("onIceCandidate 함수에 전달된 otherKey 값:", otherKey);
    console.log("3-1. ice candidate 전송");
    if (event.candidate) {
      console.log("ICE candidate");
      client.current.send(
        `/app/peer/iceCandidate/${otherKey}/${webcamId}`,
        connectHeaders,
        JSON.stringify({
          key: myKey,
          body: event.candidate,
        })
      );
    }
  }

  //   onTrack 함수
  function onTrack(event, otherKey) {
    console.log("onTrack 함수에 전달된 otherKey 값:", otherKey);
    console.log("3-2. media 연결 시작");
    setRemoteStreams((prevStreams) => {
      const existingStream = prevStreams.find(
        (stream) => stream.key === otherKey
      );
      if (!existingStream) {
        console.log("[ㅅㅂ]존재하는 stream을 찾지 못했습니다", otherKey);
        return [...prevStreams, { key: otherKey, stream: event.streams[0] }];
      }
      console.log("[ㅅㅂ]존재하는 상대 stream을 찾았습니다");
      return prevStreams;
    });
  }

  //peerconnection을 생성해주는 함수 추가
  const createPeerConnection = (otherKey) => {
    console.log("3.peer connection 시작");
    const pc = new RTCPeerConnection({
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
    try {
      // peerConnection 에서 icecandidate 이벤트가 발생시 onIceCandidate 함수 실행
      pc.addEventListener("icecandidate", (event) => {
        onIceCandidate(event, otherKey);
      });
      // peerConnection 에서 track 이벤트가 발생시 onTrack 함수를 실행, 상대 client의 stream을 얻어옴
      pc.addEventListener("track", (event) => {
        onTrack(event, otherKey);
      });

      // 만약 localStream 이 존재하면 peerConnection에 addTrack 으로 추가함
      console.log("3.2-1. localStream 확인용: ", localStream);
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
        });
      }
      console.log("3-3.결과 : PeerConnection created");
    } catch (error) {
      console.error("3-3. 결과: PeerConnection failed: ", error);
    }
    return pc;
  };

  //send offer
  let sendOffer = (pc, otherKey) => {
    pc.createOffer().then((offer) => {
      setLocalAndSendMessage(pc, offer);
      client.current.send(
        `/app/peer/offer/${otherKey}/${webcamId}`,
        connectHeaders,
        JSON.stringify({
          key: myKey,
          body: offer,
        })
      );
      console.log("offer 전송 중...");
    });
  };
  //send answer
  let sendAnswer = (pc, otherKey) => {
    pc.createAnswer().then((answer) => {
      setLocalAndSendMessage(pc, answer);
      client.current.send(
        `/app/peer/answer/${otherKey}/${webcamId}`,
        connectHeaders,
        JSON.stringify({
          key: myKey,
          body: answer,
        })
      );
      console.log("answer 전송 중...");
    });
  };

  const setLocalAndSendMessage = (pc, sessionDescription) => {
    pc.setLocalDescription(sessionDescription);
  };

  //들어오자마자 캠 + 웹소켓 실행
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await startCam();
    // if (localStream) {
    //   localStreamRef.current.style.display = "block";
    // }
    await connectSocket();
  }

  //연결 시작 버튼 클릭시 다른 웹 key들 웹소켓을 가져 온뒤에 offer -> answer -> iceCandidate 통신
  // peer 커넥션은 pcListMap 으로 저장
  const handleStreamEvent = async () => {
    await client.current.send(`/app/call/key`, connectHeaders, {});
    setTimeout(() => {
      otherKeyList.forEach((key) => {
        if (!pcListMap.has(key)) {
          const pc = createPeerConnection(key);
          pcListMap.set(key, pc);
          sendOffer(pc, key);
        }
      });
    }, 1000);
  };

  return (
    <div>
      <button type="StartStreambutton" onClick={handleStreamEvent}>
        stream시작
      </button>
      <video
        id="localStream"
        autoPlay
        playsInline
        width={500}
        height={500}
        // style={{ display: "none" }}
        ref={localStreamRef}
      >
        내 비디오
      </video>
      <div id="remoteStreamDiv">
        {remoteStreams.map(({ key, stream }) => (
          <video
            key={key}
            autoPlay
            playsInline
            width={500}
            height={500}
            controls
            ref={(remoteStreamRef) => {
              if (remoteStreamRef && stream) {
                remoteStreamRef.srcObject = stream;
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default PeerConfig;
