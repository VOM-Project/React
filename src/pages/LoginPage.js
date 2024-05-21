import styled from "styled-components";
import GoogleLoginButton from "../components/LoginPage/GoogleLoginButton";
import LogoBox from "../components/LoginPage/LogoBox";
import window from "../assets/window.png";
import cursor from "../assets/cursor.png";

const StyledLoginPage = styled.div`
  background-color: rgb(229, 229, 229, 0.8); /* 배경색 지정 */
  height: 120vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CenterBox = styled.div`
  position: relative;
  text-align: center;
`;
const WindowImg = styled.img`
  width: 100%;
  height: 100%;
  max-width: 700px;
`;
const CursorImageWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
`;
const CursorImg = styled.img`
  width: 200px;
  height: 200px;
`;
const BoxContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function LoginPage() {
  return (
    <StyledLoginPage>
      <CenterBox>
        <WindowImg src={window} />
        <CursorImageWrapper>
          <CursorImg src={cursor} />
        </CursorImageWrapper>
        <BoxContent>
          <LogoBox />
          <GoogleLoginButton />
        </BoxContent>
      </CenterBox>
    </StyledLoginPage>
  );
}

export default LoginPage;
