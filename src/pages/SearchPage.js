import "./Search-style.css";
import Search from "../assets/search.svg";
import Ph_bell_light from "../assets/ph-bell-light.svg";
import Icon from "../assets/icon-50.svg";
import styled from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchResult from "../components/Search/SearchResult";
import axios from "axios";
import userImg from "../assets/profile.png"; //기본프로필 이미지를 위함

const Wrapper = styled.div`
  background-color: #f5e1e1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
const WrapperContainer = styled.div`
  background-color: rgba(245, 225, 225, 1);
  height: 1080px;
  position: relative;
  width: 1920px;
`;
const Header = styled.header`
  background-color: rgba(255, 255, 255, 1);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: rgba(196, 200, 212, 0.5);
  border-left-style: none;
  border-right-style: none;
  border-top-style: none;
  height: 80px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Frame = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  left: 1458px;
  position: absolute;
  top: 16px;
`;
const InputNoLabel = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  width: 100%;
`;

const InputNoLabel2 = styled.div`
  align-items: flex-start;
  align-self: stretch;
  border: 1px solid;
  border-color: var(--brown-30);
  border-radius: 40px;
  display: flex;
  flex: 0 0 auto;
  gap: 8px;
  padding: 12px 16px;
  position: relative;
  width: 270px;
`;
const Label = styled.input`
  color: rgba(84, 69, 73, 0.3);
  flex: 1;
  font-family: "Pretendard-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  height: 24px;
  letter-spacing: 0;
  line-height: 24px;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  border-width: 0;
`;
const InputNoLabel3 = styled.div`
  align-items: center;
  align-self: stretch;
  border: 1px solid;
  border-color: rgba(84, 69, 73, 0.3);
  border-radius: 40px;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  padding: 9px 18px;
  position: relative;
  width: fit-content;
  height: fit-content;
`;
const TextWrapper = styled.div`
  color: rgba(236, 129, 144, 1);
  font-family: "Pretendard-Bold", Helvetica;
  font-size: 32px;
  font-weight: 700;
  height: 38px;
  left: 42px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 20px;
  white-space: nowrap;
`;

const Frame2 = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  height: 1500px;
  left: 50px;
  overflow: hidden;
  position: absolute;
  top: 122px;
  width: 1850px;
`;
const Frame3 = styled.div`
  align-items: flex-start;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  left: 40px;
  position: absolute;
  top: 40px;
`;
const Frame4 = styled.div`
  border: 1px solid;
  border-color: rgba(236, 129, 144, 1);
  border-radius: 8px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  margin-left: -1px;
  margin-right: -1px;
  margin-top: -1px;
  overflow: hidden;
  position: relative;
  top: 50px;
  left: 10px;
  width: 1236px;
`;
const DivWrapper = styled.div`
  background-color: rgba(247, 204, 212, 0.6);
  border-radius: 8px 8px 0px 0px;
  height: 44px;
  overflow: hidden;
  position: relative;
  width: 1288px;
  justify-content: flex-end;
  display: flex;
`;

const TextWrapper2 = styled.div`
  color: rgba(84, 69, 73, 1);
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 18px;
  font-weight: 600;
  left: 30px;
  letter-spacing: -0.54px;
  line-height: 27px;
  position: absolute;
  top: 8px;
  white-space: nowrap;
`;
const FrameA = styled.div`
  flex: 0 0 auto;
  margin-top: 10px;
  margin-right: 20px;
`;
const Frame5 = styled.div`
  background-color: rgba(244, 234, 230, 0.4);
  border-radius: 0px 0px 8px 8px;
  height: 156px;
  position: relative;
  width: 1288px;
`;
const PWrapper = styled.p`
  color: rgba(0, 0, 0, 0.8);
  font-family: "Pretendard-Medium", Helvetica;
  font-size: 16px;
  font-weight: 500;
  left: 30px;
  letter-spacing: -0.48px;
  line-height: 24px;
  position: absolute;
  top: 29px;
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
const ButtonHomepy = styled.button`
  all: unset;
  align-items: center;
  background-color: rgba(236, 129, 144, 1);
  border-radius: 8px;
  box-sizing: border-box;
  display: inline-flex;
  gap: 10px;
  height: 55px;
  justify-content: center;
  left: 1050px;
  overflow: hidden;
  padding: 16px 24px;
  position: absolute;
  bottom: 10px;
`;

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchNickname, setSearchNickname] = useState(""); //닉네임 검색
  const { searchMemberId } = useParams(); //memberId 넘겨주기 위함
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const memberId = localStorage.getItem("meberId");
  /*
  useLocation으로 결과값 받아오기
  */
  useEffect(() => {
    if (location.state) {
      console.log("결과 받았음 nickname:", location.state.memberNickname);
      console.log(
        "결과받았음 profileimgurl:",
        location.state.memberProfileImgUrl
      );
    }
  }, [location.state]);

  const {
    memberNickname,
    memberProfileImgUrl,
    memberEmail,
    memberBirth,
    memberRegion,
  } = location.state;

  const handleSearchNickname = (e) => {
    if (e.key === "Enter") {
      axios
        .get(`api/members/search?nickname=${searchNickname}`, config)
        .then((res) => {
          const isExisted = res.data.existed;
          if (!isExisted) {
            alert("존재하지 않은 유저입니다");
            navigate(`/homepy/${memberId}`);
          } else {
            const searchMemberId = res.data.findMemberId;
            const memberNickname = res.data.nickname;
            const memberProfileImgUrl =
              res.data.profileImgUrl === null
                ? userImg
                : res.data.profileImgUrl;
            const memberEmail = res.data.email;
            const memberBirth = res.data.birth;
            const memberRegion = res.data.region;

            const searchResult = {
              memberNickname,
              memberProfileImgUrl,
              memberEmail,
              memberBirth,
              memberRegion,
            };
            navigate(`/search/${searchMemberId}`, { state: searchResult });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleOnButtonClick = () => {
    console.log("searchMemberId: ", searchMemberId);
    navigate(`/homepy/${searchMemberId}`);
  };

  return (
    <Wrapper>
      <WrapperContainer>
        <Header>
          <Frame>
            <InputNoLabel>
              <InputNoLabel2>
                <img className="ic-baseline-people" alt="Search" src={Search} />
                <input
                  className="label"
                  type="text"
                  value={searchNickname}
                  onChange={(e) => setSearchNickname(e.target.value)}
                  onKeyDown={(e) => handleSearchNickname(e)}
                  placeholder="닉네임을 검색해보세요"
                />
              </InputNoLabel2>
            </InputNoLabel>
            <InputNoLabel3>
              <img className="img" alt="Ph bell light" src={Ph_bell_light} />
            </InputNoLabel3>
            <img
              className="mask-group"
              alt="Mask group"
              src={require("../assets/Mask-group.png")}
            />
          </Frame>
          <TextWrapper>VOM</TextWrapper>
        </Header>
        <Frame2>
          <Frame3>
            <Frame4>
              <DivWrapper>
                <TextWrapper2>검색결과</TextWrapper2>
                <FrameA></FrameA>
              </DivWrapper>
              <Frame5>
                {/* <PWrapper>결과값</PWrapper> */}
                <SearchResult
                  memberNickname={memberNickname}
                  memberProfileImgUrl={memberProfileImgUrl}
                  memberEmail={memberEmail}
                  memberBirth={memberBirth}
                  memberRegion={memberRegion}
                />
              </Frame5>
              <ButtonHomepy onClick={handleOnButtonClick}>
                <TextWrapper4>homepy보러가기</TextWrapper4>
              </ButtonHomepy>
            </Frame4>
          </Frame3>
        </Frame2>
      </WrapperContainer>
    </Wrapper>
  );
}

export default SearchPage;
