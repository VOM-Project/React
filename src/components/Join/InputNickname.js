import styled from "styled-components";

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

const InputNickname = () => {
  return (
    <Wrapper>
      닉네임
      <InputBox type="text" placeholder="닉네임을 입력하세요"></InputBox>
      <Button>중복확인</Button>
    </Wrapper>
  );
};

export default InputNickname;
