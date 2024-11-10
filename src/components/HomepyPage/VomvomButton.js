import styled from "styled-components";
import axios from "axios";
import "./Profile.css";
import "../../pages/homepy-styleguide.css";
import Ic_baseline_people from "../../assets/ic-baseline-people.svg";

const PinkButton = styled.button`
  all: unset;
  align-items: center;
  background-color: rgba(236, 129, 144, 1);
  border-radius: 8px;
  box-sizing: border-box;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 10px;
  height: 55px;
  justify-content: center;
  overflow: hidden;
  padding: 16px 24px;
  position: relative;
`;
const ButtonPinkText = styled.div`
  color: #ffffff;
  font-family: var(--body-md-semibold-font-family);
  font-size: var(--body-md-semibold-font-size);
  font-style: var(--body-md-semibold-font-style);
  font-weight: var(--body-md-semibold-font-weight);
  letter-spacing: var(--body-md-semibold-letter-spacing);
  line-height: var(--body-md-semibold-line-height);
  position: relative;
  text-align: right;
  white-space: nowrap;
  width: fit-content;
`;

const ImgPeople = styled.img`
  height: 24px;
  margin-bottom: -0.5px;
  margin-top: -0.5px;
  position: relative;
  width: 24px;
`;

//버튼 누르면 요청이 가고 토스트 메시지로 요청되었습니다 뜨게 하기
function VomvomButton() {
  const handelVomRequest = () => {

  }  
    
  return (
    <div>
      <PinkButton>
        <ImgPeople alt="people_svg" src={Ic_baseline_people_white} />
        <ButtonPinkText>봄봄 신청하기</ButtonPinkText>
      </PinkButton>
    </div>
  );
};

export default VomvomButton;
