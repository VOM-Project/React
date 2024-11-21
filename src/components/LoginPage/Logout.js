import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import logout from "../../assets/logout.svg";

const Button = styled.button`
  // width: 160px;
  // height: 50px;
  // background-color: rgba(236, 129, 144, 1);
  // border-color: rgba(247, 204, 212, 0.2);
  // border-radius: 8px;
  // color: white;


  
  border: 2px solid;
  border-color: var(--brown-30);
  border-radius: 25px;
  display: flex;
  align-items: center;
  padding: 0px 20px;
`;

function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      //로그아웃 후 localstorage 삭제
      //로그인페이지로 돌아가기
      localStorage.clear(); //토큰까지 싹 다 삭제
      navigate("/login");
    } catch (error) {
      console.error("Error logging out : ", error);
    }
  };

  return (
    <Button onClick={handleLogout} className="LogoutBtn">
      {/* <b>로그아웃</b> */}
      <img
        src={logout}
        height={24}
        width={24}
      />
    </Button>
  );
}

export default LogoutButton;
