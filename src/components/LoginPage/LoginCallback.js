import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//리디렉션 uri
const LoginCallback = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code"); //인가코드값 파싱
  console.log("인가코드+" + code);

  useEffect(() => {
    const googleLogin = async () => {
      await axios({
        method: "GET",
        url: `/login/oauth2/code/google?code=${code}`, //서버에게 인가코드 보내고 유저정보 받아오기 & 서버 url 수정
      })
        .then((res) => {
          console.log(res); //잘 받아오는지 테스트
          //로그인 성공후 localstorage에 유저 정보 저장
          console.log("memberId:", res.data.memberId);
          console.log("accessToken:", res.data.accessToken);
          localStorage.setItem("memberId", res.data.memberId);
          localStorage.setItem("accessToken", res.data.accessToken);
          let isRegistered = res.data.isRegistered;
          if (isRegistered) {
            navigate("/homepy"); //이미 등록된 유저면 main으로 이동
          } else {
            navigate("/join");
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };
    googleLogin();
  });

  return <div>로그인중입니다. 잠시만 기다려주세요</div>;
};

export default LoginCallback;
