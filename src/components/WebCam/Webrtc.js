function start() {
  //socket을 통해 (시그널링) 서버와 통신
  socket.onmessage = function (msg) {
    let message = JSON.parse(msg.data);
    switch (message.type) {
      case "offer":
        log("Signal OFFER received");
        handleOfferMessage(message);
        break;

      case "answer":
        log("Signal ANSWER received");
        handleAnswerMessage(message);
        break;

      case "ice":
        log("Signal ICE Candidate received");
        handleNewICECandidateMessage(message);
        break;

      case "join":
        message.data = chatListCount();

        log(
          "Client is starting to " +
            (message.data === "true)" ? "negotiate" : "wait for a peer")
        );
        log("messageDATA : " + message.data);
        handlePeerConnection(message);
        break;

      case "leave":
        stop();
        break;

      default:
        handleErrorMessage("Wrong type message received from server");
    }
  };
  // ICE 를 위한 chatList 인원 확인
  function chatListCount() {
    let data;

    $.ajax({
      url: "/webrtc/usercount",
      type: "POST",
      async: false,
      data: {
        from: localUserName,
        type: "findCount",
        data: localRoom,
        candidate: null,
        sdp: null,
      },
      success(result) {
        data = result;
      },
      error(result) {
        console.log("error : " + result);
      },
    });

    return data;
  }
}
