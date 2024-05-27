import styled from "styled-components";
import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";

const Wrapper = styled.div`
  width: 300px;
  height: 75px;
  position: relative;
  display: flex;
`;
const InputBox = styled.input`
  width: 100%;
  border-color: rgba(102, 102, 102, 0.2);
  border-radius: 12px;
`;
const Button = styled.button`
  position: absolute;
  top: 5px;
  bottom: 5px;
  right: 5px;
  border-radius: 12px;
`;
const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const InputNickname = ({ nickname, setNickname }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCheckNickname = async () => {
    try {
      const response = await axios.get("서버주소쓰셈", nickname);
      console.log("닉네임 중복 확인이욤");
      if (response.data == true) {
        setModalMessage("닉네임 사용 가능합니다");
      } else {
        setModalMessage("중복된 닉네임입니다");
      }
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("닉네임 확인 중 오류가 발생했습니다");
      setModalIsOpen(true);
    }
  };
  return (
    <Wrapper>
      닉네임
      <InputBox
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
        placeholder="닉네임을 입력하세요"
      ></InputBox>
      <Button type="button" onClick={handleCheckNickname}>
        중복확인
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onReqeustClose={() => setModalIsOpen(false)}
        style={customModalStyles}
        contentLable="Nickname Check"
      >
        <p>{modalMessage}</p>
        <button onClick={() => setModalIsOpen(false)}>확인</button>
      </Modal>
    </Wrapper>
  );
};

export default InputNickname;
