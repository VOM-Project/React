import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Box = styled.div`
  width: 300px;
  height: 50px;
  font-size: 5rem;
  text-align: center;
  padding: 4rem;
  border-radius: 2rem;
  margin-left: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  margin-bottom: 40px;
  //color: #7A4495;
  color: #4a215f;
  font-weight: bold;
  //box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
`;

const LogoImage = styled.img`
  width: 150px;
  height: 75px;
  margin-right: 20px;
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
