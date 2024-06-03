import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Box = styled.div`
  width: 120px;
  height: 20px;
  text-align: center;
  padding: 4rem;
  margin-left: 50px;
  display: flex;
  justify-content: center;
  align-items: top;
  position: relative;
  margin-top: 120px;
  bottom: 90px;
  color: #4a215f;
  font-weight: bold;
`;

const LogoImage = styled.img`
  width: 80px;
  height: 40px;
  margin-right: 20px;
  margin-bottom: 100px;
`;

const LogoBox = () => {
  return (
    <Wrapper>
      <Box>
        <LogoImage src={logo} />
      </Box>
    </Wrapper>
  );
};

export default LogoBox;
