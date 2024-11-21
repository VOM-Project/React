import React from "react";
import { useNavigate } from "react-router-dom";

import logout from "../../assets/logout.svg";
import "./Header.css";


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
        <button onClick={handleLogout} className="logout-button">
            {/* <b>로그아웃</b> */}
            <img
                src={logout}
                height={24}
                width={24}
            />
        </button>
    );
}

export default LogoutButton;