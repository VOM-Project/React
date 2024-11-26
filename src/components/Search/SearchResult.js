import styled from "styled-components";
import Ic_outline_email from "../../assets/ic-outline-email.svg";
import Mingcute_birthday from "../../assets/mingcute-birthday-2-line.svg";
import Mingcute_location from "../../assets/mingcute-location-line.svg";

const ResultContainer = styled.div`
  display: flex;
  align-items: flex-start;
  bottom: 10px;
`;

const ResultProfileImg = styled.img`
  height: 100px;
  position: relative;
  width: 100px;
  left: 10px;
  top: 10px;
`;

const ResultProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  left: 25px;
`;
const ResultNicknameWrapper = styled.div`
  /* border-width: 0; */
  // background-color: rgba(247, 204, 212, 0.2);
  width: 340px;
  height: 51px;
  border-radius: 8px;
  border-color: rgba(247, 204, 212, 0.2);
  display: flex;
  align-items: center;
  position: relative;
  left: 10px;
  color: var(--brown);
    font-family: "Pretendard-SemiBold", Helvetica;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.54px;
    line-height: 27px;
    margin-top: -1px;
`;

const ResultEmailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 320px;
  height: 24px;
  color: var(--balck-60);
    font-family: var(--body-md-semibold-font-family);
    font-size: var(--body-md-semibold-font-size);
    font-weight: var(--body-md-semibold-font-weight);
    letter-spacing: var(--body-md-semibold-letter-spacing);
    line-height: 24px;
    margin-top: -1px;
`;
const ResultEmailImgContainer = styled.div`
  display: flex;
  width: 100px;
  height: 24px;
  gap: 8px;
  position: relative;
`;
const ResultMemberEmail = styled.div`
  height: 24px;
  text-align: right;
`;
const ResultBirthWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 320px;
  height: 24px;
  color: var(--balck-60);
    font-family: var(--body-md-semibold-font-family);
    font-size: var(--body-md-semibold-font-size);
    font-weight: var(--body-md-semibold-font-weight);
    letter-spacing: var(--body-md-semibold-letter-spacing);
    line-height: 24px;
    margin-top: -1px;
`;
const ResultBirthImgContainer = styled.div`
  display: flex;
  width: 100px;
  height: 24px;
  gap: 8px;
  position: relative;
`;
const ResultMemberBirth = styled.div`
  height: 24px;
  text-align: right;
`;
const ResultRegionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 320px;
  height: 24px;
  color: var(--balck-60);
    font-family: var(--body-md-semibold-font-family);
    font-size: var(--body-md-semibold-font-size);
    font-weight: var(--body-md-semibold-font-weight);
    letter-spacing: var(--body-md-semibold-letter-spacing);
    line-height: 24px;
    margin-top: -1px;
`;
const ResultRegionImgContainer = styled.div`
  display: flex;
  width: 100px;
  height: 24px;
  gap: 8px;
  position: relative;
`;
const ResultMemberRegion = styled.div`
  height: 24px;
  text-align: right;
`;
function SearchResult({
  memberNickname,
  memberProfileImgUrl,
  memberEmail,
  memberBirth,
  memberRegion,
}) {
  return (
    <ResultContainer>
      <ResultProfileImg src={memberProfileImgUrl} />
      <ResultProfileInfoContainer>
        <ResultNicknameWrapper>{memberNickname}</ResultNicknameWrapper>
        <ResultEmailWrapper>
          <ResultEmailImgContainer>
            <img src={Ic_outline_email} />
            이메일
          </ResultEmailImgContainer>
          <ResultMemberEmail>{memberEmail}</ResultMemberEmail>
        </ResultEmailWrapper>
        <ResultBirthWrapper>
          <ResultBirthImgContainer>
            <img src={Mingcute_birthday} />
            생년월일
          </ResultBirthImgContainer>
          <ResultMemberBirth>{memberBirth}</ResultMemberBirth>
        </ResultBirthWrapper>
        <ResultRegionWrapper>
          <ResultRegionImgContainer>
            <img src={Mingcute_location} />
            지역
          </ResultRegionImgContainer>
          <ResultMemberRegion>{memberRegion}</ResultMemberRegion>
        </ResultRegionWrapper>
      </ResultProfileInfoContainer>
    </ResultContainer>
  );
}

export default SearchResult;
