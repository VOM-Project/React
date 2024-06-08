import styled from "styled-components";
import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";
import { findByLabelText } from "@testing-library/react";

const Wrapper = styled.div`
  width: 300px;
  height: 75px;
  position: relative;
  display: flex;
  flex-direction: column;
  bottom: 100px;
`;
const Label = styled.label`
  margin-right: 250px;
  margin-bottom: 5px;
`;
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const InputBox = styled.input`
  width: 100%;
  height: 50px;
  border-color: rgba(102, 102, 102, 0.2);
  border-radius: 12px;
`;
const Button = styled.button`
  width: 80px;
  position: absolute;
  margin-top: 20px;
  top: 20px;
  bottom: 5px;
  right: 5px;
  border-radius: 12px;
  border-color: rgba(102, 102, 102, 0.2);
  color: rgba(17, 17, 17, 0.8);
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

const ModalButton = styled.button`
  margin-left: 100px;
  color: white;
  background-color: rgba(236, 129, 144, 0.8);
  border-radius: 10px;
  border-color: rgba(236, 129, 144, 0.5);
`;

Modal.setAppElement("#root");

const InputNickname = ({ nickname, setNickname }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCheckNickname = async () => {
    const data = { nickname };
    try {
      const response = await axios.post("/api/members/join/nickname", data);
      console.log("닉네임 중복 확인이욤");
      if (response.data.existed == false) {
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
      <Label>닉네임</Label>
      <InputContainer>
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
      </InputContainer>
      <Modal
        isOpen={modalIsOpen}
        onReqeustClose={() => setModalIsOpen(false)}
        style={customModalStyles}
        contentLable="Nickname Check"
      >
        <p>{modalMessage}</p>
        <ModalButton onClick={() => setModalIsOpen(false)}>확인</ModalButton>
      </Modal>
    </Wrapper>
  );
};

export default InputNickname;
